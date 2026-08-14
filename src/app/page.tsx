"use client";

import React, { useState, useEffect } from "react";

interface ProjectDetails {
  id: number;
  title: string;
  industry: string;
  tags: string[];
  desc: string;
  url: string;
  imgUrl: string;
  challenge: string;
  strategy: string;
  outcome: string;
}

const COUNTRIES = [
  { code: "US", dial: "+1", currency: "USD", symbol: "$", format: "(###) ###-####", limit: 10 },
  { code: "GB", dial: "+44", currency: "GBP", symbol: "£", format: "#### ######", limit: 10 },
  { code: "FR", dial: "+33", currency: "EUR", symbol: "€", format: "# ## ## ## ##", limit: 9 },
  { code: "CA", dial: "+1", currency: "CAD", symbol: "C$", format: "(###) ###-####", limit: 10 },
  { code: "AU", dial: "+61", currency: "AUD", symbol: "A$", format: "### ### ###", limit: 9 },
  { code: "AE", dial: "+971", currency: "AED", symbol: "د.إ", format: "## ### ####", limit: 9 },
  { code: "IN", dial: "+91", currency: "INR", symbol: "₹", format: "##### #####", limit: 10 },
];

export default function Home() {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [theme, setTheme] = useState("dark");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadingFade, setLoadingFade] = useState(false);
  const [countryIdx, setCountryIdx] = useState(6); // Default to IN
  const [budgetDisplay, setBudgetDisplay] = useState("");
  const [mobileDisplay, setMobileDisplay] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Audit Analyzer States
  const [auditUrl, setAuditUrl] = useState("");
  const [auditStep, setAuditStep] = useState<"idle" | "scanning" | "done">("idle");
  const [scanLogs, setScanLogs] = useState<string[]>([]);

  const formatMobile = (value: string, format: string) => {
    const digits = value.replace(/\D/g, "");
    let result = "";
    let digitIdx = 0;
    
    for (let i = 0; i < format.length && digitIdx < digits.length; i++) {
      if (format[i] === "#") {
        result += digits[digitIdx++];
      } else {
        result += format[i];
      }
    }
    return result;
  };

  const startAudit = () => {
    if (!auditUrl) return;
    setAuditStep("scanning");
    setScanLogs([]);
    
    const logs = [
      `[INFO] Initializing scan for ${auditUrl}...`,
      `[INFO] Establishing secure request path...`,
      `[INFO] Fetching DOM content & meta properties...`,
      `[WARN] Large render-blocking resources detected (7.4MB JS/CSS total)`,
      `[INFO] Scanning layout structure for Cumulative Layout Shift (CLS)...`,
      `[WARN] 14 image elements missing explicit height/width attributes`,
      `[INFO] Measuring Core Web Vitals (LCP, FID, CLS)...`,
      `[INFO] Analyzing mobile viewport viewport-fit parameters...`,
      `[ERROR] Failed to load 4 key resource/styles packages (404 Error)`,
      `[INFO] Finalizing 24-point technical audit report...`
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setScanLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setTimeout(() => {
            setAuditStep("done");
          }, 600);
        }
      }, (index + 1) * 350);
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    const data = new FormData(e.currentTarget);
    
    const name = (data.get("Name") as string || "").trim();
    const email = (data.get("Email") as string || "").trim();
    
    const dialCode = data.get("DialCode") as string;
    const rawMobile = (data.get("Mobile") as string || "").replace(/\D/g, "").trim();
    const mobile = `${dialCode} ${rawMobile}`;
    
    const budgetStr = (data.get("Budget") as string || "").replace(/,/g, "").trim();
    const timeline = (data.get("Timeline") as string || "").trim();
    const message = (data.get("Message") as string || "").trim();
    
    if (!name) {
      newErrors.name = "Name is required.";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    
    const requiredLength = COUNTRIES[countryIdx].limit;
    if (!rawMobile) {
      newErrors.mobile = "Mobile number is required.";
    } else if (rawMobile.length !== requiredLength) {
      newErrors.mobile = `Please enter a valid ${requiredLength}-digit mobile number.`;
    }
    
    const budgetNum = Number(budgetStr);
    const isIndia = COUNTRIES[countryIdx].code === "IN";
    const minBudget = isIndia ? 10000 : 1000;
    
    if (!budgetStr) {
      newErrors.budget = "Budget is required.";
    } else if (isNaN(budgetNum)) {
      newErrors.budget = "Budget must be a valid number.";
    } else if (budgetNum < minBudget) {
      newErrors.budget = `Minimum budget is ${COUNTRIES[countryIdx].symbol}${minBudget.toLocaleString('en-US')}.`;
    }
    
    if (!timeline) {
      newErrors.timeline = "Please select a desired timeline.";
    }
    
    if (!message) {
      newErrors.message = "Project description is required.";
    } else if (message.length < 15) {
      newErrors.message = "Please enter at least 15 characters to explain your requirements.";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setApiError(false);
    setIsSubmitting(true);

    const payload = {
      Name: name,
      Email: email,
      Mobile: mobile,
      Company: (data.get("Company") as string || "").trim(),
      Budget: `${COUNTRIES[countryIdx].currency} ${budgetDisplay}`,
      Timeline: timeline,
      Message: message,
      _subject: "New Website Inquiry - Zerofy Digital",
      _captcha: "false"
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/zerofydigital@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setFormSubmitted(true);
      } else {
        setApiError(true);
      }
    } catch (err) {
      setApiError(true);
    } finally {
      setIsSubmitting(false);
    }
  };



  useEffect(() => {
    const savedTheme = localStorage.getItem("zerofy-theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme + "-theme";

    // Loading screen dismissal
    const fadeTimer = setTimeout(() => setLoadingFade(true), 2000);
    const hideTimer = setTimeout(() => setIsLoading(false), 2600);

    // Scroll-reveal via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sr-visible");
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.12 }
    );
    // Observe after a tiny delay so elements are mounted
    const obsTimer = setTimeout(() => {
      document.querySelectorAll(".sr").forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      clearTimeout(obsTimer);
      observer.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("zerofy-theme", newTheme);
    document.documentElement.className = newTheme + "-theme";
  };

  const projectShowcases: ProjectDetails[] = [
    {
      id: 1,
      title: "Shanti Dental Care Nikol",
      industry: "Dental Clinic & Healthcare",
      tags: ["Website Development", "Local SEO", "Patient Portal"],
      desc: "Built a reassuring, premium digital booking platform and local search strategy for a modern dental care clinic in Nikol, driving patient bookings.",
      url: "https://www.shantidentalcarenikol.com/",
      imgUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
      challenge: "Reassure anxious dental patients while maximizing direct online booking inquiries.",
      strategy: "Warm visual color palette, clear call-to-actions, and high-speed local search optimization.",
      outcome: "Sustained search presence and +85% growth in patient appointments."
    },
    {
      id: 2,
      title: "Roar Fitness Zone",
      industry: "Fitness Gym & Club",
      tags: ["Website Development", "Membership Funnel", "UI Design"],
      desc: "Created a bold, high-energy membership conversion funnel and branding experience for a premium physical training club.",
      url: "https://roarfitnesszone.com/",
      imgUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80",
      challenge: "Convert random visitors into monthly fitness members through a high-impact dynamic layout.",
      strategy: "Aggressive visual layouts, responsive pricing structures, and quick inquiry modals.",
      outcome: "+110% growth in digital membership leads within 4 weeks."
    }
  ];

  const currentProject = projectShowcases.find(p => p.id === activeModal);

  return (
    <div className="min-h-screen relative font-sans">

      {/* ── Loading Splash Screen ── */}
      {isLoading && (
        <div className={`loader-overlay${loadingFade ? " loader-fade-out" : ""}`}>
          <div className="loader-content">
            {/* Logo */}
            <div className="loader-logo">
              <svg viewBox="0 0 32 32" className="loader-logo-svg" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="3.5" />
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i * 2 * Math.PI) / 8;
                  const cx = 16 + 10 * Math.cos(angle);
                  const cy = 16 + 10 * Math.sin(angle);
                  return <circle key={i} cx={cx} cy={cy} r="3.5" />;
                })}
              </svg>
            </div>
            <p className="loader-brand">Zerofy Digital</p>
            <p className="loader-tagline">Building the web, beautifully.</p>
            {/* Progress bar */}
            <div className="loader-bar-track">
              <div className="loader-bar-fill" />
            </div>
          </div>
        </div>
      )}

      {/* Aurora glow blobs for colorful background */}
      <div className="glow-blob blob-1" />
      <div className="glow-blob blob-2" />
      <div className="glow-blob blob-3" />
      <div className="dot-grid-bg"></div>

      {/* Navbar */}
      <header className="navbar nav-anim-entry">
        <div className="nav-container">
          <a href="#home" className="logo">
            {/* Custom 8-petal orange flower SVG logo */}
            <svg
              viewBox="0 0 32 32"
              className="logo-icon fill-[#ef4d23]"
              style={{ height: "34px", width: "34px" }}
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
          </a>
          <nav className="nav-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#work" className="nav-link">Our Work</a>
          </nav>
          <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button 
              onClick={toggleTheme} 
              className="theme-toggle-btn"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
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
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="theme-icon">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <a href="#contact" className="nav-contact-btn">Contact Us</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className={`hero-section${!isLoading ? " hero-ready" : ""}`}>
        <div className="hero-container">
          
          {/* Hand-drawn Star Sparkle Doodle (Left) */}
          <svg className="doodle sparkle sparkle-1 hero-anim-float-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12,2 Q12,12 2,12 Q12,12 12,22 Q12,12 22,12 Q12,12 12,2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          
          {/* Hand-drawn Lightbulb Doodle (Right) */}
          <svg className="doodle lightbulb-doodle hero-anim-float-right" viewBox="0 0 30 40" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15,5 C9,5 5,9 5,15 C5,20 8,23 10,26 L10,31 L20,31 L20,26 C22,23 25,20 25,15 C25,9 21,5 15,5 Z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12,35 L18,35 M10,31 L20,31" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15,1 L15,3 M7,7 L8.5,8.5 M3,15 L5,15 M23,7 L21.5,8.5 M27,15 L25,15" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          <h1 className="hero-title hero-anim-title">
            We build{" "}
            <span className="highlight-container text-gradient">
              high-converting websites
              <svg className="underline-squiggle" viewBox="0 0 200 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 11C35.5 4.5 120.5 2 196 6.5C140 10 50 11.5 12 13.5" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>{" "}
            that scale your business.
          </h1>

          <p className="hero-subheading hero-anim-sub">
            Combining world-class design, speed optimization, and custom integrations to build digital experiences that drive growth.
          </p>

          {/* CTA Wrapper with pointing arrows */}
          <div className="cta-wrapper hero-anim-cta">
            {/* Left Pointer Arrow */}
            <svg className="cta-arrow arrow-left" viewBox="0 0 60 40">
              <path d="M10,12 C25,8 42,16 48,26 M36,29 L49,27 L44,16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="cta-arrow-label label-left">Let's go</span>

            <a href="#contact" className="main-cta-btn">Build Your Website →</a>

            {/* Right Pointer Arrow */}
            <svg className="cta-arrow arrow-right" viewBox="0 0 60 40">
              <path d="M50,12 C35,8 18,16 12,26 M24,29 L11,27 L16,16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="cta-arrow-label label-right">Click here!</span>
          </div>

        </div>

        {/* The Signature Hero Thread (Flowing Wave SVG) */}
        <div className="hero-thread-container">
          <svg className="hero-thread-svg" viewBox="0 0 1440 250" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Hidden paths for text alignments */}
            <path id="path-left-text" d="M 50,125 C 220,125 320,65 520,55" />
            <path id="path-right-text" d="M 980,180 C 1100,155 1160,50 1250,75 C 1340,100 1340,210 1250,210 C 1170,210 1190,95 1490,120" />
            
            {/* The actual drawing wave path */}
            <path className="wave-path" d="M -50,130 C 250,130 350,50 550,60 C 750,70 850,210 1020,180 C 1120,160 1180,60 1260,80 C 1340,100 1340,210 1260,210 C 1180,210 1200,90 1490,120" />
            
            {/* Curved Text Elements */}
            <text className="curved-text text-left-alchemy">
              <textPath href="#path-left-text" startOffset="30%">Digital Alchemy</textPath>
            </text>
            <text className="curved-text text-right-scale">
              <textPath href="#path-right-text" startOffset="5%">Build. Code. Scale. • Build. Code. Scale. • Build. Code. Scale.</textPath>
            </text>
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="container">
          <h2 className="section-title sr sr-up">Our Services</h2>
          <p className="contact-subtitle sr sr-up sr-delay-1" style={{ marginTop: "-40px", marginBottom: "40px", textAlign: "center" }}>
            We specialize in crafting premium web systems and database integrations tailored for modern brands.
          </p>

          <div className="services-tiles">
            {/* Card 1: Website Development */}
            <div className="service-card sr sr-scale" role="button" tabIndex={0} aria-label="Website development services">
              <div className="card-header">
                <div className="card-icon-container">
                  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="card-icon">
                    <rect x="6" y="14" width="52" height="36" rx="4" />
                    <path d="M6 24h52" />
                    <circle cx="16" cy="24" r="2" fill="currentColor" />
                  </svg>
                </div>
                <h3 className="card-title large">Website Development</h3>
              </div>
              <p className="card-description">High-converting landing pages, corporate business profiles, standard corporate sites, custom e-commerce stores, and custom SaaS web applications built for conversion.</p>
            </div>

          </div>
        </div>
      </section>



      {/* Previous Work Section - Editorial Style */}
      <section id="work" className="previous-work-section">
        <div className="previous-work-container">
          <div id="website-samples"></div>
          <h2 className="previous-work-title sr sr-up">PREVIOUS WORK</h2>

          {/* Dynamic Editorial Projects list */}
          {projectShowcases.map((project, index) => (
            <React.Fragment key={project.id}>
              <div
                className={`editorial-project-row sr ${index % 2 === 0 ? "sr-left" : "sr-right"}`}
                onClick={() => setActiveModal(project.id)}
              >
                <div className="project-number">0{index + 1}</div>
                
                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-client-name">{project.title}</h3>
                    <span className="project-industry">{project.industry}</span>
                  </div>
                  
                  <div className="project-details">
                    <div className="project-services">
                      {project.tags.map(t => (
                        <span key={t} className="service-tag">{t}</span>
                      ))}
                    </div>
                    
                    <p className="project-description">{project.desc}</p>
                  </div>
                  
                  <div className="view-website-btn">
                    <span>View Details</span>
                    <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="divider-line"></div>
            </React.Fragment>
          ))}



        </div>
      </section>

      {/* ── AI-Powered Website Audit Analyzer Section ── */}
      <section id="audit" style={{ padding: "100px 0", position: "relative" }}>
        <div className="container">
          <h2 className="section-title">Scan Your Website</h2>
          <p className="contact-subtitle" style={{ marginTop: "-40px", marginBottom: "40px", textAlign: "center" }}>
            Uncover conversion killers, slow load speeds, and hidden SEO errors in real-time.
          </p>

          <div style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "40px",
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: "20px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(10px)",
          }}>
            {auditStep === "idle" && (
              <div style={{ textAlign: "center" }}>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "12px" }}>Is your website leaking customers?</h3>
                <p style={{ color: "var(--text-body)", fontSize: "0.95rem", maxWidth: "550px", margin: "0 auto 24px auto" }}>
                  Enter your URL below. Our system will analyze your page speed, mobile layout responsiveness, and structural SEO to find the exact bottlenecks blocking your growth.
                </p>
                <div style={{ display: "flex", gap: "12px", marginTop: "24px" }} className="flex-col sm:flex-row">
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={auditUrl}
                    onChange={(e) => setAuditUrl(e.target.value)}
                    style={{
                      flexGrow: 1,
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid var(--card-border)",
                      borderRadius: "12px",
                      padding: "16px 20px",
                      color: "var(--text-main)",
                      fontSize: "1rem",
                      outline: "none",
                      transition: "all 0.3s ease"
                    }}
                    className="focus:border-[var(--matcha)]"
                  />
                  <button 
                    onClick={startAudit} 
                    style={{
                      background: "linear-gradient(135deg, var(--matcha), var(--matcha-light))",
                      color: "white",
                      border: "none",
                      borderRadius: "12px",
                      padding: "16px 32px",
                      fontWeight: 700,
                      fontSize: "1rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 15px rgba(58, 134, 255, 0.3)",
                    }}
                    className="hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(58,134,255,0.5)] disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={!auditUrl}
                  >
                    Analyze Now
                  </button>
                </div>
              </div>
            )}

            {auditStep === "scanning" && (
              <div>
                <div style={{ display: "flex", gap: "6px", marginBottom: "12px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "8px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }}></div>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }}></div>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }}></div>
                  <span style={{ marginLeft: "8px", fontSize: "0.8rem", color: "var(--text-body)" }}>Technical Audit Scanner v1.0.4</span>
                </div>
                <div style={{
                  background: "#02040a",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  padding: "24px",
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: "0.9rem",
                  color: "#39ff14",
                  minHeight: "220px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.8)",
                }}>
                  {scanLogs.map((log, i) => {
                    let color = "#39ff14";
                    if (log.includes("[WARN]")) color = "#ffbd2e";
                    if (log.includes("[ERROR]")) color = "#ff5f56";
                    return <div key={i} style={{ color }}>{log}</div>;
                  })}
                  <div style={{ color: "#39ff14", animation: "blink 1s step-end infinite" }}>_</div>
                </div>
              </div>
            )}

            {auditStep === "done" && (
              <div className="audit-results">
                <h3 style={{ fontSize: "1.4rem", marginBottom: "16px", textAlign: "center" }}>
                  Audit Report for <span className="text-gradient">{auditUrl}</span>
                </h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", marginBottom: "24px" }}>
                  <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--card-border)", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
                    <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#ff5f56", marginBottom: "6px" }}>58</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-body)", textTransform: "uppercase", letterSpacing: "1px" }}>Performance</div>
                  </div>
                  <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--card-border)", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
                    <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#ffbd2e", marginBottom: "6px" }}>72</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-body)", textTransform: "uppercase", letterSpacing: "1px" }}>SEO</div>
                  </div>
                  <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--card-border)", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
                    <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#ffbd2e", marginBottom: "6px" }}>68</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-body)", textTransform: "uppercase", letterSpacing: "1px" }}>Mobile UX</div>
                  </div>
                  <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--card-border)", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
                    <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#ff5f56", marginBottom: "6px" }}>64</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-body)", textTransform: "uppercase", letterSpacing: "1px" }}>Overall Score</div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--card-border)", borderRadius: "12px", padding: "20px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ background: "rgba(255, 95, 86, 0.1)", color: "#ff5f56", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: "bold" }}>!</div>
                    <div>
                      <h5 style={{ fontSize: "1rem", marginBottom: "4px" }}>Large Render-Blocking CSS/JS Files</h5>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-body)", margin: 0 }}>Found 7.4MB of uncompressed assets blocking the main paint. Mobile TTI is 4.8 seconds. This causes up to 40% of mobile users to bounce before the page loads.</p>
                    </div>
                  </div>

                  <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--card-border)", borderRadius: "12px", padding: "20px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ background: "rgba(255, 95, 86, 0.1)", color: "#ff5f56", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: "bold" }}>!</div>
                    <div>
                      <h5 style={{ fontSize: "1rem", marginBottom: "4px" }}>Cumulative Layout Shift (CLS) Issues</h5>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-body)", margin: 0 }}>14 main layout images do not have explicit width/height parameters, causing content to jump as the page loads. This directly harms your Google Search rankings.</p>
                    </div>
                  </div>

                  {/* Blurred Items */}
                  <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--card-border)", borderRadius: "12px", padding: "20px", display: "flex", gap: "16px", alignItems: "flex-start", filter: "blur(6px)", userSelect: "none", pointerEvents: "none", opacity: 0.45 }}>
                    <div style={{ background: "rgba(255, 95, 86, 0.1)", color: "#ff5f56", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: "bold" }}>!</div>
                    <div>
                      <h5 style={{ fontSize: "1rem", marginBottom: "4px" }}>Vulnerable Security Headers Detected</h5>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-body)", margin: 0 }}>Missing X-Frame-Options and Content-Security-Policy configurations leaving forms open to potential spoofing exploits.</p>
                    </div>
                  </div>

                  <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--card-border)", borderRadius: "12px", padding: "20px", display: "flex", gap: "16px", alignItems: "flex-start", filter: "blur(6px)", userSelect: "none", pointerEvents: "none", opacity: 0.45 }}>
                    <div style={{ background: "rgba(255, 95, 86, 0.1)", color: "#ff5f56", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: "bold" }}>!</div>
                    <div>
                      <h5 style={{ fontSize: "1rem", marginBottom: "4px" }}>Unoptimized Asset Assets Delivery</h5>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-body)", margin: 0 }}>Media elements are served directly from hosting root instead of a localized Content Delivery Network (CDN) causing latency spikes.</p>
                    </div>
                  </div>

                  {/* Blurred overlay and CTA */}
                  <div style={{ position: "relative", marginTop: "-120px", paddingTop: "120px", background: "linear-gradient(to bottom, transparent, var(--bg-color) 80%)", zIndex: 10, textAlign: "center" }}>
                    <h4 style={{ fontSize: "1.25rem", color: "var(--text-main)", marginBottom: "12px", fontWeight: 700 }}>
                      We found 4 more critical issues with your website layout...
                    </h4>
                    <p style={{ color: "var(--text-body)", fontSize: "0.9rem", marginBottom: "24px", maxWidth: "500px", margin: "0 auto 24px auto" }}>
                      Unlock the remaining structural issues, speed improvements, and full audit breakdown. Let's fix them together.
                    </p>
                    <a 
                      href="#contact" 
                      style={{
                        display: "inline-block",
                        background: "linear-gradient(135deg, var(--mustard), #ff007f)",
                        color: "white",
                        border: "none",
                        borderRadius: "50px",
                        padding: "16px 36px",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        cursor: "pointer",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                        boxShadow: "0 8px 24px rgba(255, 0, 127, 0.35)",
                      }}
                      className="hover:scale-105 hover:shadow-[0_12px_30px_rgba(255,0,127,0.55)]"
                      onClick={() => {
                        // Pre-fill message field
                        const msgEl = document.getElementById("message") as HTMLTextAreaElement;
                        if (msgEl) {
                          msgEl.value = `Hey, I just ran a technical audit on ${auditUrl}. I want to unlock the full 24-point audit report and discuss how we can fix these issues and scale my conversion rates.`;
                        }
                      }}
                    >
                      Unlock Full Audit Report
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Client Testimonials Section ── */}
      <section id="testimonials" className="testimonials-section" style={{ padding: "100px 0" }}>
        <div className="container">
          <h2 className="section-title">Client Testimonials</h2>
          <p className="contact-subtitle" style={{ marginTop: "-40px", marginBottom: "40px", textAlign: "center" }}>
            What founders and operators say about building with Zerofy Digital.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginTop: "48px" }}>
            {/* Card 1 */}
            <div style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.3s ease, border-color 0.3s ease",
            }} className="hover:border-[var(--matcha)] hover:-translate-y-2">
              <div>
                <div style={{ color: "#ffbd2e", marginBottom: "16px", fontSize: "1.2rem" }}>★★★★★</div>
                <p style={{ fontSize: "1rem", color: "var(--text-main)", lineHeight: "1.7", marginBottom: "24px", fontStyle: "italic" }}>
                  "Zerofy took our outdated dental clinic website and built a stunning booking flow. Our online patient inquiries went up by 85% in just two months. Fast, professional, and excellent design."
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "var(--matcha-bg-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  color: "var(--matcha)",
                  fontSize: "1.1rem",
                  border: "1px solid var(--matcha)",
                }}>SD</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h5 style={{ fontSize: "0.95rem", margin: 0, fontWeight: 700, color: "var(--text-main)" }}>Dr. Bhavya Patel</h5>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-body)" }}>Founder, Shanti Dental Care</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.3s ease, border-color 0.3s ease",
            }} className="hover:border-[var(--matcha)] hover:-translate-y-2">
              <div>
                <div style={{ color: "#ffbd2e", marginBottom: "16px", fontSize: "1.2rem" }}>★★★★★</div>
                <p style={{ fontSize: "1rem", color: "var(--text-main)", lineHeight: "1.7", marginBottom: "24px", fontStyle: "italic" }}>
                  "The conversion rate optimization Zerofy implemented on our funnel was absolute gold. They combined high-impact visual design with extreme page speed. We saw membership signups double."
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "var(--matcha-bg-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  color: "var(--matcha)",
                  fontSize: "1.1rem",
                  border: "1px solid var(--matcha)",
                }}>RF</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h5 style={{ fontSize: "0.95rem", margin: 0, fontWeight: 700, color: "var(--text-main)" }}>Harshil Shah</h5>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-body)" }}>Owner, Roar Fitness Zone</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.3s ease, border-color 0.3s ease",
            }} className="hover:border-[var(--matcha)] hover:-translate-y-2">
              <div>
                <div style={{ color: "#ffbd2e", marginBottom: "16px", fontSize: "1.2rem" }}>★★★★★</div>
                <p style={{ fontSize: "1rem", color: "var(--text-main)", lineHeight: "1.7", marginBottom: "24px", fontStyle: "italic" }}>
                  "We needed a highly customized dashboard app built under a tight timeline. Zerofy was incredibly organized, using Next.js to deliver a lightweight, blazing-fast application. Extremely reliable developers."
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "var(--matcha-bg-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  color: "var(--matcha)",
                  fontSize: "1.1rem",
                  border: "1px solid var(--matcha)",
                }}>VC</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h5 style={{ fontSize: "0.95rem", margin: 0, fontWeight: 700, color: "var(--text-main)" }}>Marcus Harris</h5>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-body)" }}>CTO, Velora Creative</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section (Accordions) ── */}
      <section id="faq" className="faq-section" style={{ padding: "100px 0" }}>
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="contact-subtitle" style={{ marginTop: "-40px", marginBottom: "40px", textAlign: "center" }}>
            Got questions? We've got answers. Clear, direct, and no-nonsense.
          </p>

          <div style={{ maxWidth: "800px", margin: "48px auto 0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              {
                q: "How long does it take to build a website?",
                a: "A typical high-converting landing page takes 1-2 weeks. Standard corporate sites and custom e-commerce stores take about 3-5 weeks depending on layout and features. We follow a strict blueprint process to ensure fast delivery without compromising design quality."
              },
              {
                q: "Which technologies do you build with?",
                a: "We specialize in the React ecosystem, specifically Next.js for high-speed page delivery, server-side rendering, and exceptional SEO performance. We write vanilla clean CSS for layout style control and handle custom integrations using secure REST APIs."
              },
              {
                q: "Will my website be optimized for SEO and Google?",
                a: "Yes, absolutely. Every page we build undergoes comprehensive on-page SEO styling. This includes clean HTML structure, custom metadata configurations, JSON-LD schema layouts for business indexation, and extreme speed optimizations to pass Google's Core Web Vitals checks."
              },
              {
                q: "What is your estimated pricing model?",
                a: "Our pricing is customized and scales depending on project complexity, scope, and specific feature integrations. We provide a detailed budget breakdown upfront during our initial structural design blueprint kickoff session."
              }
            ].map((item, idx) => {
              const isActive = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    transition: "all 0.3s ease"
                  }}
                >
                  <button 
                    onClick={() => setActiveFaq(isActive ? null : idx)}
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      padding: "24px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textAlign: "left",
                      cursor: "pointer",
                      color: "var(--text-main)",
                      fontFamily: "var(--font-headings)",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      outline: "none"
                    }}
                    className="hover:text-[var(--matcha-light)]"
                  >
                    <span>{item.q}</span>
                    <span style={{ 
                      fontSize: "1.5rem", 
                      lineHeight: "1", 
                      transition: "transform 0.3s ease",
                      transform: isActive ? "rotate(45deg)" : "rotate(0deg)",
                      color: isActive ? "var(--matcha-light)" : "inherit"
                    }}>+</span>
                  </button>
                  <div style={{
                    maxHeight: isActive ? "200px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease-out, padding 0.3s ease-out",
                    padding: isActive ? "0 24px 24px 24px" : "0 24px",
                    color: "var(--text-body)",
                    fontSize: "0.95rem",
                    lineHeight: "1.7"
                  }}>
                    <p style={{ margin: 0 }}>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title sr sr-up">LET'S BUILD TOGETHER.</h2>
          <p className="contact-subtitle sr sr-up sr-delay-1">Have an idea, business, or project in mind? Let's turn it into something exceptional with automation, design, and modern web experiences.</p>

          <div className="contact-layout-wrapper">
            {formSubmitted ? (
              <div className="contact-form-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "400px", textAlign: "center", gap: "20px", animation: "fade-in 0.4s ease" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "var(--matcha-bg-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--matcha)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: "32px", height: "32px" }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "var(--font-headings)", fontSize: "1.8rem", fontWeight: 800, color: "var(--text-main)" }}>Message Sent Successfully!</h3>
                <p style={{ color: "var(--text-body)", fontSize: "1rem", lineHeight: "1.6", maxWidth: "450px" }}>
                  Thank you for reaching out to Zerofy Digital. We will review your inquiry and get back to you within 24 hours.
                </p>
              </div>
            ) : apiError ? (
              <div className="contact-form-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "400px", textAlign: "center", gap: "20px", animation: "fade-in 0.4s ease" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "rgba(255, 0, 127, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--mustard)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: "32px", height: "32px" }}>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "var(--font-headings)", fontSize: "1.8rem", fontWeight: 800, color: "var(--text-main)" }}>Submission Failed</h3>
                <p style={{ color: "var(--text-body)", fontSize: "1rem", lineHeight: "1.6", maxWidth: "450px" }}>
                  Something went wrong. Please try again or email us directly at zerofydigital@gmail.com
                </p>
                <button onClick={() => setApiError(false)} className="form-submit-btn" style={{ width: "auto", padding: "12px 24px", marginTop: "10px" }}>
                  [ Try Again ]
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="contact-form-container sr sr-left" noValidate>
                {/* FormSubmit Helper Configs */}
                <input type="hidden" name="_subject" value="New Website Inquiry - Zerofy Digital" />
                <input type="hidden" name="_captcha" value="false" />
                
                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="Name" 
                      required 
                      placeholder="John Doe" 
                      style={errors.name ? { borderColor: "var(--mustard)", boxShadow: "0 0 0 3px rgba(255, 0, 127, 0.15)" } : {}}
                    />
                    {errors.name && <span className="field-error-msg">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="Email" 
                      required 
                      placeholder="john@company.com" 
                      style={errors.email ? { borderColor: "var(--mustard)", boxShadow: "0 0 0 3px rgba(255, 0, 127, 0.15)" } : {}}
                    />
                    {errors.email && <span className="field-error-msg">{errors.email}</span>}
                  </div>
                </div>
                
                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="company">Company / Website</label>
                    <input type="text" id="company" name="Company" placeholder="Acme Corp (Optional)" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mobile">Mobile Number</label>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <select 
                        name="DialCode" 
                        value={COUNTRIES[countryIdx].dial} 
                        onChange={(e) => {
                          const idx = COUNTRIES.findIndex(c => c.dial === e.target.value);
                          if (idx !== -1) {
                            setCountryIdx(idx);
                            setBudgetDisplay(""); // Reset budget on currency change
                            setMobileDisplay(""); // Reset mobile on country change
                          }
                        }}
                        style={{ width: "115px", padding: "10px", flexShrink: 0, appearance: "auto" }}
                      >
                        {COUNTRIES.map((c, i) => (
                          <option key={i} value={c.dial}>{c.code} ({c.dial})</option>
                        ))}
                      </select>
                      <input 
                        type="tel" 
                        id="mobile" 
                        name="Mobile" 
                        required 
                        placeholder={COUNTRIES[countryIdx].format.replace(/#/g, "0")}
                        value={mobileDisplay}
                        onChange={(e) => {
                          setMobileDisplay(formatMobile(e.target.value, COUNTRIES[countryIdx].format));
                        }}
                        style={errors.mobile ? { flexGrow: 1, borderColor: "var(--mustard)", boxShadow: "0 0 0 3px rgba(255, 0, 127, 0.15)" } : { flexGrow: 1 }}
                      />
                    </div>
                    {errors.mobile && <span className="field-error-msg">{errors.mobile}</span>}
                  </div>
                </div>
                
                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="budget">Estimated Budget ({COUNTRIES[countryIdx].currency})</label>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)", fontSize: "1.05rem" }}>
                        {COUNTRIES[countryIdx].symbol}
                      </span>
                      <input 
                        type="text" 
                        id="budget" 
                        name="Budget" 
                        required 
                        placeholder={`Min ${COUNTRIES[countryIdx].code === "IN" ? "10,000" : "1,000"}`}
                        value={budgetDisplay}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, "");
                          setBudgetDisplay(digits ? Number(digits).toLocaleString('en-US') : "");
                        }}
                        style={errors.budget ? { paddingLeft: "36px", borderColor: "var(--mustard)", boxShadow: "0 0 0 3px rgba(255, 0, 127, 0.15)", width: "100%" } : { paddingLeft: "36px", width: "100%" }}
                      />
                    </div>
                    {errors.budget && <span className="field-error-msg">{errors.budget}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="timeline">Desired Timeline</label>
                    <select 
                      id="timeline" 
                      name="Timeline" 
                      required 
                      defaultValue=""
                      style={errors.timeline ? { borderColor: "var(--mustard)", boxShadow: "0 0 0 3px rgba(255, 0, 127, 0.15)" } : {}}
                    >
                      <option value="" disabled>Select timeline</option>
                      <option value="Immediate (< 2 weeks)">Immediate (&lt; 2 weeks)</option>
                      <option value="Standard (2-6 weeks)">Standard (2-6 weeks)</option>
                      <option value="Flexible (1-3 months)">Flexible (1-3 months)</option>
                    </select>
                    {errors.timeline && <span className="field-error-msg">{errors.timeline}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project Description & Requirements</label>
                  <textarea 
                    id="message" 
                    name="Message" 
                    rows={4} 
                    required 
                    placeholder="What kind of website do you need, what features are required, and what does your business do?"
                    style={errors.message ? { borderColor: "var(--mustard)", boxShadow: "0 0 0 3px rgba(255, 0, 127, 0.15)" } : {}}
                  ></textarea>
                  {errors.message && <span className="field-error-msg">{errors.message}</span>}
                </div>

                <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "[ Submit Inquiry ]"}
                </button>
              </form>
            )}

            <div className="contact-info-cards sr sr-right">
              <a href="https://www.linkedin.com/company/zerofydigital" target="_blank" rel="noopener noreferrer" className="contact-card">
                <div className="contact-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="contact-icon">
                    <path d="M4 4h4v16H4z" />
                    <path d="M6 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
                    <path d="M12 8h4v2h.1c.6-1.1 2-2.3 4.1-2.3 4.4 0 5.2 2.9 5.2 6.7V20h-4v-5.6c0-1.3 0-3-1.8-3s-2 1.4-2 2.9V20h-4V8z" />
                  </svg>
                </div>
                <div className="contact-card-info">
                  <h4>LinkedIn</h4>
                  <p>Connect and discuss business opportunities.</p>
                  <span className="contact-card-button">View LinkedIn →</span>
                </div>
              </a>

              <a href="mailto:zerofydigital@gmail.com" className="contact-card">
                <div className="contact-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="contact-icon">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22 6 12 13 2 6" />
                  </svg>
                </div>
                <div className="contact-card-info">
                  <h4>Email</h4>
                  <p>Send project requirements directly.</p>
                  <span className="contact-card-button">Send Email →</span>
                </div>
              </a>
            </div>
          </div>


        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <p className="attribution">© 2026 Zerofy Digital. All rights reserved.</p>
          <div className="site-logo-watermark">
            <svg
              viewBox="0 0 32 32"
              className="site-logo-watermark-img fill-[#ef4d23]"
              style={{ width: "160px", height: "160px", opacity: 0.15 }}
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
          </div>
        </div>
      </footer>

      {/* Modal Showcase */}
      {activeModal !== null && currentProject && (
        <div className="modal-overlay active" onClick={(e) => e.target === e.currentTarget && setActiveModal(null)}>
          <div className="modal-content">
            <button className="modal-close-btn" onClick={() => setActiveModal(null)} aria-label="Close modal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "24px", height: "24px" }}>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            
            <div className="modal-grid">
              
              <div className="modal-showcase-view text-left">
                {activeModal === 2 ? (
                  /* Video Player Frame for Cake ordering site mockup */
                  <div className="video-player-frame">
                    <div className="video-display">
                      <img src={currentProject.imgUrl} alt={currentProject.title} className="modal-image" />
                      <div className="video-play-overlay">
                        <svg className="play-icon" viewBox="0 0 24 24" fill="none" stroke="#F5F2EB" strokeWidth="2.5">
                          <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                      </div>
                    </div>
                    <div className="video-controls">
                      <button className="video-play-btn">
                        <svg viewBox="0 0 24 24" fill="#86A789" width="16" height="16">
                          <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                      </button>
                      <div className="video-timeline-bar">
                        <div className="video-progress" style={{ width: "65%" }}></div>
                      </div>
                      <span className="video-timer">0:18 / 0:30</span>
                    </div>
                  </div>
                ) : activeModal === 3 ? (
                  /* Art frame for Ceramics site mockup */
                  <div className="art-frame">
                    <img src={currentProject.imgUrl} alt={currentProject.title} className="modal-image" />
                    <div className="art-zoom-indicator">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" width="20" height="20">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        <line x1="11" y1="8" x2="11" y2="14"/>
                        <line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                      <span>Click to Zoom</span>
                    </div>
                  </div>
                ) : (
                  /* Browser Frame for Velora maintenance site mockup */
                  <div className="browser-frame">
                    <div className="browser-header">
                      <span className="browser-dot dot-red"></span>
                      <span className="browser-dot dot-yellow"></span>
                      <span className="browser-dot dot-green"></span>
                      <div className="browser-url-bar">{currentProject.url}</div>
                    </div>
                    <div className="browser-body">
                      <img src={currentProject.imgUrl} alt={currentProject.title} className="modal-image" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="modal-details-view text-left">
                <span className="service-tag category-tag">{currentProject.industry}</span>
                <h3 className="modal-title">{currentProject.title}</h3>
                <p className="modal-desc">
                  {currentProject.desc}
                </p>
                <div className="modal-specs">
                  <div className="spec-row"><strong>Challenge</strong> <span>{currentProject.challenge}</span></div>
                  <div className="spec-row"><strong>Strategy</strong> <span>{currentProject.strategy}</span></div>
                  <div className="spec-row"><strong>Outcome</strong> <span>{currentProject.outcome}</span></div>
                </div>
                <a href={currentProject.url} target="_blank" rel="noopener noreferrer" className="glass-cta-btn">[ Visit Live Website ]</a>
                <a href="#contact" onClick={() => setActiveModal(null)} className="secondary-modal-link">[ Work with us on a similar project ]</a>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
