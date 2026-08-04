"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";

interface PortfolioProps {
  onOpenConsult: () => void;
}

interface ProjectItem {
  title: string;
  desc: string;
  tags: string[];
  mockupClass: string;
  logo: string;
  mockupContent: React.ReactNode;
}

export default function Portfolio({ onOpenConsult }: PortfolioProps) {
  const projects: ProjectItem[] = [
    {
      title: "Aura SaaS Landing Page",
      desc: "We redesigned Aura's subscription portal, resulting in an 84% conversion lift in under 3 weeks. Featuring customized dark UI models.",
      tags: ["SaaS", "Next.js", "Fintech"],
      mockupClass: "aura-mockup",
      logo: "AURA",
      mockupContent: (
        <>
          <div className="mockup-logo">AURA</div>
          <div className="mockup-bar"></div>
          <div className="mockup-grid">
            <div className="mockup-card"></div>
            <div className="mockup-card"></div>
          </div>
        </>
      ),
    },
    {
      title: "Apex E-Commerce App",
      desc: "Built a lightning fast storefront optimized for luxury wear, achieving 0.2s page loads and a 4.12% drop in cart abandonment.",
      tags: ["E-commerce", "Vite", "Stripe API"],
      mockupClass: "apex-mockup",
      logo: "APEX",
      mockupContent: (
        <>
          <div className="mockup-logo">APEX</div>
          <div className="mockup-bar"></div>
          <div className="mockup-circles">
            <div className="mockup-circle"></div>
            <div className="mockup-circle"></div>
            <div className="mockup-circle"></div>
          </div>
        </>
      ),
    },
    {
      title: "Nova Business Portal",
      desc: "Designed a highly interactive investor-relations portal with animated financial charts, earning a Site of the Day nomination.",
      tags: ["Corporate", "WebGL", "Interactive"],
      mockupClass: "nova-mockup",
      logo: "NOVA",
      mockupContent: (
        <>
          <div className="mockup-logo">NOVA</div>
          <div className="mockup-bar"></div>
          <div className="mockup-blocks">
            <div className="mockup-block"></div>
            <div className="mockup-block"></div>
          </div>
        </>
      ),
    },
  ];

  return (
    <section className="portfolio-section id-anchor" id="portfolio">
      <div className="container">
        <ScrollReveal className="section-header">
          <h2 className="section-title">Case Studies & Work</h2>
          <p className="section-subtitle">
            A look at some of the conversion engines we have designed and built recently.
          </p>
        </ScrollReveal>

        <div className="portfolio-grid">
          {projects.map((project, idx) => (
            <ScrollReveal key={idx}>
              <div className="portfolio-card">
                <div className="portfolio-visual-container">
                  <div className={`mockup-screen ${project.mockupClass}`}>
                    <div className="mockup-nav">
                      <span className="mockup-dot"></span>
                      <span className="mockup-dot"></span>
                      <span className="mockup-dot"></span>
                    </div>
                    <div className="mockup-content">
                      {project.mockupContent}
                    </div>
                  </div>
                </div>
                <div className="portfolio-info">
                  <div className="portfolio-tags">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="p-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="portfolio-title">{project.title}</h3>
                  <p className="portfolio-desc">{project.desc}</p>
                  <button className="portfolio-link" onClick={onOpenConsult}>
                    Request Case Study &rarr;
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
