import Link from 'next/link';
import SettingsForm from '@/components/admin/portfolio/SettingsForm';
import { getPortfolioSettings } from '@/lib/portfolio/server';
export default async function Settings(){return <div className="blog-admin"><Link href="/admin/portfolio" className="blog-editor-back">All projects</Link><SettingsForm initialData={await getPortfolioSettings()}/></div>;}
