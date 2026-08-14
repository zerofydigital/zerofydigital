import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import MouseGlow from "@/components/MouseGlow";
import CustomCursor from "@/components/CustomCursor";
import AiReceptionist from "@/components/AiReceptionist";
import { Analytics } from "@vercel/analytics/react";

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

const BASE_URL = "https://zerofydigital.vercel.app";

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
        <AiReceptionist />
        <Analytics />
        
        {/* Floating WhatsApp Widget */}
        <a 
          href="https://wa.me/917990603842?text=Hello%20Zerofy%20Digital,%20I%20would%20like%20to%20inquire%20about%20your%20web%20development%20services!" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{
            position: "fixed",
            bottom: "24px",
            right: "96px",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "60px",
            height: "60px",
            backgroundColor: "#25d366",
            borderRadius: "50%",
            color: "white",
            boxShadow: "0 6px 20px rgba(37, 211, 102, 0.4)",
            cursor: "pointer",
            transition: "transform 0.3s ease",
            textDecoration: "none",
          }}
          className="hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <svg 
            style={{ width: "34px", height: "34px", fill: "currentColor" }} 
            viewBox="0 0 24 24"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.863-9.73.001-2.597-1.006-5.038-2.835-6.87C16.671 2.16 14.238.996 11.64.996c-5.441 0-9.865 4.37-9.868 9.731-.001 1.764.475 3.483 1.378 5.017l-.988 3.61 3.73-.974zm11.233-7.224c-.3-.15-1.772-.875-2.046-.975-.276-.1-.476-.15-.677.15-.2.3-.777.975-.95 1.174-.173.199-.347.224-.647.075-.3-.15-1.265-.467-2.41-1.485-.89-.795-1.49-1.778-1.665-2.078-.175-.3-.019-.462.13-.61.135-.133.3-.349.45-.524.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.677-1.632-.927-2.233-.243-.587-.492-.507-.677-.517-.174-.008-.374-.01-.573-.01-.2 0-.526.075-.801.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.222 5.112 4.521.714.309 1.272.494 1.707.633.717.228 1.368.196 1.884.119.575-.085 1.772-.725 2.022-1.425.25-.7.25-1.299.175-1.424-.075-.125-.275-.2-.575-.35z"/>
          </svg>
        </a>
      </body>
    </html>
  );
}
