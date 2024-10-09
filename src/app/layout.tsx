import type { PropsWithChildren } from "react";
import { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Analytics, AnalyticsConfig } from "pliny/analytics";
import { SearchConfig, SearchProvider } from "pliny/search";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import SectionContainer from "~/components/SectionContainer";
import siteMetadata from "~/data/siteMetadata";
import { ThemeProviders } from "./theme-providers";

import "~/css/tailwind.css";
import "pliny/search/algolia.css";
import "remark-github-blockquote-alert/alert.css";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const basePath = process.env.BASE_PATH || "";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: "./",
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "./",
    types: {
      "application/rss+xml": `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: "summary_large_image",
    images: [siteMetadata.socialBanner],
  },

  icons: {
    icon: [
      {
        url: `${basePath}/static/favicons/favicon-32x32.png`,
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: `${basePath}/static/favicons/favicon-16x16.png`,
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "76x76", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    other: [
      {
        rel: "mask-icon",
        url: `${basePath}/static/favicons/safari-pinned-tab.svg`,
        color: "#5bbad5",
      },
    ],
  },
  manifest: `${basePath}/static/favicons/site.webmanifest`,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang={siteMetadata.language}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <meta name="msapplication-TileColor" content="#000000" />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#fff"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#000"
      />
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProviders>
          <Analytics
            analyticsConfig={siteMetadata.analytics as AnalyticsConfig}
          />
          <SectionContainer>
            <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
              <Header />
              <main className="mb-auto">{children}</main>
            </SearchProvider>
            <Footer />
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  );
}
