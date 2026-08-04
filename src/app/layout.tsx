import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import MouseGlow from "@/components/MouseGlow";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const BASE_URL = "https://zerofydigital.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  /* ── Core ── */
  title: {
    default: "Zerofy Digital | Website Development Agency in India",
    template: "%s | Zerofy Digital",
  },
  description:
    "Zerofy Digital builds high-converting, ultra-fast websites and custom web applications for businesses in India. Premium web development, UI/UX design, and SEO-optimized digital experiences that drive real growth.",

  /* ── Keywords ── */
  keywords: [
    "Zerofy Digital",
    "Zerofy",
    "zerofy digital",
    "zerofydigital",
    "website development agency India",
    "web development company India",
    "premium web design India",
    "high converting website",
    "Next.js website development",
    "custom website design",
    "business website development",
    "web agency Ahmedabad",
    "web design agency Gujarat",
    "SaaS landing page design",
    "ecommerce website development",
    "startup website design",
    "professional website development",
    "affordable web development India",
    "website development agency",
    "React website development",
    "Dhruv Khambhata",
    "zerofydigital.com",
  ],

  /* ── Authorship ── */
  authors: [{ name: "Dhruv Khambhata", url: BASE_URL }],
  creator: "Zerofy Digital",
  publisher: "Zerofy Digital",
  category: "Web Development Agency",

  /* ── Indexing ── */
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ── Canonical ── */
  alternates: {
    canonical: BASE_URL,
  },

  /* ── Open Graph (WhatsApp, Facebook, LinkedIn previews) ── */
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Zerofy Digital",
    title: "Zerofy Digital | Website Development Agency in India",
    description:
      "We build high-converting websites and custom web apps for businesses across India. Fast delivery, premium design, and results-driven development.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Zerofy Digital – Premium Website Development Agency",
      },
    ],
  },

  /* ── Twitter / X Card ── */
  twitter: {
    card: "summary_large_image",
    site: "@zerofydigital",
    creator: "@zerofydigital",
    title: "Zerofy Digital | Website Development Agency in India",
    description:
      "High-converting websites and custom web apps for Indian businesses. Premium design. Fast delivery. Real results.",
    images: [`${BASE_URL}/og-image.png`],
  },

  /* ── App / PWA hints ── */
  applicationName: "Zerofy Digital",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* ── JSON-LD Structured Data ── */
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zerofy Digital",
    alternateName: ["Zerofy", "zerofydigital"],
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      "Zerofy Digital is a premium website development agency in India specializing in high-converting websites, custom web applications, and digital experiences.",
    foundingDate: "2024",
    founders: [
      {
        "@type": "Person",
        name: "Dhruv Khambhata",
        sameAs: "https://www.linkedin.com/in/dhruv-khambhata/",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "zerofydigital@gmail.com",
      contactType: "customer support",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
    sameAs: [
      "https://www.linkedin.com/company/zerofydigital",
      "https://www.instagram.com/zerofy.digital/",
      "https://github.com/zerofydigital",
    ],
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Development",
            description:
              "Custom high-converting websites built with Next.js, React, and modern web technologies.",
          },
        },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Zerofy Digital",
    alternateName: "Zerofy",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Favicon */}
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='12' fill='%23ef4d23'/%3E%3Ccircle cx='50' cy='20' r='12' fill='%23ef4d23'/%3E%3Ccircle cx='50' cy='80' r='12' fill='%23ef4d23'/%3E%3Ccircle cx='20' cy='50' r='12' fill='%23ef4d23'/%3E%3Ccircle cx='80' cy='50' r='12' fill='%23ef4d23'/%3E%3Ccircle cx='29' cy='29' r='12' fill='%23ef4d23'/%3E%3Ccircle cx='71' cy='29' r='12' fill='%23ef4d23'/%3E%3Ccircle cx='29' cy='71' r='12' fill='%23ef4d23'/%3E%3Ccircle cx='71' cy='71' r='12' fill='%23ef4d23'/%3E%3C/svg%3E"
        />
        {/* Geo targeting for India */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />

        {/* JSON-LD: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* JSON-LD: WebSite (enables Sitelinks Search Box) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <MouseGlow />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
