import {cache} from 'react';
import {prisma} from '@/lib/db/prisma';
import {publishedProducts} from '@/lib/products/catalog';
export const getPublishedProductBySlug=cache(async(slug:string)=>{
 try{const decoded=decodeURIComponent(slug);return await prisma.product.findFirst({where:{...publishedProducts,OR:[{slug:decoded},{id:decoded}]}});}catch(error){console.error('Published product unavailable',error);return null;}
});
