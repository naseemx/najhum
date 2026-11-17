/** Public discovery only; admin content and direct page URLs are retained. */
export const publicSections = { blogs: false, portfolio: false, industrySolutions: false };
export function isPublicSectionVisible(href:string) {
 return !((!publicSections.blogs && /^\/blogs(?:\/|$|\?)/.test(href)) || (!publicSections.portfolio && /^\/portfolio(?:\/|$|\?)/.test(href)));
}
