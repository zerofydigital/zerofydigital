"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactPage() {
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  
  // Interactive Scope State
  const [projectScope, setProjectScope] = useState<string>("SaaS Website");
  const [projectBudget, setProjectBudget] = useState<string>("₹8,00,000 - ₹15,00,000");
  const [projectTimeline, setProjectTimeline] = useState<string>("1-2 Months");
  const [isCustomBudget, setIsCustomBudget] = useState<boolean>(false);
  const [customBudgetInput, setCustomBudgetInput] = useState<string>("");
  
  // Contact details state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setIsSubmitted(true);
    }
  };

  const openConsultModal = () => {
    setIsConsultOpen(true);
  };

  const closeConsultModal = () => {
    setIsConsultOpen(false);
  };

  return (
    <>
      <Header onOpenConsult={openConsultModal} />
      <main style={{ paddingTop: "120px", paddingBottom: "80px" }}>
        <section className="container">
          <div className="checkout-split" style={{ gridTemplateColumns: "0.9fr 1.1fr", gap: "48px" }}>
            
            {/* Scope Summary / Visual Details panel */}
            <ScrollReveal className="card-visualizer-container">
              <div className="badge-premium">
                <span className="badge-dot"></span>
                <span>Project Scope Builder</span>
              </div>
              <h1 className="hero-title" style={{ fontSize: "2.75rem", lineHeight: "1.1" }}>
                Let's Build <span className="text-gradient">Something Rare</span>.
              </h1>
              <p className="hero-subtitle" style={{ fontSize: "0.95rem", margin: "12px 0 24px 0" }}>
                Select your engineering requirements and estimated budget framework. Our structural designer will prepare a detailed roadmap for our kickoff discussion.
              </p>

              {/* Dynamic receipt preview of selections */}
              <div className="price-breakdown" style={{ background: "rgba(91, 95, 255, 0.03)", borderColor: "rgba(91, 95, 255, 0.15)" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: "16px", color: "white" }}>Project Blueprint Review</h4>
                <div className="breakdown-row">
                  <span>Selected Category</span>
                  <span className="text-accent"><strong>{projectScope}</strong></span>
                </div>
                <div className="breakdown-row">
                  <span>Budget Allocation</span>
                  <span style={{ color: "white" }}>{projectBudget}</span>
                </div>
                <div className="breakdown-row">
                  <span>Target Schedule</span>
                  <span style={{ color: "white" }}>{projectTimeline}</span>
                </div>
                <div className="breakdown-row" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "12px", marginTop: "4px" }}>
                  <span>Kick-off Call Rate</span>
                  <span className="text-accent"><strong>FREE (30 Mins)</strong></span>
                </div>
              </div>
            </ScrollReveal>

            {/* Scope Selectors and inputs */}
            <ScrollReveal>
              {!isSubmitted ? (
                <div className="dashboard-wrapper" style={{ padding: "36px", background: "rgba(17, 24, 39, 0.3)" }}>
                  <form className="modal-form" onSubmit={handleSubmit}>
                    
                    {/* Scope Category Buttons */}
                    <div className="form-group">
                      <label>Project Scope Category</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "6px" }}>
                        {["SaaS Website", "Custom Web App", "E-commerce Shop", "UI/UX Design"].map((scope) => (
                          <button
                            key={scope}
                            type="button"
                            className={`btn btn-sm ${projectScope === scope ? "btn-primary" : "btn-secondary"}`}
                            style={{ borderRadius: "50px", fontSize: "0.8rem", padding: "6px 16px" }}
                            onClick={() => setProjectScope(scope)}
                          >
                            {scope}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Budget Category Buttons */}
                    <div className="form-group">
                      <label>Framework Budget</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "6px" }}>
                        {["₹4,00,000 - ₹8,00,000", "₹8,00,000 - ₹15,00,000", "₹15,00,000+"].map((bud) => (
                          <button
                            key={bud}
                            type="button"
                            className={`btn btn-sm ${projectBudget === bud && !isCustomBudget ? "btn-primary" : "btn-secondary"}`}
                            style={{ borderRadius: "50px", fontSize: "0.8rem", padding: "6px 16px" }}
                            onClick={() => {
                              setProjectBudget(bud);
                              setIsCustomBudget(false);
                            }}
                          >
                            {bud}
                          </button>
                        ))}
                        <button
                          type="button"
                          className={`btn btn-sm ${isCustomBudget ? "btn-primary" : "btn-secondary"}`}
                          style={{ borderRadius: "50px", fontSize: "0.8rem", padding: "6px 16px" }}
                          onClick={() => {
                            setIsCustomBudget(true);
                            setProjectBudget(customBudgetInput ? `₹${Number(customBudgetInput).toLocaleString("en-IN")}` : "Custom Budget");
                          }}
                        >
                          Custom...
                        </button>
                      </div>

                      {isCustomBudget && (
                        <div style={{ marginTop: "12px", animation: "fade-in 0.2s ease" }}>
                          <input
                            type="text"
                            placeholder="Enter your exact budget (₹)"
                            value={customBudgetInput}
                            style={{
                              background: "rgba(255, 255, 255, 0.03)",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              borderRadius: "var(--border-radius-sm)",
                              color: "white",
                              padding: "10px 14px",
                              fontSize: "0.9rem",
                              width: "100%",
                              outline: "none"
                            }}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, "");
                              setCustomBudgetInput(val);
                              setProjectBudget(val ? `₹${Number(val).toLocaleString("en-IN")}` : "Custom Budget");
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Timeline Category Buttons */}
                    <div className="form-group">
                      <label>Target Timeline</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "6px" }}>
                        {["< 1 Month", "1-2 Months", "2-3 Months"].map((time) => (
                          <button
                            key={time}
                            type="button"
                            className={`btn btn-sm ${projectTimeline === time ? "btn-primary" : "btn-secondary"}`}
                            style={{ borderRadius: "50px", fontSize: "0.8rem", padding: "6px 16px" }}
                            onClick={() => setProjectTimeline(time)}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Text Inputs */}
                    <div className="form-group" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "16px", marginTop: "8px" }}>
                      <label htmlFor="user-name">Your Full Name</label>
                      <input
                        type="text"
                        id="user-name"
                        required
                        placeholder="Marcus Harris"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="user-email">Work Email</label>
                      <input
                        type="email"
                        id="user-email"
                        required
                        placeholder="marcus@aura.io"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="user-msg">Tell us about your brand</label>
                      <textarea
                        id="user-msg"
                        rows={3}
                        placeholder="Outline target conversions or design constraints..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary w-full" style={{ marginTop: "12px" }}>
                      Submit Blueprint Setup
                    </button>
                  </form>
                </div>
              ) : (
                <div className="dashboard-wrapper" style={{ padding: "48px", background: "rgba(17, 24, 39, 0.4)", textAlign: "center" }}>
                  <div className="success-icon-circle" style={{ margin: "0 auto 24px auto" }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="modal-title" style={{ fontSize: "1.75rem", marginBottom: "12px" }}>Request Verified</h3>
                  <p className="success-invoice" style={{ display: "inline-block", margin: "0 auto 16px auto" }}>
                    Onboarding Code: <strong>ZF-{Math.floor(1000 + Math.random() * 9000)}-OK</strong>
                  </p>
                  <p style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)", maxWidth: "340px", margin: "0 auto 24px auto" }}>
                    Thank you {name}. We have compiled your selection for a **{projectScope}** under the **{projectBudget}** budget framework. A kickoff calendar invitation has been dispatched to **{email}**.
                  </p>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      setIsSubmitted(false);
                      setName("");
                      setEmail("");
                      setMessage("");
                    }}
                  >
                    Configure Another Blueprint
                  </button>
                </div>
              )}
            </ScrollReveal>

          </div>
        </section>
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
