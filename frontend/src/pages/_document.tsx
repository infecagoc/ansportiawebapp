import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Single adaptive favicon: swaps its own colors by browser theme
            (dark logo on light browsers, light logo on dark browsers) */}
        <link rel="icon" href="/Images/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/Images/lightlogo.svg" />
        {/* Brand heading font — Google Sans Flex (variable weight 1..1000).
            Not available via next/font in this Next version, so loaded here.
            Wired to the --font-brand token in globals.css. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@1..1000&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="min-h-screen antialiased bg-cream text-ink">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
