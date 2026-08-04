import React from "react";
import ScrollReveal from "./ScrollReveal";

export default function WhyUs() {
  const comparisonRows = [
    {
      feature: "Lighthouse Score / Speed",
      us: "98% - 100% Guaranteed",
      others: "40% - 60% (Bloated Page Builders)",
      isUsHighlight: true
    },
    {
      feature: "Visual Customization",
      us: "100% Bespoke Code (No Templates)",
      others: "WordPress / Elementor drag-and-drop templates"
    },
    {
      feature: "Conversion Architecture",
      us: "Psychological CRO Integration",
      others: "Static 'information-only' layouts"
    },
    {
      feature: "Mobile Optimization",
      us: "Fluid, responsive grid breakpoints",
      others: "Basic resizing with layout breakage"
    },
    {
      feature: "SEO Strategy",
      us: "Perfect technical schema & structure",
      others: "Basic title tagging via generic plugins"
    },
    {
      feature: "Clean Scalable Code",
      us: "Maintainable Modern Stack (JS/CSS)",
      others: "Spaghetti PHP, outdated libraries, vulnerabilities"
    },
    {
      feature: "Post-Launch Support",
      us: "24/7 Priority SLA Response",
      others: "Difficult communication & delayed edits"
    }
  ];

  return (
    <section className="why-us-section id-anchor" id="why-us">
      <div className="container">
        <ScrollReveal className="section-header">
          <h2 className="section-title">The Zerofy Standard</h2>
          <p className="section-subtitle">
            We don't build template systems. Here is why premium companies choose us over cheap alternatives.
          </p>
        </ScrollReveal>

        <ScrollReveal className="comparison-container">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature / Standard</th>
                <th className="table-brand-highlight">Zerofy Digital</th>
                <th>Standard Agencies / Freelancers</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.feature}</td>
                  <td className="table-brand-highlight">
                    {row.isUsHighlight ? <strong>{row.us}</strong> : row.us}
                  </td>
                  <td>{row.others}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollReveal>
      </div>
    </section>
  );
}
