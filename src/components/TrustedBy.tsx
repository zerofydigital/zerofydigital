import React from "react";

export default function TrustedBy() {
  const logos = ["STRIPE", "VERCEL", "LINEAR", "FRAMER", "APPLE", "SLACK"];

  return (
    <section className="trusted-section">
      <div className="container">
        <p className="trusted-title">Trusted by elite teams at top brands</p>
        <div className="logos-marquee">
          <div className="marquee-track">
            {/* Direct double render for continuous infinite horizontal scroll */}
            {[...logos, ...logos].map((logo, idx) => (
              <div key={idx} className="partner-logo">
                <svg width="100" height="30" viewBox="0 0 100 30" fill="currentColor">
                  <text
                    x="0"
                    y="20"
                    fontFamily="'Space Grotesk', sans-serif"
                    fontWeight="700"
                    fontSize="18"
                  >
                    {logo}
                  </text>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
