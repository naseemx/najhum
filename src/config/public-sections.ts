/** Public discovery only; admin content and direct page URLs are retained. */
export const publicSections = { blogs: true, portfolio: false, industrySolutions: true };
export function isPublicSectionVisible(href:string) {
 return !((!publicSections.blogs && /^\/blogs(?:\/|$|\?)/.test(href)) || (!publicSections.portfolio && /^\/portfolio(?:\/|$|\?)/.test(href)));
}
