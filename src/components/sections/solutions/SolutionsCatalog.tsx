'use client';
import { classificationLabels, matchesClassification, type SolutionClassification } from '@/lib/solution-classification';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, SlidersHorizontal, ArrowUpRight, X } from 'lucide-react';
import styles from './SolutionsCatalog.module.css';
export interface CatalogSolution { id: string; slug: string; title: string; metaDescription: string | null; coverImage: string | null; platforms: string[]; classification: SolutionClassification }
const platformLabels: Record<string, string> = { iotrics: 'IoTRICs', evoltics: 'EVOLTICS', cropifai: 'cropifAI' };
function industry(solution: CatalogSolution) {
  const text = `${solution.slug} ${solution.title}`.toLowerCase();
  if (/smart-cit/.test(text)) return 'Smart cities';
  if (/air-quality/.test(text)) return 'Air quality';
  if (/construction/.test(text)) return 'Construction';
  if (/parking/.test(text)) return 'Parking';
  if (/waste/.test(text)) return 'Waste management';
  if (/silo/.test(text)) return 'Storage & silos';
  if (/esg|sustainab/.test(text)) return 'Sustainability';
  if (/ev-charging/.test(text)) return 'EV charging';
  if (/irrigation|farming/.test(text)) return 'Agriculture';
  if (/facilit|building/.test(text)) return 'Facilities management';
  if (/hospital|hotel/.test(text)) return 'Hospitality';
  if (/cold|storage/.test(text)) return 'Cold chain';
  if (/industr|manufactur/.test(text)) return 'Industrial';
  if (/energy|power/.test(text)) return 'Energy';
  return 'Other solutions';
}
export default function SolutionsCatalog({ solutions, initialQuery = '' }: { solutions: CatalogSolution[]; initialQuery?: string }) {
  const [query,setQuery] = useState(initialQuery), [category,setCategory] = useState('All industries'), [platform,setPlatform] = useState('All platforms');
  const [classification, setClassification] = useState<'all' | 'industry' | 'usecase'>('all');
  const categories = [...new Set(solutions.map(industry))].sort();
  const platforms = [...new Set(solutions.flatMap(solution => solution.platforms.map(value => value.toLowerCase())))].sort();
  const filtered = solutions.filter(solution => (classification === 'all' || matchesClassification(solution.classification, classification)) && (category === 'All industries' || industry(solution) === category) && (platform === 'All platforms' || solution.platforms.some(value => value.toLowerCase() === platform)) && query.toLowerCase().trim().split(/\s+/).every(term => `${solution.title} ${solution.metaDescription || ''} ${solution.platforms.join(' ')} ${industry(solution)}`.toLowerCase().includes(term)));
  const reset = () => { setClassification('all');setQuery('');setCategory('All industries');setPlatform('All platforms'); };
  return <div>
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 mb-7 shadow-sm"><div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_auto_auto] gap-3"><div className="flex items-center gap-3 rounded-xl border border-zinc-200 px-3 focus-within:ring-2 focus-within:ring-primary/20"><Search size={20} className="text-zinc-400 shrink-0"/><label htmlFor="solutions-search" className="sr-only">Search solutions</label><input id="solutions-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by industry, application, or solution…" className="min-w-0 w-full bg-transparent py-3 text-base outline-none"/>{query && <button aria-label="Clear solution search" onClick={() => setQuery('')}><X size={18}/></button>}</div><label className="rounded-xl border border-zinc-200 px-3 text-sm"><span className="sr-only">Filter by classification</span><select aria-label="Filter by classification" value={classification} onChange={event => setClassification(event.target.value as typeof classification)} className="min-h-12 w-full bg-transparent outline-none"><option value="all">All solution types</option><option value="industry">By industry</option><option value="usecase">By use case</option></select></label><label className="flex items-center gap-2 rounded-xl border border-zinc-200 px-3 text-sm"><SlidersHorizontal size={16}/><span className="sr-only">Filter by industry</span><select aria-label="Filter by industry" value={category} onChange={event => setCategory(event.target.value)} className="min-h-12 w-full bg-transparent outline-none"><option>All industries</option>{categories.map(item => <option key={item}>{item}</option>)}</select></label><label className="rounded-xl border border-zinc-200 px-3 text-sm"><span className="sr-only">Filter by platform</span><select aria-label="Filter by platform" value={platform} onChange={event => setPlatform(event.target.value)} className="min-h-12 w-full bg-transparent outline-none"><option>All platforms</option>{platforms.map(item => <option key={item} value={item}>{platformLabels[item] || item}</option>)}</select></label></div><div className="flex justify-between gap-4 mt-3 text-xs"><span role="status" aria-live="polite" className="text-zinc-500">{filtered.length} of {solutions.length} solutions</span>{(classification !== 'all' || query || category !== 'All industries' || platform !== 'All platforms') && <button onClick={reset} className="font-semibold text-primary">Reset filters</button>}</div></div>
    {filtered.length ? <div className={styles.grid}>{filtered.map(solution => <Link key={solution.id} href={`/solutions/${encodeURIComponent(solution.slug)}`} className={styles.card}>
      <div className={styles.cover}>{solution.coverImage ? <Image src={solution.coverImage} alt={solution.title} fill unoptimized className={styles.image} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"/> : <div className={styles.placeholder}><span>Connected solutions</span></div>}</div>
      <div className={styles.body}><span className={styles.category}>{classificationLabels[solution.classification]} · {industry(solution)}</span><h2 className={styles.title}>{solution.title}</h2><p className={styles.description}>{solution.metaDescription || 'Explore this connected solution and its applications.'}</p><div className={styles.action}><span>Explore solution</span><ArrowUpRight size={17}/></div></div>
    </Link>)}</div> : <div className="rounded-3xl border border-zinc-200 bg-white p-8 sm:p-12 text-center"><h2 className="text-2xl font-bold text-zinc-900">No matching solutions</h2><p className="mt-3 text-sm text-zinc-500">Try another search or reset your filters.</p><button onClick={reset} className="mt-5 rounded-full bg-primary text-white px-6 py-3 text-sm font-semibold">Reset filters</button></div>}
  </div>;
}
