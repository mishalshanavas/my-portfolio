import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "./components/nav";
import Footer from "./components/footer";
import { ThemeProvider } from "./components/theme-switch";
import { metaData,socialLinks } from "./lib/config";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  metadataBase: new URL(metaData.baseUrl),
  title: {
    default: metaData.title,
    template: `%s | ${metaData.title}`,
  },
  description: metaData.description,
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Portfolio",
    "Web Development"
  ],
  authors: [{ name: metaData.name }],
  creator: metaData.name,
  openGraph: {
    images: metaData.ogImage,
    title: metaData.title,
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
    title: metaData.name,
    card: "summary_large_image",
    creator: socialLinks.twitter,
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
    <html 
      lang="en" 
      className={`${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
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
        <link rel="preload" href="/profile-wt.jpg" as="image" />
        <link rel="preload" href="/profile-bl.jpg" as="image" />
      </head>
      <body className="antialiased font-inter bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
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
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white px-4 py-2 rounded z-50"
            >
              Skip to main content
            </a>
            
            <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
              <Navbar />
              
              <main 
                id="main-content"
                className="flex-1 px-4 sm:px-6 lg:px-8 py-8"
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
