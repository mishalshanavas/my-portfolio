import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import Footer from "./components/footer";
import { ThemeProvider } from "./components/theme-switch";
import { metaData } from "./lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(metaData.baseUrl),
  title: {
    default: `${metaData.name} | Backend Developer`,
    template: `%s | ${metaData.name}`,
  },
  description: metaData.description,
  keywords: [
    "Backend Developer",
    "Cloud",
    "Python",
    "Django",
    "MySQL",
    "Terraform",
    "GCP",
    "API Development",
    "Portfolio"
  ],
  authors: [{ name: metaData.name }],
  creator: metaData.name,
  openGraph: {
    images: metaData.ogImage,
    title: `${metaData.name} | Backend Developer`,
    description: metaData.description,
    url: metaData.baseUrl,
    siteName: metaData.name,
    locale: "en_US",
    type: "website",
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
    title: `${metaData.name} | Backend Developer`,
    card: "summary_large_image",
    creator: "@mishal_shanavas",
 },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/rss.xml"
          title="RSS Feed"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          href="/atom.xml"
          title="Atom Feed"
        />
        <link
          rel="alternate"
          type="application/feed+json"
          href="/feed.json"
          title="JSON Feed"
        />
      </head>
      <body className={`${GeistSans.className} antialiased bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <div className="min-h-screen flex flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Skip to main content for accessibility */}
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gray-900 text-gray-50 px-4 py-2 rounded z-50"
            >
              Skip to main content
            </a>
            
            <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full">
              <Navbar />
              
              <main 
                id="main-content"
                className="flex-1 px-4 sm:px-6 py-4 sm:py-8"
              >
                {children}
              </main>
              
              <Footer />
            </div>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
