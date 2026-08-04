"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsDisabled(true);
      setResponse("Deposit verified. Welcome to our network newsletter list.");
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="46" stroke="url(#logoGradFooter1)" strokeWidth="8" />
                <path d="M30 50 L45 65 L70 35" stroke="url(#logoGradFooter2)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="logoGradFooter1" x1="0" y1="0" x2="100" y2="100">
                    <stop offset="0%" stopColor="#5B5FFF" />
                    <stop offset="100%" stopColor="#00E5FF" />
                  </linearGradient>
                  <linearGradient id="logoGradFooter2" x1="0" y1="0" x2="100" y2="100">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#00E5FF" />
                  </linearGradient>
                </defs>
              </svg>
              <span>Zerofy<span className="logo-accent">.</span></span>
            </Link>
            <p className="footer-tagline">
              Setting modern design and engineering benchmarks for companies worldwide.
            </p>
            <div className="social-links">
              <a href="https://twitter.com/zerofydigital" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="https://github.com/zerofydigital" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
              <a href="https://linkedin.com/company/zerofydigital" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/portfolio">Our Work</Link>
            <Link href="/about#process">Blueprint</Link>
          </div>

          <div className="footer-links">
            <h4>Services</h4>
            <Link href="/services">Website Design</Link>
            <Link href="/services">Development</Link>
            <Link href="/services">E-commerce</Link>
            <Link href="/services">Application Code</Link>
          </div>

          <div className="footer-newsletter">
            <h4>Stay Ahead</h4>
            <p>Get insights into conversion optimization and technical web design twice a month.</p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="work@company.com"
                required
                aria-label="Email Address"
                value={email}
                disabled={isDisabled}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-sm" disabled={isDisabled}>
                Subscribe
              </button>
            </form>
            {response && <div className="newsletter-response" style={{ color: "#00E5FF" }}>{response}</div>}
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Zerofy Digital Inc. All rights reserved. Built bespokely for excellence.</p>
          <div className="footer-meta-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
