"use client";

import React, { useState, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

interface FAQItemData {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItemData[] = [
    {
      question: "Why is custom development so much better than templates?",
      answer: "Templates are built to satisfy everyone, resulting in bloated files, slow server load times, and poor SEO metrics. Our custom sites feature clean, semantic markup written strictly for your needs, driving Lighthouse scores to 99-100% and boosting conversions by matching your exact customer journey."
    },
    {
      question: "What is your typical project timeline?",
      answer: "A typical landing page or basic website takes 2-4 weeks. Complex enterprise layouts with custom animations or dashboards can take 6-10 weeks. We detail milestones during our initial wireframing phase to guarantee timelines."
    },
    {
      question: "Will I be able to edit page contents easily later?",
      answer: "Yes. We can construct content integrations via headless CMS engines like Sanity, Contentful, or custom structures. This gives your marketing team complete autonomy to edit blogs, products, or values without breaking design grids."
    },
    {
      question: "Do you work with existing branding parameters?",
      answer: "Absolutely. We regularly collaborate with client design systems, styling guides, and color specs to extend visual frameworks consistently across the web environment."
    },
    {
      question: "What support guarantees are included post-launch?",
      answer: "All packages come with a fixed priority support SLA covering bug fixes, browser updates, security checks, and basic content edits. We respond to support tickets within 4 hours during working windows."
    }
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section id-anchor" id="faq">
      <div className="container">
        <ScrollReveal className="section-header">
          <h2 className="section-title">Common Questions</h2>
          <p className="section-subtitle">
            Addressing key reservations and outlining operations transparently.
          </p>
        </ScrollReveal>

        <ScrollReveal className="faq-accordion-container">
          {faqs.map((faq, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={idx}
                className={`faq-item ${isActive ? "active" : ""}`}
              >
                <button
                  className="faq-question"
                  onClick={() => handleToggle(idx)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">+</span>
                </button>
                <div
                  className="faq-answer"
                  style={{
                    maxHeight: isActive ? "200px" : "0px", // fixed max height range for smooth transition
                    transition: "max-height 0.3s ease-out"
                  }}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
