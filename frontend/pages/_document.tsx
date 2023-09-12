import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";

interface ExtendedDocumentInitialProps extends DocumentInitialProps {
  locale?: string;
}

class Doc extends Document<ExtendedDocumentInitialProps> {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<ExtendedDocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      locale: ctx.locale, // we're adding the locale to the returned props
    };
  }

  render() {
    const { locale } = this.props;

    return (
      <Html lang={locale} className="hidden">
        <Head>
          <meta charSet="UTF-8" />
          {/* <meta
            name="google-site-verification"
            content=""
          /> */}
          <meta name="twitter:image:alt" content={process.env.orgName} />
          <meta property="og:type" content="website" />
          {/* <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`/assets/images/favicon/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`/assets/images/favicon/favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`/assets/images/favicon/favicon-16x16.png`}
          />
          <link rel="manifest" href="/config/site.webmanifest" />
          <link
            rel="mask-icon"
            href={`/assets/images/favicon/safari-pinned-tab.svg`}
            color="#11190c"
          />
          <link
            rel="shortcut icon"
            type="image/png"
            href={`/assets/images/favicon/favicon.svg`}
          />
          <link
            rel="shortcut icon"
            type="image/png"
            href={`/assets/images/favicon/favicon.png`}
          />
          <link
            rel="shortcut icon"
            href={`/assets/images/favicon/favicon.ico`}
          /> */}
          <meta
            name="apple-mobile-web-app-title"
            content={process.env.orgNameShort}
          />
          <meta name="application-name" content={process.env.orgNameShort} />
          <meta name="msapplication-TileColor" content="#ffffff" />
          {/* <meta
            name="msapplication-config"
            content="/config/browserconfig.xml"
          /> */}
          <meta name="theme-color" content="#ffffff" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="author" content={process.env.orgName} />
          <meta name="copyright" content={process.env.orgName} />
          <meta name="language" content={locale} />
          <meta name="og:site_name" content={process.env.orgName} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta content="yes" name="apple-touch-fullscreen" />
          <meta name="color-scheme" content="light" />
          <meta name="supported-color-schemes" content="light" />
          {/* place preconnect domains here for assets / data / etc if needed */}
          {/* <link rel="preconnect" href="https://www.google-analytics.com"/> */}
          {/* <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Doc;
