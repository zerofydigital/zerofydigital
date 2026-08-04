"use client";

import React, { useState } from "react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.budget) {
      setIsSubmitted(true);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    // Wait for fadeout animation before resetting form
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        company: "",
        budget: "",
        message: "",
      });
      setIsSubmitted(false);
    }, 400);
  };

  return (
    <div className={`modal-overlay active`} onClick={handleOverlayClick}>
      <div className="modal-card">
        <button className="modal-close" onClick={handleClose} aria-label="Close Modal">
          &times;
        </button>
        <div className="modal-body">
          {!isSubmitted ? (
            <>
              <h3 className="modal-title">Book a Free Consultation</h3>
              <p className="modal-desc">
                Discuss your project outline and conversion targets with our lead structural designer. No pressure, just value.
              </p>

              <form className="modal-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Marcus Harris"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Work Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="marcus@aura.io"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company / URL</label>
                  <input
                    type="text"
                    id="company"
                    placeholder="aura.io"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="budget">Project Budget</label>
                  <select
                    id="budget"
                    required
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select a range...</option>
                    <option value="4l-8l">₹4,00,000 - ₹8,00,000</option>
                    <option value="8l-15l">₹8,00,000 - ₹15,00,000</option>
                    <option value="15l+">₹15,00,000+</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Tell us about your project</label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="We need to build a high-performance landing page to scale advertising campaigns..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  Submit Request
                </button>
              </form>
            </>
          ) : (
            <div className="modal-success-state" style={{ display: "flex" }}>
              <div className="success-icon-circle">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth={3}>
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h4>Request Received Successfully</h4>
              <p>
                We are parsing your request. A calendar invitation will be dispatched to your work email address within the next 2 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
