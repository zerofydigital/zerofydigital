import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        {/* Theme Initialization Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('zerofy-theme') || 'dark';
                  document.documentElement.classList.add(theme + '-theme');
                } catch (e) {}
              })();
            `
          }}
        />
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
          className="whatsapp-float-btn hover:scale-110"
          aria-label="Chat on WhatsApp"
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
            boxShadow: "0 6px 20px rgba(37, 211, 102, 0.4)"
          }}
        >
          <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
          </svg>
        </a>
      </body>
    </html>
  );
}
