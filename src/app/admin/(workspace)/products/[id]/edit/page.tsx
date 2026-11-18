import {notFound} from 'next/navigation';
import ImportEditor from '@/components/admin/solution-import/ImportEditor';
import {getProductImportSession} from '@/lib/products/server';
export default async function EditProduct({params}:{params:Promise<{id:string}>}){const session=await getProductImportSession((await params).id);if(!session)notFound();return <ImportEditor kind="products" initialSession={session}/>;}
