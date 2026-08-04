import React from "react";
import ScrollReveal from "./ScrollReveal";

interface Step {
  step: number;
  title: string;
  desc: string;
}

export default function Process() {
  const blueprintSteps: Step[] = [
    {
      step: 1,
      title: "Discovery",
      desc: "Deep immersion into your brand, requirements, industry competition, and core growth metrics."
    },
    {
      step: 2,
      title: "Research",
      desc: "Auditing successful competitor funnels and parsing audience behaviors to map layout priorities."
    },
    {
      step: 3,
      title: "Wireframe",
      desc: "Structuring the conversion architecture with blueprint wireframes outlining exact user interactions."
    },
    {
      step: 4,
      title: "Design",
      desc: "Creating modern interactive UI screens in Figma, applying premium branding guidelines and micro-elements."
    },
    {
      step: 5,
      title: "Development",
      desc: "Writing highly performant, semantic frontend code using clean CSS guidelines and reactive logic scripts."
    },
    {
      step: 6,
      title: "Testing",
      desc: "Rigorous unit checks, multi-device layouts inspection, accessibility auditing, and Lighthouse validations."
    },
    {
      step: 7,
      title: "Launch",
      desc: "Safe servers configuration, deployment setups, analytics embedding, and launching to production smoothly."
    },
    {
      step: 8,
      title: "Support",
      desc: "Continuous monitor checks, rapid priority updates, security updates, and performance checks under SLA."
    }
  ];

  return (
    <section className="process-section id-anchor" id="process">
      <div className="container">
        <ScrollReveal className="section-header">
          <h2 className="section-title">Our Blueprint to Success</h2>
          <p className="section-subtitle">
            A highly structured 8-step journey engineered to deliver perfection without delays.
          </p>
        </ScrollReveal>

        <div className="timeline-container">
          <div className="timeline-line"></div>

          {blueprintSteps.map((stepItem, idx) => (
            <ScrollReveal key={idx} className="timeline-step">
              <div className="step-marker">{stepItem.step}</div>
              <div className="step-content">
                <h3 className="step-title">{stepItem.title}</h3>
                <p className="step-desc">{stepItem.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
