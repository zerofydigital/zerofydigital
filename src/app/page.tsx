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

export default function Home() {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [theme, setTheme] = useState("dark");



  useEffect(() => {
    const savedTheme = localStorage.getItem("zerofy-theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme + "-theme";
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
      {/* Aurora glow blobs for colorful background */}
      <div className="glow-blob blob-1" />
      <div className="glow-blob blob-2" />
      <div className="glow-blob blob-3" />
      <div className="dot-grid-bg"></div>

      {/* Navbar */}
      <header className="navbar">
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
      <section id="home" className="hero-section">
        <div className="hero-container">
          
          {/* Hand-drawn Star Sparkle Doodle (Left) */}
          <svg className="doodle sparkle sparkle-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12,2 Q12,12 2,12 Q12,12 12,22 Q12,12 22,12 Q12,12 12,2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          
          {/* Hand-drawn Lightbulb Doodle (Right) */}
          <svg className="doodle lightbulb-doodle" viewBox="0 0 30 40" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15,5 C9,5 5,9 5,15 C5,20 8,23 10,26 L10,31 L20,31 L20,26 C22,23 25,20 25,15 C25,9 21,5 15,5 Z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12,35 L18,35 M10,31 L20,31" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15,1 L15,3 M7,7 L8.5,8.5 M3,15 L5,15 M23,7 L21.5,8.5 M27,15 L25,15" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          <h1 className="hero-title">
            We build{" "}
            <span className="highlight-container text-gradient">
              high-converting websites
              <svg className="underline-squiggle" viewBox="0 0 200 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 11C35.5 4.5 120.5 2 196 6.5C140 10 50 11.5 12 13.5" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>{" "}
            that scale your business.
          </h1>

          <p className="hero-subheading">
            Combining world-class design, speed optimization, and custom integrations to build digital experiences that drive growth.
          </p>

          {/* CTA Wrapper with pointing arrows */}
          <div className="cta-wrapper">
            {/* Left Pointer Arrow */}
            <svg className="cta-arrow arrow-left" viewBox="0 0 60 40">
              <path d="M10,12 C25,8 42,16 48,26 M36,29 L49,27 L44,16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="cta-arrow-label label-left">Let's go</span>

            <a href="#contact" className="main-cta-btn">[ Start Your Project ]</a>

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
          <h2 className="section-title">Our Services</h2>
          <p className="contact-subtitle" style={{ marginTop: "-40px", marginBottom: "40px", textAlign: "center" }}>
            We specialize in crafting premium web systems and database integrations tailored for modern brands.
          </p>

          <div className="services-tiles">
            {/* Card 1: Website Development */}
            <div className="service-card" role="button" tabIndex={0} aria-label="Website development services">
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
          <h2 className="previous-work-title">PREVIOUS WORK</h2>

          {/* Dynamic Editorial Projects list */}
          {projectShowcases.map((project, index) => (
            <React.Fragment key={project.id}>
              <div className="editorial-project-row" onClick={() => setActiveModal(project.id)}>
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


      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">LET'S BUILD TOGETHER.</h2>
          <p className="contact-subtitle">Have an idea, business, or project in mind? Let's turn it into something exceptional with automation, design, and modern web experiences.</p>

          <div className="contact-layout-wrapper">
            <form action="https://formsubmit.co/zerofydigital@gmail.com" method="POST" className="contact-form-container">
              {/* FormSubmit Helper Configs */}
              <input type="hidden" name="_subject" value="New Website Inquiry - Zerofy Digital" />
              <input type="hidden" name="_next" value="https://www.shantidentalcarenikol.com/" />
              <input type="hidden" name="_captcha" value="false" />
              
              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" name="Name" required placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="Email" required placeholder="john@company.com" />
                </div>
              </div>
              
              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="company">Company / Website</label>
                  <input type="text" id="company" name="Company" placeholder="Acme Corp (Optional)" />
                </div>
                <div className="form-group">
                  <label htmlFor="budget">Estimated Budget</label>
                  <select id="budget" name="Budget" required defaultValue="">
                    <option value="" disabled>Select budget range</option>
                    <option value="Under $1,500">Under $1,500</option>
                    <option value="$1,500 - $3,500">$1,500 - $3,500</option>
                    <option value="$3,500 - $6,000">$3,500 - $6,000</option>
                    <option value="$6,000+">$6,000+</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="timeline">Desired Timeline</label>
                <select id="timeline" name="Timeline" required defaultValue="">
                  <option value="" disabled>Select timeline</option>
                  <option value="Immediate (< 2 weeks)">Immediate (&lt; 2 weeks)</option>
                  <option value="Standard (2-6 weeks)">Standard (2-6 weeks)</option>
                  <option value="Flexible (1-3 months)">Flexible (1-3 months)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Project Description & Requirements</label>
                <textarea id="message" name="Message" rows={4} required placeholder="What kind of website do you need, what features are required, and what does your business do?"></textarea>
              </div>

              <button type="submit" className="form-submit-btn">[ Submit Inquiry ]</button>
            </form>

            <div className="contact-info-cards">
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
