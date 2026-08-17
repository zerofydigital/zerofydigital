"use client";

import React, { useState, useEffect, useRef } from "react";

interface Message {
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

export default function AiReceptionist() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [step, setStep] = useState(0); // 0: choice made, 1: gathering name, 2: gathering email, 3: completed
  const [leadInfo, setLeadInfo] = useState({ name: "", email: "", project: "" });
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Trigger attention-grabbing notification after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowNotification(true);
      }
    }, 4000);

    // Initial bot message
    setMessages([
      {
        sender: "bot",
        text: "Hi there! I'm Aria, Zerofy's digital receptionist. 👋 I can help you scope your project or estimate your budget. What type of project are you looking to build?",
        timestamp: new Date()
      }
    ]);

    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isTyping]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowNotification(false);
  };

  const handleResetChat = () => {
    setStep(0);
    setLeadInfo({ name: "", email: "", project: "" });
    setMessages([
      {
        sender: "bot",
        text: "Hi there! Let's start fresh. 🔄 I'm Aria, Zerofy's digital receptionist. What type of project are you looking to build today?",
        timestamp: new Date()
      }
    ]);
  };

  const handleSendMessage = (text: string, isQuickReply = false) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = { sender: "user", text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // AI Response logic simulation
    setTimeout(() => {
      let botResponse = "";
      const lowerText = text.toLowerCase();
      const currentProject = leadInfo.project || "project";

      if (step === 0) {
        // First selection (e.g. project type)
        setLeadInfo(prev => ({ ...prev, project: text }));
        botResponse = `Awesome! A **${text}** sounds exciting. To give you the best advice, could you please tell me your name?`;
        setStep(1);
      } else if (step === 1) {
        // Name captured
        setLeadInfo(prev => ({ ...prev, name: text }));
        botResponse = `Nice to meet you, **${text}**! What is a good work email address where our team can send over some initial layout blueprint ideas?`;
        setStep(2);
      } else if (step === 2) {
        // Email captured with a simple validation check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(text)) {
          botResponse = `Oops! That doesn't look like a valid email address. Could you please double-check and enter it again? (e.g., name@company.com)`;
          // Keep step = 2 to ask again
        } else {
          setLeadInfo(prev => ({ ...prev, email: text }));
          botResponse = `Got it! I've registered your project outline: "**${leadInfo.project}**". I'm dispatching this directly to our structural design team. They will reach out to you at **${text}** within the next 2 hours. Would you like to schedule a free 30-minute kickoff call right away?`;
          setStep(3);
        }
      } else {
        // General text query handling (keyword analyzer)
        if (lowerText.includes("price") || lowerText.includes("cost") || lowerText.includes("rate") || lowerText.includes("budget")) {
          botResponse = `Since you are planning a **${currentProject}**, our pricing scales depending on project complexity. E-commerce shops and custom dashboard SaaS platforms range higher than simple pages. We outline complete budget frameworks upfront during our kickoff session.`;
        } else if (lowerText.includes("time") || lowerText.includes("duration") || lowerText.includes("long") || lowerText.includes("days")) {
          botResponse = `For a typical **${currentProject}**, we usually target launching in **3-4 weeks**. A simple landing page takes about 1-2 weeks. Do you have a specific target date?`;
        } else if (lowerText.includes("tech") || lowerText.includes("next") || lowerText.includes("react") || lowerText.includes("stack")) {
          botResponse = "We build using the React ecosystem, specifically **Next.js** for high-speed page delivery, server-side rendering, and exceptional SEO performance.";
        } else if (lowerText.includes("who") || lowerText.includes("about") || lowerText.includes("agency")) {
          botResponse = "We are **Zerofy Digital**, a premium website development agency. We design and build ultra-fast, high-converting websites and custom SaaS applications.";
        } else if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("hey")) {
          botResponse = `Hello **${leadInfo.name || "there"}**! How can I help you with your **${currentProject}** today?`;
        } else {
          botResponse = `That sounds interesting! I have logged this layout note for your **${currentProject}** and forwarded it directly to Dhruv. Feel free to also reach out on WhatsApp using the bubble below!`;
        }
      }

      setIsTyping(false);
      setMessages(prev => [...prev, { sender: "bot", text: botResponse, timestamp: new Date() }]);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage(inputValue);
    }
  };

  // Helper to render bold strings cleanly
  const renderMessageText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} style={{ color: "var(--text-main)", fontWeight: 800 }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      {/* Self-contained CSS animations for typing dots */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes aria-typing-pulse {
          0% { transform: translateY(0); opacity: 0.4; }
          100% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes aria-bounce-in {
          0% { transform: scale(0.9) translateY(10px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
      ` }} />

      {/* ── Chat Float Icon Widget ── */}
      <div 
        className="ai-chat-float-container"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end"
        }}
      >
        {/* Pop-up Attention Grabber */}
        {showNotification && (
          <div 
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              borderRadius: "12px",
              padding: "12px 16px",
              marginBottom: "12px",
              maxWidth: "240px",
              fontSize: "0.85rem",
              color: "var(--text-main)",
              position: "relative",
              cursor: "pointer",
              animation: "aria-bounce-in 0.4s ease forwards"
            }}
            onClick={handleOpenChat}
          >
            <div style={{ fontWeight: "bold", color: "var(--matcha)", marginBottom: "4px" }}>Aria (AI Assistant)</div>
            <span>Hi! 👋 Need help scoping your project or getting a budget estimate?</span>
            {/* Close dot */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowNotification(false);
              }}
              style={{
                position: "absolute",
                top: "4px",
                right: "6px",
                border: "none",
                background: "none",
                color: "var(--text-body)",
                fontSize: "0.8rem",
                cursor: "pointer"
              }}
            >
              &times;
            </button>
          </div>
        )}

        {/* Floating Bubble Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "var(--matcha)",
            borderRadius: "50%",
            color: "white",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 20px rgba(58, 134, 255, 0.4)",
            cursor: "pointer",
            transition: "transform 0.3s ease",
            position: "relative"
          }}
          className="hover:scale-110"
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          )}
          {/* Notification Dot */}
          {!isOpen && showNotification && (
            <span 
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                width: "12px",
                height: "12px",
                backgroundColor: "var(--mustard)",
                borderRadius: "50%",
                border: "2px solid white"
              }}
            />
          )}
        </button>
      </div>

      {/* ── Chat Window Drawer ── */}
      {isOpen && (
        <div 
          className="ai-chat-window"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: "20px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 99999,
            backdropFilter: "blur(10px)",
            animation: "aria-bounce-in 0.3s ease forwards"
          }}
        >
          {/* Header */}
          <div 
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid var(--card-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(255, 255, 255, 0.02)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div 
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "var(--matcha-bg-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  color: "var(--matcha)",
                  fontSize: "1rem",
                  border: "1px solid var(--matcha)"
                }}
              >
                AR
              </div>
              <div>
                <h4 style={{ fontSize: "0.95rem", margin: 0, fontWeight: 700, color: "var(--text-main)" }}>Aria</h4>
                <span style={{ fontSize: "0.75rem", color: "#27c93f", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: "6px", height: "6px", backgroundColor: "#27c93f", borderRadius: "50%" }} />
                  Online Assistant
                </span>
              </div>
            </div>

            {/* Reset chat button */}
            <button 
              onClick={handleResetChat}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-body)",
                fontSize: "0.75rem",
                cursor: "pointer",
                padding: "4px 8px",
                borderRadius: "4px",
                transition: "all 0.2s ease"
              }}
              className="hover:text-[var(--matcha-light)]"
            >
              Reset 🔄
            </button>
          </div>

          {/* Messages Area */}
          <div 
            style={{
              flexGrow: 1,
              padding: "20px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            }}
          >
            {messages.map((msg, i) => (
              <div 
                key={i} 
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                  background: msg.sender === "user" ? "var(--matcha)" : "rgba(255,255,255,0.04)",
                  color: msg.sender === "user" ? "white" : "var(--text-main)",
                  border: msg.sender === "user" ? "none" : "1px solid var(--card-border)",
                  padding: "12px 16px",
                  borderRadius: msg.sender === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  fontSize: "0.9rem",
                  lineHeight: "1.5"
                }}
              >
                {renderMessageText(msg.text)}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div 
                style={{
                  alignSelf: "flex-start",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--card-border)",
                  padding: "12px 16px",
                  borderRadius: "16px 16px 16px 4px",
                  display: "flex",
                  gap: "4px",
                  alignItems: "center"
                }}
              >
                <span style={{ width: "6px", height: "6px", backgroundColor: "var(--text-body)", borderRadius: "50%", display: "inline-block", animation: "aria-typing-pulse 0.8s infinite alternate" }} />
                <span style={{ width: "6px", height: "6px", backgroundColor: "var(--text-body)", borderRadius: "50%", display: "inline-block", animation: "aria-typing-pulse 0.8s infinite alternate 0.2s" }} />
                <span style={{ width: "6px", height: "6px", backgroundColor: "var(--text-body)", borderRadius: "50%", display: "inline-block", animation: "aria-typing-pulse 0.8s infinite alternate 0.4s" }} />
              </div>
            )}
            
            {/* Quick replies for step 0 */}
            {step === 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                {["SaaS Website", "Custom Web App", "E-commerce Shop", "UI/UX Design"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSendMessage(opt, true)}
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid var(--card-border)",
                      color: "var(--text-main)",
                      padding: "8px 14px",
                      borderRadius: "50px",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                    className="hover:border-[var(--matcha)] hover:bg-[var(--matcha-bg-light)]"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            
            {/* Quick replies for step 3 */}
            {step === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                <a
                  href="#contact"
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => {
                      const nameInput = document.getElementById("name") as HTMLInputElement;
                      const emailInput = document.getElementById("email") as HTMLInputElement;
                      const messageInput = document.getElementById("message") as HTMLTextAreaElement;
                      
                      if (nameInput) nameInput.value = leadInfo.name;
                      if (emailInput) emailInput.value = leadInfo.email;
                      if (messageInput) {
                        messageInput.value = `Hey Dhruv, I just completed a chat with Aria about building a ${leadInfo.project}. I'd like to schedule our kickoff call to discuss details!`;
                      }
                    }, 100);
                  }}
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: "linear-gradient(135deg, var(--matcha), var(--matcha-light))",
                    color: "white",
                    padding: "10px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    boxShadow: "0 4px 12px rgba(58, 134, 255, 0.2)"
                  }}
                >
                  🗓️ Schedule Kickoff Call
                </a>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Box */}
          <div 
            style={{
              padding: "12px 16px",
              borderTop: "1px solid var(--card-border)",
              display: "flex",
              gap: "8px",
              alignItems: "center",
              background: "rgba(255, 255, 255, 0.02)"
            }}
          >
            <input 
              type="text" 
              placeholder={step === 0 ? "Select a project type above..." : "Type your message..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={step === 0}
              style={{
                flexGrow: 1,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--card-border)",
                borderRadius: "12px",
                padding: "10px 14px",
                color: "var(--text-main)",
                outline: "none",
                fontSize: "0.9rem"
              }}
            />
            <button 
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim()}
              style={{
                background: "var(--matcha)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                opacity: inputValue.trim() ? 1 : 0.5
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
