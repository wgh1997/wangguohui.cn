import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

  return (
    <Html lang="en">
      <Head>
        <link
          rel="preload"
          href="/fonts/assistant-v15-latin-700.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/assistant-v15-latin-800.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/jetbrains-mono-v11-latin-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/pt-serif-v16-latin-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/pt-serif-v16-latin-700.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/pt-serif-v16-latin-italic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/touch-192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
        <meta name="baidu-site-verification" content="code-EnHj3sGktU" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}');
            `,
          }}
        />
      </Head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            function getUserPreference() {
              if(window.localStorage.getItem('theme')) {
                return window.localStorage.getItem('theme')
              }
              return window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light'
            }
            document.body.dataset.theme = getUserPreference();
          `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}