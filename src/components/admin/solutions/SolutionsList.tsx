"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Trash2, Loader2, Eye, EyeOff, Pencil, ExternalLink, Plus } from "lucide-react";
import { classificationLabels, type SolutionClassification } from '@/lib/solution-classification';
import { toast } from "sonner";
import styles from "./SolutionsList.module.css";

interface Solution {
  id: string;
  title: string;
  slug: string;
  platforms?: string[];
  classification?: SolutionClassification;
  isDraft: boolean;
  isListed: boolean;
  publishedRevisionId?: string | null;
  createdAt: string;
  updatedAt: string;
}

type FilterType = "all" | "draft" | "published";

export default function SolutionsList({ initialFilter = "all" }: { initialFilter?: FilterType }) {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>(initialFilter);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [visibilityId, setVisibilityId] = useState<string | null>(null);
  async function toggleVisibility(solution: Solution) {
    setVisibilityId(solution.id);
    try {
      const response = await fetch(`/api/admin/solutions/${solution.id}/visibility`, {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({visible:!solution.isListed})});
      const data = await response.json();
      if(!response.ok)throw new Error(data.error || "Could not update visibility.");
      setSolutions(old=>old.map(item=>item.id===solution.id?{...item,isListed:data.isListed}:item));
      toast.success(data.isListed?"Solution listed on the website.":"Solution unlisted. The direct link still works.");
    } catch(error) { toast.error(error instanceof Error?error.message:"Could not update visibility."); }
    finally {setVisibilityId(null);}
  }

  const handleDelete = async (e: React.MouseEvent, solution: Solution) => {
    e.stopPropagation();
    const confirmed = window.confirm(
      `Are you sure you want to delete "${solution.title}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      setDeletingId(solution.id);
      const res = await fetch(`/api/admin/solutions/${solution.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Failed to delete solution");
      }

      toast.success(`"${solution.title}" has been deleted`);
      setSolutions((prev) => prev.filter((s) => s.id !== solution.id));
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Error deleting solution");
    } finally {
      setDeletingId(null);
    }
  };

  const fetchSolutions = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/solutions", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch solutions");
      }
      const data = await response.json();
      setSolutions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load solutions");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    // State updates occur after network I/O, not synchronously in the effect.

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSolutions();
  }, [fetchSolutions]);



  const filteredSolutions = solutions.filter((solution) => {
    if (filter === 'draft') return solution.isDraft;
    if (filter === 'published') return !solution.isDraft;
    return true;
  });

  const draftCount = solutions.filter(s => s.isDraft).length;
  const publishedCount = solutions.filter(s => !s.isDraft).length;

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 border-b border-gray-200 last:border-0">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  if (solutions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-lg shadow p-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No solutions yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first solution.</p>
          <div className="mt-6">
            <Link
              href="/admin/solutions/new"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create New Solution
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.workspace}>
      <div className={styles.toolbar}>
        <div><h2>All solutions <span>{solutions.length}</span></h2><p>{publishedCount} published · {draftCount} drafts</p></div>
        <Link href="/admin/solutions/new" className={styles.create}><Plus size={16}/>Create solution</Link>
      </div>
      <nav className={styles.filters} aria-label="Filter solutions">
        {([['all','All',solutions.length],['draft','Drafts',draftCount],['published','Published',publishedCount]] as const).map(([value,label,count])=><button type="button" key={value} aria-pressed={filter===value} onClick={()=>setFilter(value)} className={filter===value?styles.activeFilter:undefined}>{label}<span>{count}</span></button>)}
      </nav>
      {filteredSolutions.length===0?<div className={styles.empty}>No {filter==='draft'?'draft':'published'} solutions found.</div>:<div className={styles.list}>
        {filteredSolutions.map(solution=>{
          const published=!solution.isDraft;
          const pending=visibilityId===solution.id||deletingId===solution.id;
          return <article key={solution.id} className={styles.card} aria-label={solution.title}>
            <div className={styles.cardHeader}>
              <div className={styles.identity}>
                <p className={styles.classification}>{classificationLabels[solution.classification??'INDUSTRY']}</p>
                <h3><Link href={`/admin/solutions/${solution.id}/edit`}>{solution.title}</Link></h3>
                <p className={styles.address}>/solutions/{solution.slug}</p>
              </div>
              <div className={styles.statuses}>
                <span className={published?styles.published:styles.draft}>{published?'Published':solution.publishedRevisionId?'Unpublished':'Draft'}</span>
                {published&&<span className={solution.isListed?styles.listed:styles.unlisted}>{solution.isListed?'Listed on website':'Unlisted · Direct link only'}</span>}
              </div>
            </div>
            <div className={styles.metadata}>
              <div className={styles.platforms}>{solution.platforms?.length?solution.platforms.map(platform=><span key={platform}>{({iotrics:'IoTRICs',evoltics:'EVOLTICS',cropifai:'cropifAI'} as Record<string,string>)[platform]||platform}</span>):<span className={styles.noPlatform}>No platform selected</span>}</div>
              <p>Updated <time dateTime={solution.updatedAt}>{new Date(solution.updatedAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</time></p>
            </div>
            <div className={styles.actions}>
              <Link href={`/admin/solutions/${solution.id}/edit`} className={styles.edit}><Pencil size={15}/>Open editor</Link>
              {published&&<Link href={`/solutions/${solution.slug}`} target="_blank" rel="noopener noreferrer" className={styles.action}><ExternalLink size={15}/>Open direct link</Link>}
              <button type="button" onClick={()=>void toggleVisibility(solution)} disabled={pending||solution.isDraft} title={solution.isDraft?'Publish in the editor before listing':'Changes listing only; your published direct link remains accessible'} className={`${styles.action} ${styles.visibility}`}>
                {visibilityId===solution.id?<Loader2 size={15} className="animate-spin"/>:solution.isListed?<EyeOff size={15}/>:<Eye size={15}/>}{visibilityId===solution.id?'Updating…':solution.isListed?'Hide on Website':'View on Website'}
              </button>
              <button type="button" onClick={event=>void handleDelete(event,solution)} disabled={pending} className={styles.delete} title={`Delete ${solution.title}`} aria-label={`Delete ${solution.title}`}>
                {deletingId===solution.id?<Loader2 size={16} className="animate-spin"/>:<Trash2 size={16}/>}
              </button>
            </div>
          </article>;
        })}
      </div>}
    </div>
  );
}
