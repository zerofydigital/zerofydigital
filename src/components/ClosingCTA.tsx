"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";

interface ClosingCTAProps {
  onOpenConsult: () => void;
}

export default function ClosingCTA({ onOpenConsult }: ClosingCTAProps) {
  return (
    <section className="cta-section">
      <div className="grid-background"></div>
      <div className="container">
        <ScrollReveal>
          <h2 className="cta-title">
            Let's Build Something Your Competitors Will Wish They Had.
          </h2>
          <p className="cta-subtitle">
            Don't lose conversions to outdated designs. Work with an agency that demands perfection.
          </p>
          <button className="btn btn-primary btn-lg" onClick={onOpenConsult}>
            Start Your Project
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
