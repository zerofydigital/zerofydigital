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

export const metadata: Metadata = {
  title: "Zerofy Digital | Premium Web Design & Development Agency",
  description: "We build luxury, ultra-fast websites and custom web applications that turn visitors into high-value customers. Standard-setting design for startups, SaaS, and premium brands.",
  keywords: [
    "web development agency",
    "premium web design",
    "SaaS landing pages",
    "high-end websites",
    "Custom React",
    "Stripe-like design",
    "luxury web design",
    "Zerofy Digital"
  ],
  authors: [{ name: "Zerofy Digital" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://zerofydigital.com/",
    title: "Zerofy Digital | Premium Web Design & Development Agency",
    description: "We build luxury, ultra-fast websites and custom web applications that turn visitors into high-value customers.",
    images: [{ url: "https://zerofydigital.com/assets/og-image.jpg" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Zerofy Digital | Premium Web Design & Development Agency",
    description: "We build luxury, ultra-fast websites and custom web applications that turn visitors into high-value customers.",
    images: ["https://zerofydigital.com/assets/og-image.jpg"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Schema data definition
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Zerofy Digital",
    "image": "https://zerofydigital.com/assets/og-image.jpg",
    "@id": "https://zerofydigital.com/#agency",
    "url": "https://zerofydigital.com/",
    "telephone": "+1-800-ZEROFY",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "100 Pine Street",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94111",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.7925,
      "longitude": -122.4014
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://twitter.com/zerofydigital",
      "https://github.com/zerofydigital",
      "https://linkedin.com/company/zerofydigital"
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%235B5FFF'/%3E%3Cpath d='M35 50 L45 60 L65 40' stroke='white' stroke-width='8' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
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
