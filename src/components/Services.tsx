"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";

interface ServiceItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export default function Services() {
  const serviceList: ServiceItem[] = [
    {
      title: "Website Design",
      desc: "High-end layouts that balance premium aesthetics with flawless usability, making your brand look like a market leader.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      title: "Website Development",
      desc: "Pixel-perfect implementation of complex, responsive frontend code, written for speed, clean structures, and longevity.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      title: "Landing Pages",
      desc: "Purpose-built standalone pages constructed around key psychological conversion steps to double your advertisement ROI.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
        </svg>
      ),
    },
    {
      title: "Business Websites",
      desc: "Corporate systems that establish unwavering credibility, capturing leads and communicating corporate stature.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="M21 15l-3.086-3.086a2 2 0 00-2.828 0L6 21" />
        </svg>
      ),
    },
    {
      title: "E-commerce",
      desc: "Modern storefront transactions powered by secure, lighting-fast checkouts designed to minimize cart abandonment.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
        </svg>
      ),
    },
    {
      title: "UI/UX Design",
      desc: "Deep research, user flow optimization, and custom Figma interactive prototypes ensuring flawless customer journeys.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
    },
    {
      title: "SEO Optimization",
      desc: "Advanced technical optimization of metadata, headings, page speeds, and schemas to secure high Google rankings.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      title: "Performance Tuning",
      desc: "Refactoring code bases, image optimization, and caching rules to hit consistent 100/100 Lighthouse metrics.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      title: "Custom Applications",
      desc: "Complex dashboard panels, API web integrations, and scalable databases built customized to your operations.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
          <path d="M12 17h.01" />
        </svg>
      ),
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  return (
    <section className="services-section id-anchor" id="services">
      <div className="container">
        <ScrollReveal className="section-header">
          <h2 className="section-title">Engineered to Convert</h2>
          <p className="section-subtitle">
            We design and construct digital products that push the absolute limits of performance and conversion optimization.
          </p>
        </ScrollReveal>

        <div className="services-grid">
          {serviceList.map((item, idx) => (
            <ScrollReveal key={idx}>
              <div className="service-card" onMouseMove={handleMouseMove}>
                <div className="card-icon">{item.icon}</div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
