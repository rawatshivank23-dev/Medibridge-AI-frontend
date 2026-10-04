
import React, { useState } from "react";
import "../css/Welcome.css";

const languages = [
  {
    id: "english",
    name: "English",
    icon: "🌐",
  },
  {
    id: "hindi",
    name: "हिंदी",
    icon: "अ",
  },
  {
    id: "urdu",
    name: "اردو",
    icon: "ا",
  },
  {
    id: "nepali",
    name: "नेपाली",
    icon: "◈",
  },
];

function Welcome({ onContinue }) {
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const handleContinue = () => {
    if (onContinue) {
      onContinue(selectedLanguage);
    }
  };

  return (
    <div className="welcome-page">
      <div className="kiosk-container">

        {/* ================= HEADER ================= */}
        <header className="welcome-header">

          {/* ================= MEDIBRIDGE AI BRAND ================= */}
          <div className="brand-section">

            {/* Unique Hospital + AI Logo */}
            <div className="medical-ai-logo">

              {/* Outer glowing ring */}
              <div className="logo-ring"></div>

              {/* AI Nodes */}
              <span className="ai-node node-top"></span>
              <span className="ai-node node-right"></span>
              <span className="ai-node node-bottom"></span>
              <span className="ai-node node-left"></span>

              {/* Hospital Cross */}
              <div className="hospital-cross">
                <span className="cross-horizontal"></span>
                <span className="cross-vertical"></span>
              </div>

              {/* Heartbeat Line */}
              <div className="heartbeat">
                <span></span>
              </div>

            </div>

            {/* Brand Text */}
            <div className="brand-text">

              <div className="welcome-brand-line">
                <span className="welcome-small">
                  Welcome to
                </span>

                <h1>
                  MediBridge
                  <span className="ai-text"> AI</span>
                </h1>
              </div>

              <p>
                Smart Healthcare. Better Care.
              </p>

            </div>

          </div>

          {/* Header Divider */}
          <div className="header-divider"></div>

          {/* Welcome Status */}
          <div className="welcome-label">

            <span className="online-dot"></span>

            <span>
              Smart Kiosk
            </span>

          </div>

        </header>


        {/* ================= MAIN CONTENT ================= */}
        <main className="welcome-content">

          {/* ================= TITLE ================= */}
          <div className="welcome-title-area">

            <div className="welcome-badge">
              <span>✦</span>
            </div>

            <h2>
              Select Language
            </h2>

            <p>
              भाषा चुनें / Please select your preferred language
            </p>

          </div>


          {/* ================= LANGUAGE CARDS ================= */}
          <div className="language-container">

            {languages.map((language) => (

              <button
                key={language.id}
                className={`language-card ${
                  selectedLanguage === language.id
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedLanguage(language.id)
                }
              >

                <div className="language-icon">
                  {language.icon}
                </div>

                <div className="language-name">
                  {language.name}
                </div>

                {selectedLanguage === language.id && (

                  <div className="selected-check">
                    ✓
                  </div>

                )}

              </button>

            ))}

          </div>


          {/* ================= SELECTED LANGUAGE ================= */}
          <div className="selected-language">

            <span className="selected-dot"></span>

            <span>
              Selected Language:
            </span>

            <strong>
              {
                languages.find(
                  (lang) =>
                    lang.id === selectedLanguage
                )?.name
              }
            </strong>

          </div>


          {/* ================= CONTINUE BUTTON ================= */}
          <button
            className="continue-button"
            onClick={handleContinue}
          >

            <span>
              Continue
            </span>

            <span className="continue-arrow">
              →
            </span>

          </button>


          {/* ================= HELP TEXT ================= */}
          <div className="help-text">

            <span className="help-icon">
              ?
            </span>

            <span>
              Need help? Please contact the MediBridge support desk.
            </span>

          </div>

        </main>


        {/* ================= FOOTER ================= */}
        <footer className="welcome-footer">

          <span>
            MediBridge AI
          </span>

          <i></i>

          <span>
            Smart Kiosk
          </span>

          <i></i>

          <span>
            Easy Registration
          </span>

          <i></i>

          <span>
            Better Healthcare
          </span>

        </footer>

      </div>
    </div>
  );
}

export default Welcome;

