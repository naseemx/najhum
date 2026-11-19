import {it,expect} from 'vitest';
import {preparePublishedCss} from './assets';
it('preserves SVG masks and filters when CSS moves out of the HTML',()=>{
 expect(preparePublishedCss('.a{filter:url(#shadow);mask:url("#mask")}','products','meter')).toBe('.a{filter:url("/products/meter#shadow");mask:url("/products/meter#mask")}');
});
it('leaves uploaded images, data URLs and ordinary CSS unchanged',()=>{
 const css='.a{background:url("https://media.test/image.webp")} .b{mask:url("data:image/svg+xml;base64,AAAA")}';expect(preparePublishedCss(css,'solutions','cold')).toBe(css);
});
