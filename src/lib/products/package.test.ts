import {it,expect} from 'vitest';
import {readFile} from 'node:fs/promises';
import {importPackage} from '@/lib/solution-import/parse';
import {metadataSchema} from '@/lib/solution-import/types';
it('imports the delivered NPM-12 ZIP with both CMS download hooks and its related slot',async()=>{
 const bytes=await readFile('examples/product-upload/npm-12-ready-to-upload.zip');
 const file=new File([bytes],'npm-12.zip',{type:'application/zip'});
 const result=await importPackage([file],metadataSchema.parse({title:'NPM-12 Power Monitor',slug:'npm-12',seoTitle:'NPM-12 Power Monitor | Najhum'}),async(_bytes,name)=>({url:`https://media.test/products/${name}`,storageKey:name}));
 expect(result.html.match(/data-najhum-action="download-datasheet"/g)).toHaveLength(2);
 expect(result.html).toContain('data-najhum-slot="related-products"');
 expect(result.scripts.join('\n')).not.toContain('var REL =');expect(result.scripts.join('\n')).not.toContain('DATASHEETS');
 expect(result.assets.length).toBeGreaterThan(0);
});
