"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import ScrollReveal from "@/components/ScrollReveal";

interface Project {
  title: string;
  category: "SaaS" | "E-commerce" | "Corporate";
  desc: string;
  tags: string[];
  mockupClass: string;
  mockupContent: React.ReactNode;
}

export default function PortfolioPage() {
  const [filter, setFilter] = useState<"All" | "SaaS" | "E-commerce" | "Corporate">("All");
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  const openConsultModal = () => {
    setIsConsultOpen(true);
  };

  const closeConsultModal = () => {
    setIsConsultOpen(false);
  };

  const allProjects: Project[] = [
    {
      title: "Aura SaaS Landing Page",
      category: "SaaS",
      desc: "We redesigned Aura's subscription portal, resulting in an 84% conversion lift in under 3 weeks. Featuring customized dark UI models.",
      tags: ["SaaS", "Next.js", "Fintech"],
      mockupClass: "aura-mockup",
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
      category: "E-commerce",
      desc: "Built a lightning fast storefront optimized for luxury wear, achieving 0.2s page loads and a 4.12% drop in cart abandonment.",
      tags: ["E-commerce", "Vite", "Stripe API"],
      mockupClass: "apex-mockup",
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
      category: "Corporate",
      desc: "Designed a highly interactive investor-relations portal with animated financial charts, earning a Site of the Day nomination.",
      tags: ["Corporate", "WebGL", "Interactive"],
      mockupClass: "nova-mockup",
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
    {
      title: "Vortex Analytics Panel",
      category: "SaaS",
      desc: "An advanced real-time data dashboard with custom tracking widgets, helping tech companies monitor and forecast product parameters.",
      tags: ["SaaS", "Next.js", "Chart.js"],
      mockupClass: "aura-mockup", // Reuses styling for mockup representation
      mockupContent: (
        <>
          <div className="mockup-logo" style={{ color: "var(--color-primary)" }}>VORTEX</div>
          <div className="mockup-bar"></div>
          <div className="mockup-grid">
            <div className="mockup-card" style={{ height: "40px" }}></div>
            <div className="mockup-card" style={{ height: "40px" }}></div>
          </div>
        </>
      ),
    },
    {
      title: "Zenith Apparel Shop",
      category: "E-commerce",
      desc: "A headless shopfront built using Next.js and Shopify APIs, styled with obsidian glass card layouts and modern hover reveals.",
      tags: ["E-commerce", "Shopify", "React"],
      mockupClass: "apex-mockup",
      mockupContent: (
        <>
          <div className="mockup-logo" style={{ color: "var(--color-secondary)" }}>ZENITH</div>
          <div className="mockup-bar"></div>
          <div className="mockup-circles">
            <div className="mockup-circle" style={{ background: "rgba(139, 92, 246, 0.08)" }}></div>
            <div className="mockup-circle" style={{ background: "rgba(139, 92, 246, 0.08)" }}></div>
          </div>
        </>
      ),
    }
  ];

  const filteredProjects = allProjects.filter(
    (p) => filter === "All" || p.category === filter
  );

  return (
    <>
      <Header onOpenConsult={openConsultModal} />
      <main style={{ paddingTop: "120px" }}>
        
        <section className="container">
          <ScrollReveal>
            <div className="badge-premium">
              <span className="badge-dot"></span>
              <span>Case Studies</span>
            </div>
            <h1 className="hero-title" style={{ fontSize: "3.5rem", maxWidth: "800px" }}>
              Our Case Studies & <span className="text-gradient">Bespoke Work</span>.
            </h1>
            <p className="hero-subtitle" style={{ fontSize: "1.1rem", maxWidth: "600px", marginTop: "16px" }}>
              A collection of high-performance digital engines we built for global clients. Filter projects by industry discipline.
            </p>
          </ScrollReveal>

          {/* Dynamic Filter Controls */}
          <ScrollReveal
            className="dashboard-controls"
            style={{
              justifyContent: "center",
              marginTop: "48px",
              marginBottom: "48px",
              gap: "12px",
            }}
          >
            {(["All", "SaaS", "E-commerce", "Corporate"] as const).map((cat) => (
              <button
                key={cat}
                className={`btn btn-sm ${filter === cat ? "btn-primary" : "btn-secondary"}`}
                style={{ borderRadius: "50px", padding: "8px 24px" }}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </ScrollReveal>

          {/* Portfolio Grid */}
          <div className="portfolio-grid" style={{ minHeight: "400px" }}>
            {filteredProjects.map((project, idx) => (
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
                    <button className="portfolio-link" onClick={openConsultModal}>
                      Request Case Study &rarr;
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <ClosingCTA onOpenConsult={openConsultModal} />
      </main>
      <Footer />

      {/* Shared consultation modal */}
      <ConsultationModal
        isOpen={isConsultOpen}
        onClose={closeConsultModal}
      />
    </>
  );
}
