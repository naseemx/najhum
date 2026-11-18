# Local website fonts

These WOFF2 files are the Latin subsets of the same Inter, Outfit and Poppins families used by the website. Inter and Outfit are variable fonts; Poppins has the existing 300–900 static weights. Original Google Fonts download URLs are recorded in sources.json. Each family's SIL Open Font License is included alongside the files.

Load them only through src/styles/fonts.ts using next/font/local. Root font variables and platform typography remain unchanged. Do not reintroduce next/font/google in page files: local files avoid build-time font fetches and the Turbopack Google-font query parsing failure.
