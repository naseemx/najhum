import localFont from 'next/font/local';

// Keep the production font files in the repository. No Google Fonts requests
// or Turbopack Google-font URL rewriting are needed during dev/build.
export const inter = localFont({
  src: './fonts/inter-latin-variable.woff2',
  weight: '300 700',
  style: 'normal',
  variable: '--font-sans-base',
  display: 'swap',
});

export const outfit = localFont({
  src: './fonts/outfit-latin-variable.woff2',
  weight: '400 900',
  style: 'normal',
  variable: '--font-display-base',
  display: 'swap',
});

export const poppins = localFont({
  src: [
    {path: './fonts/poppins-latin-300.woff2', weight: '300', style: 'normal'},
    {path: './fonts/poppins-latin-400.woff2', weight: '400', style: 'normal'},
    {path: './fonts/poppins-latin-500.woff2', weight: '500', style: 'normal'},
    {path: './fonts/poppins-latin-600.woff2', weight: '600', style: 'normal'},
    {path: './fonts/poppins-latin-700.woff2', weight: '700', style: 'normal'},
    {path: './fonts/poppins-latin-800.woff2', weight: '800', style: 'normal'},
    {path: './fonts/poppins-latin-900.woff2', weight: '900', style: 'normal'},
  ],
  variable: '--font-poppins-base',
  display: 'swap',
});
