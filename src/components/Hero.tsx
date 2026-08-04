"use client";

import React, { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

interface HeroProps {
  onOpenConsult: () => void;
}

export default function Hero({ onOpenConsult }: HeroProps) {
  const [dashboardMode, setDashboardMode] = useState<"traffic" | "conversions">("traffic");

  // Stats Counters
  const [stats, setStats] = useState({ projects: 0, satisfaction: 0, experience: 0 });
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const [countersTriggered, setCountersTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersTriggered) {
          setCountersTriggered(true);
          animateStats();
        }
      },
      { threshold: 0.5 }
    );

    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    return () => observer.disconnect();
  }, [countersTriggered]);

  const animateStats = () => {
    const duration = 1500; // ms
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setStats({
        projects: Math.floor(progress * 150),
        satisfaction: Math.floor(progress * 98),
        experience: Math.floor(progress * 4),
      });

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const dashboardData = {
    traffic: {
      visitors: "142,380",
      conv: "4.82%",
      lineD: "M 0 150 Q 100 130, 200 90 T 400 40 T 500 20",
      areaD: "M 0 150 Q 100 130, 200 90 T 400 40 T 500 20 L 500 180 L 0 180 Z",
    },
    conversions: {
      visitors: "189,450",
      conv: "6.94%",
      lineD: "M 0 160 Q 100 140, 200 100 T 350 30 T 500 5",
      areaD: "M 0 160 Q 100 140, 200 100 T 350 30 T 500 5 L 500 180 L 0 180 Z",
    },
  };

  return (
    <section className="hero-section" id="hero">
      <div className="grid-background"></div>
      <div className="radial-overlay"></div>

      <div className="floating-blob blob-1"></div>
      <div className="floating-blob blob-2"></div>

      <div className="hero-container">
        <ScrollReveal className="hero-content">
          <div className="badge-premium">
            <span className="badge-dot"></span>
            <span>Now Accepting Q3 Projects</span>
          </div>

          <h1 className="hero-title">
            We Build Websites That <span className="text-gradient">Turn Visitors</span> Into Customers.
          </h1>

          <p className="hero-subtitle">
            Engineered for high-conversion brands. We combine award-winning visual aesthetics with lightning-fast code to scale your revenue.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={onOpenConsult}>
              Book Free Consultation
            </button>
            <a href="#portfolio" className="btn btn-outline btn-lg">
              View Our Work
            </a>
          </div>

          {/* Animated Statistics */}
          <div className="hero-stats" ref={statsSectionRef}>
            <div className="stat-item">
              <span className="stat-number">{stats.projects}</span>
              <span className="stat-plus">+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.satisfaction}</span>
              <span className="stat-plus">%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.experience}</span>
              <span className="stat-plus">+</span>
              <span className="stat-label">Years of Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24</span>
              <span className="stat-plus">/7</span>
              <span className="stat-label">Support SLA</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Interactive Visual Dashboard */}
        <ScrollReveal className="hero-visual">
          <div className="dashboard-wrapper">
            <div className="dashboard-header">
              <div className="window-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="dashboard-address">zerofy-digital-analytics.app</div>
              <div className="dashboard-controls">
                <button
                  className={`dash-btn ${dashboardMode === "traffic" ? "active" : ""}`}
                  onClick={() => setDashboardMode("traffic")}
                >
                  Traffic
                </button>
                <button
                  className={`dash-btn ${dashboardMode === "conversions" ? "active" : ""}`}
                  onClick={() => setDashboardMode("conversions")}
                >
                  Conversions
                </button>
              </div>
            </div>
            <div className="dashboard-body">
              <div className="metric-grid">
                <div className="metric-card">
                  <span className="metric-title">Monthly Visitors</span>
                  <span className="metric-value">
                    {dashboardData[dashboardMode].visitors}
                  </span>
                  <span className="metric-indicator up">+12.4% vs last month</span>
                </div>
                <div className="metric-card">
                  <span className="metric-title">Conversion Rate</span>
                  <span className="metric-value">
                    {dashboardData[dashboardMode].conv}
                  </span>
                  <span className="metric-indicator up">+3.1% vs last month</span>
                </div>
                <div className="metric-card">
                  <span className="metric-title">Lighthouse Score</span>
                  <span className="metric-value text-accent">100 / 100</span>
                  <span className="metric-indicator text-accent">Optimization: Perfect</span>
                </div>
              </div>

              {/* Animated Chart */}
              <div className="chart-container">
                <svg viewBox="0 0 500 180" className="chart-svg">
                  <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.05)" />
                  <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.05)" />
                  <line x1="0" y1="130" x2="500" y2="130" stroke="rgba(255,255,255,0.05)" />

                  <path
                    d={dashboardData[dashboardMode].areaD}
                    fill="url(#chartAreaGrad)"
                  />
                  <path
                    d={dashboardData[dashboardMode].lineD}
                    stroke="url(#chartLineGrad)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />

                  <defs>
                    <linearGradient id="chartLineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#5B5FFF" />
                      <stop offset="50%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#00E5FF" />
                    </linearGradient>
                    <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(91, 95, 255, 0.15)" />
                      <stop offset="100%" stopColor="rgba(5, 8, 22, 0)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Floating widgets */}
              <div className="floating-widget widget-performance">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <div>
                  <div className="widget-title">Performance Speed</div>
                  <div className="widget-value">0.14s Load Time</div>
                </div>
              </div>

              <div className="floating-widget widget-sales">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B5FFF" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <div>
                  <div className="widget-title">Total Revenue</div>
                  <div className="widget-value">+₹3,50,00,000.00</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
