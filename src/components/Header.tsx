"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  onOpenConsult?: () => void;
}

export default function Header({ onOpenConsult }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  const isHomePage = pathname === "/";

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("zerofy-theme") || "dark";
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("zerofy-theme", newTheme);
    const root = document.documentElement;
    root.classList.remove("dark-theme", "light-theme");
    root.classList.add(newTheme + "-theme");
  };

  const handleToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar nav-anim-entry">
      <div className="nav-container">
        <Link href="/" className="logo" onClick={handleLinkClick}>
          {/* Custom 8-petal orange flower SVG logo */}
          <svg
            viewBox="0 0 32 32"
            className="logo-icon"
            style={{ height: "34px", width: "34px", fill: "#ef4d23" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="3.5" />
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 2 * Math.PI) / 8;
              const cx = 16 + 10 * Math.cos(angle);
              const cy = 16 + 10 * Math.sin(angle);
              return <circle key={i} cx={cx} cy={cy} r="3.5" />;
            })}
          </svg>
          Zerofy Digital
        </Link>

        <nav className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <Link href={isHomePage ? "#home" : "/"} className="nav-link" onClick={handleLinkClick}>
            Home
          </Link>
          <Link href={isHomePage ? "#services" : "/services"} className="nav-link" onClick={handleLinkClick}>
            Services
          </Link>
          <Link href={isHomePage ? "#work" : "/portfolio"} className="nav-link" onClick={handleLinkClick}>
            Our Work
          </Link>
          {!isHomePage && (
            <Link href="/about" className="nav-link" onClick={handleLinkClick}>
              About Us
            </Link>
          )}
          <Link href={isHomePage ? "#contact" : "/contact"} className="nav-link" onClick={handleLinkClick}>
            Contact
          </Link>

          {/* Action button inside mobile menu drawer */}
          <div className="mobile-only" style={{ marginTop: "24px" }}>
            {onOpenConsult ? (
              <button
                className="nav-contact-btn"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleLinkClick();
                  onOpenConsult();
                }}
              >
                Book Consultation
              </button>
            ) : (
              <Link href="/contact" className="nav-contact-btn" onClick={handleLinkClick}>
                Contact Us
              </Link>
            )}
          </div>
        </nav>

        <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Hydration-safe theme toggle button */}
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn"
            aria-label="Toggle theme"
          >
            {mounted && theme === "light" ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="theme-icon">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="theme-icon">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>

          {/* Desktop-only Action Button */}
          {onOpenConsult ? (
            <button className="nav-contact-btn desktop-only" onClick={onOpenConsult} style={{ cursor: "pointer" }}>
              Book Consultation
            </button>
          ) : (
            <Link href={isHomePage ? "#contact" : "/contact"} className="nav-contact-btn desktop-only">
              Contact Us
            </Link>
          )}

          {/* Mobile hamburger menu toggle */}
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
