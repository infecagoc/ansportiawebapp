import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Single adaptive favicon: swaps its own colors by browser theme
            (dark logo on light browsers, light logo on dark browsers) */}
        <link rel="icon" href="/Images/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/Images/lightlogo.svg" />
      </Head>
      <body className="min-h-screen antialiased bg-cream text-ink">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
