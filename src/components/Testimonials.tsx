import React from "react";
import ScrollReveal from "./ScrollReveal";

interface Testimonial {
  body: string;
  avatar: string;
  name: string;
  role: string;
}

export default function Testimonials() {
  const reviews: Testimonial[] = [
    {
      body: '"Zerofy replaced our slow template website with a completely bespoke layout. Our leads increased by 114% in the first month. The page loads instantaneously."',
      avatar: "MH",
      name: "Marcus Harris",
      role: "Founder, Aura Technologies"
    },
    {
      body: '"The checkout flow they engineered is beautiful. Our cart abandonment dropped to record lows. Their attention to pixel alignment and transitions is outstanding."',
      avatar: "SL",
      name: "Sarah Lang",
      role: "Product Lead, Apex Luxury Wear"
    },
    {
      body: '"Working with them felt like an extension of our in-house engineering team. They delivered clean code and met every design requirement perfectly."',
      avatar: "DC",
      name: "David Chen",
      role: "CTO, Nova Financial Group"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <ScrollReveal className="section-header">
          <h2 className="section-title">Validation of Excellence</h2>
          <p className="section-subtitle">
            What founders and tech executives say after launching with Zerofy Digital.
          </p>
        </ScrollReveal>

        <div className="testimonials-grid">
          {reviews.map((rev, idx) => (
            <ScrollReveal key={idx} className="testimonial-card">
              <div className="test-stars">★★★★★</div>
              <p className="test-body">{rev.body}</p>
              <div className="test-client">
                <div className="client-avatar">{rev.avatar}</div>
                <div>
                  <div className="client-name">
                    {rev.name} <span className="badge-verified">&#10003;</span>
                  </div>
                  <div className="client-role">{rev.role}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
