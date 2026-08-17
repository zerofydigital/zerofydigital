"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Process from "@/components/Process";
import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutPage() {
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  const openConsultModal = () => {
    setIsConsultOpen(true);
  };

  const closeConsultModal = () => {
    setIsConsultOpen(false);
  };

  return (
    <>
      <Header onOpenConsult={openConsultModal} />
      <main style={{ paddingTop: "120px" }}>
        
        {/* About Hero / Story Section */}
        <section className="container" style={{ marginBottom: "80px" }}>
          <ScrollReveal>
            <div className="badge-premium">
              <span className="badge-dot"></span>
              <span>Our Agency Story</span>
            </div>
            <h1 className="subpage-hero-title">
              Standardizing Web Excellence. <span className="text-gradient">Zero Shortcuts</span>.
            </h1>
            <p className="subpage-hero-subtitle">
              Zerofy Digital was founded to solve a critical issue: bloated templates and slow codebases. We believe that premium brands deserve handcrafted digital interfaces that look like art and run like software.
            </p>
          </ScrollReveal>

          {/* Grid of Values */}
          <div className="services-grid" style={{ marginTop: "60px" }}>
            <ScrollReveal className="service-card">
              <h3 className="card-title" style={{ color: "var(--color-accent)" }}>Bespoke Code</h3>
              <p className="card-description">We write clean HTML, custom styling rules, and native Javascript scripts. No visual builders, no bloated third-party dependencies.</p>
            </ScrollReveal>

            <ScrollReveal className="service-card">
              <h3 className="card-title" style={{ color: "var(--color-primary)" }}>Conversion-Driven</h3>
              <p className="card-description">Every layout is structured using consumer psychology parameters to capture leads, build brand authority, and maximize ROI.</p>
            </ScrollReveal>

            <ScrollReveal className="service-card">
              <h3 className="card-title" style={{ color: "var(--color-secondary)" }}>Guaranteed Performance</h3>
              <p className="card-description">We build with target optimization benchmarks, ensuring our clients achieve consistent 98-100% Page Speed scores.</p>
            </ScrollReveal>
          </div>
        </section>

        {/* 8-Step Timeline Section */}
        <section id="process">
          <Process />
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
