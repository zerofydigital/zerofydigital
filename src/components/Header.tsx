"use client";

import React, { useState } from "react";
import Link from "next/link";

interface HeaderProps {
  onOpenConsult: () => void;
}

export default function Header({ onOpenConsult }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo" onClick={handleLinkClick}>
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" stroke="url(#logoGradHeader)" strokeWidth={8} />
            <path d="M30 50 L45 65 L70 35" stroke="url(#logoGradHeader2)" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="logoGradHeader" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#5B5FFF" />
                <stop offset="100%" stopColor="#00E5FF" />
              </linearGradient>
              <linearGradient id="logoGradHeader2" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#00E5FF" />
              </linearGradient>
            </defs>
          </svg>
          <span>Zerofy<span className="logo-accent">.</span></span>
        </Link>

        <nav className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <Link href="/services" className="nav-link" onClick={handleLinkClick}>Services</Link>
          <Link href="/about" className="nav-link" onClick={handleLinkClick}>About</Link>
          <Link href="/portfolio" className="nav-link" onClick={handleLinkClick}>Work</Link>
          <Link href="/contact" className="nav-link" onClick={handleLinkClick}>Contact</Link>
        </nav>

        <div className="nav-actions">
          <button className="btn btn-secondary btn-sm" onClick={onOpenConsult}>
            Book Consultation
          </button>
          <button
            className={`mobile-toggle ${isMobileMenuOpen ? "active" : ""}`}
            onClick={handleToggle}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
