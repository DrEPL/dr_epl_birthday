import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />

        {/* Balises meta essentielles */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Invitation à l'anniversaire du Dr EPL - 15 ans d'existence et n+1 années d'expérience" />
        <meta name="keywords" content="anniversaire, Dr EPL, invitation, fête, 13 Juillet" />
        <meta name="author" content="Dr EPL" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Icône pour appareils Apple */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Icône pour Android / manifest */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* Icônes pour différentes tailles */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Anniversaire du Dr EPL" />
        <meta property="og:description" content="Invitation à l'anniversaire du Dr EPL - 15 ans d'existence" />
        <meta property="og:image" content="https://drepl.cg/drepl.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
