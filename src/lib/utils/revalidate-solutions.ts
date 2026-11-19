import { revalidatePath,revalidateTag } from 'next/cache';
import {SOLUTION_CONTENT_TAG} from '@/lib/published-content/constants';
import { getSolutionById } from '@/lib/db/queries/solutions';

export function revalidateSolutions(slug?: string) {
  revalidateTag(SOLUTION_CONTENT_TAG,{expire:0});
  revalidatePath('/solutions/[slug]','page');
  if (slug) revalidatePath(`/solutions/${slug}`);
  revalidatePath('/', 'layout');
  revalidatePath('/admin/solutions');
  revalidatePath('/solutions');
  for (const platform of ['iotrics', 'evoltics', 'cropifai']) revalidatePath(`/platforms/${platform}`);
  revalidatePath('/sitemap.xml');
}

export async function revalidateSolutionById(id: string) {
  const solution = await getSolutionById(id);
  revalidateSolutions(solution?.slug);
}
