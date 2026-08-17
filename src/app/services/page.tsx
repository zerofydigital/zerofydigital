"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import ConsultationModal from "@/components/ConsultationModal";
import ScrollReveal from "@/components/ScrollReveal";

export default function ServicesPage() {
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
        
        {/* Page Title Block */}
        <section className="container" style={{ marginBottom: "60px" }}>
          <ScrollReveal>
            <div className="badge-premium">
              <span className="badge-dot"></span>
              <span>Our Capabilities</span>
            </div>
            <h1 className="subpage-hero-title">
              Bespoke Engineering for <span className="text-gradient">Elite Brands</span>.
            </h1>
            <p className="subpage-hero-subtitle">
              We build custom Web Applications, SaaS Landing pages, E-Commerce platforms, and high-performance business portals. Explore our engineering disciplines.
            </p>
          </ScrollReveal>
        </section>

        {/* Detailed services cards grid */}
        <Services />

        {/* Competitive matrix comparisons */}
        <WhyUs />

        {/* FAQ Section */}
        <FAQ />

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
