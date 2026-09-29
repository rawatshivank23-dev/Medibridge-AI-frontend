import React, { useState } from "react";
import "../css/Howituse.css";

function Howituse() {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            number: "01",
            icon: "👋",
            title: "Start MediBridge",
            subtitle: "Start your hospital visit",
            description:
                "Stand in front of the MediBridge patient kiosk and tap the Start button.",
            screenTitle: "Welcome to MediBridge",
            screenText: "Tap below to begin",
            screenIcon: "👋",
            button: "START"
        },
        {
            number: "02",
            icon: "🪪",
            title: "Scan Your ID",
            subtitle: "Choose your card",
            description:
                "Select your Swasthya Card, Golden Card or Aadhaar Card and scan it using the kiosk camera.",
            screenTitle: "Scan Your Card",
            screenText: "Place your card inside the frame",
            screenIcon: "🪪",
            button: "SCAN CARD"
        },
        {
            number: "03",
            icon: "🎤",
            title: "Tell Your Problem",
            subtitle: "Speak or write",
            description:
                "Tell the kiosk about your health problem in Hindi or English. You can also type your problem.",
            screenTitle: "Tell Your Problem",
            screenText: "Tap the microphone and speak",
            screenIcon: "🎤",
            button: "TAP TO SPEAK"
        },
        {
            number: "04",
            icon: "🎫",
            title: "Get Queue Number",
            subtitle: "Wait for your turn",
            description:
                "After registration, the kiosk displays your queue number. You can check your current position.",
            screenTitle: "Your Queue Number",
            screenText: "Please wait for your turn",
            screenIcon: "🎫",
            button: "A-24"
        },
        {
            number: "05",
            icon: "👨‍⚕️",
            title: "Meet Doctor",
            subtitle: "Go for consultation",
            description:
                "When your queue number is called, go to the displayed doctor or consultation room.",
            screenTitle: "Doctor Consultation",
            screenText: "Please go to Room 204",
            screenIcon: "👨‍⚕️",
            button: "ROOM 204"
        },
        {
            number: "06",
            icon: "💊",
            title: "Get Prescription",
            subtitle: "View medical information",
            description:
                "After consultation, your prescription and medical information can be viewed through MediBridge.",
            screenTitle: "Prescription Ready",
            screenText: "Your prescription is available",
            screenIcon: "💊",
            button: "VIEW"
        }
    ];

    const currentStep = steps[activeStep];

    const nextStep = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const previousStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    return (
        <div className="howituse-page">

            {/* HEADER */}

            <header className="howituse-header">

                <div className="howituse-logo">
                    <span>MediBridge</span>
                    <b> AI</b>
                </div>

                <div className="guide-badge">
                    <span className="green-dot"></span>
                    Patient Kiosk Guide
                </div>

            </header>


            {/* HERO */}

            <section className="howituse-hero">

                <div className="guide-label">
                    🏥 SIMPLE PATIENT GUIDE
                </div>

                <h1>
                    How to Use
                    <span> MediBridge</span>
                </h1>

                <p>
                    Follow the visual steps below to understand
                    how to use the MediBridge patient kiosk.
                </p>

                <div className="journey-line">

                    {steps.map((step, index) => (
                        <React.Fragment key={step.number}>

                            <button
                                className={
                                    activeStep === index
                                        ? "journey-step active"
                                        : "journey-step"
                                }
                                onClick={() =>
                                    setActiveStep(index)
                                }
                            >
                                <span>
                                    {step.icon}
                                </span>

                                <small>
                                    {step.number}
                                </small>
                            </button>

                            {index !== steps.length - 1 && (
                                <div className="journey-connector"></div>
                            )}

                        </React.Fragment>
                    ))}

                </div>

            </section>


            {/* MAIN GUIDE */}

            <section className="howituse-main">

                {/* LEFT SIDE */}

                <div className="steps-panel">

                    <div className="panel-heading">

                        <span className="heading-icon">
                            📋
                        </span>

                        <div>
                            <h2>
                                Patient Journey
                            </h2>

                            <p>
                                Tap a step to see how it works
                            </p>
                        </div>

                    </div>


                    <div className="step-cards">

                        {steps.map((step, index) => (

                            <button
                                key={step.number}
                                className={
                                    activeStep === index
                                        ? "step-card selected"
                                        : "step-card"
                                }
                                onClick={() =>
                                    setActiveStep(index)
                                }
                            >

                                <div className="step-number">
                                    {step.number}
                                </div>

                                <div className="step-icon">
                                    {step.icon}
                                </div>

                                <div className="step-info">

                                    <strong>
                                        {step.title}
                                    </strong>

                                    <small>
                                        {step.subtitle}
                                    </small>

                                </div>

                                <span className="step-arrow">
                                    →
                                </span>

                            </button>

                        ))}

                    </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="visual-guide">

                    <div className="visual-heading">

                        <div>

                            <span>
                                STEP {currentStep.number}
                            </span>

                            <h2>
                                {currentStep.title}
                            </h2>

                        </div>

                        <div className="big-step-icon">
                            {currentStep.icon}
                        </div>

                    </div>


                    {/* VISUAL KIOSK */}

                    <div className="kiosk-stage">

                        <div className="stage-glow"></div>

                        <div className="kiosk-device">

                            {/* CAMERA */}

                            <div className="kiosk-camera">
                                <span></span>
                            </div>


                            {/* SCREEN */}

                            <div className="kiosk-screen">

                                <div className="screen-header">

                                    <span>
                                        MediBridge
                                    </span>

                                    <b>
                                        AI
                                    </b>

                                </div>


                                {/* START */}

                                {activeStep === 0 && (

                                    <div className="screen-body">

                                        <div className="visual-icon-large">
                                            👋
                                        </div>

                                        <h3>
                                            {currentStep.screenTitle}
                                        </h3>

                                        <p>
                                            {currentStep.screenText}
                                        </p>

                                        <div className="fake-button">
                                            {currentStep.button}
                                        </div>

                                    </div>

                                )}


                                {/* SCAN */}

                                {activeStep === 1 && (

                                    <div className="screen-body">

                                        <div className="scan-area">

                                            <div className="scan-corner tl"></div>
                                            <div className="scan-corner tr"></div>
                                            <div className="scan-corner bl"></div>
                                            <div className="scan-corner br"></div>

                                            <div className="id-card-visual">
                                                🪪
                                            </div>

                                            <div className="scan-laser"></div>

                                        </div>

                                        <h3>
                                            {currentStep.screenTitle}
                                        </h3>

                                        <p>
                                            {currentStep.screenText}
                                        </p>

                                        <div className="card-options">

                                            <span>🏥</span>
                                            <span>💳</span>
                                            <span>🪪</span>

                                        </div>

                                    </div>

                                )}


                                {/* SPEAK */}

                                {activeStep === 2 && (

                                    <div className="screen-body">

                                        <div className="mic-circle">
                                            🎤
                                        </div>

                                        <div className="sound-waves">

                                            <i></i>
                                            <i></i>
                                            <i></i>
                                            <i></i>
                                            <i></i>
                                            <i></i>
                                            <i></i>

                                        </div>

                                        <h3>
                                            {currentStep.screenTitle}
                                        </h3>

                                        <p>
                                            {currentStep.screenText}
                                        </p>

                                        <div className="fake-button">
                                            {currentStep.button}
                                        </div>

                                    </div>

                                )}


                                {/* QUEUE */}

                                {activeStep === 3 && (

                                    <div className="screen-body">

                                        <div className="queue-ticket">
                                            🎫
                                        </div>

                                        <span className="queue-label">
                                            YOUR QUEUE NUMBER
                                        </span>

                                        <div className="queue-number">
                                            A-24
                                        </div>

                                        <p>
                                            {currentStep.screenText}
                                        </p>

                                        <div className="queue-status">
                                            ● Waiting
                                        </div>

                                    </div>

                                )}


                                {/* DOCTOR */}

                                {activeStep === 4 && (

                                    <div className="screen-body">

                                        <div className="doctor-visual">
                                            👨‍⚕️
                                        </div>

                                        <h3>
                                            {currentStep.screenTitle}
                                        </h3>

                                        <p>
                                            {currentStep.screenText}
                                        </p>

                                        <div className="doctor-room">
                                            🩺 {currentStep.button}
                                        </div>

                                    </div>

                                )}


                                {/* PRESCRIPTION */}

                                {activeStep === 5 && (

                                    <div className="screen-body">

                                        <div className="prescription-visual">
                                            💊
                                        </div>

                                        <h3>
                                            {currentStep.screenTitle}
                                        </h3>

                                        <p>
                                            {currentStep.screenText}
                                        </p>

                                        <div className="prescription-lines">

                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>

                                        </div>

                                        <div className="fake-button">
                                            {currentStep.button}
                                        </div>

                                    </div>

                                )}

                            </div>


                            {/* KIOSK BOTTOM */}

                            <div className="kiosk-bottom">

                                <span></span>
                                <span></span>
                                <span></span>

                            </div>

                        </div>

                    </div>


                    {/* DESCRIPTION */}

                    <div className="visual-description">

                        <div className="description-icon">
                            {currentStep.icon}
                        </div>

                        <div>

                            <span>
                                WHAT TO DO
                            </span>

                            <h3>
                                {currentStep.subtitle}
                            </h3>

                            <p>
                                {currentStep.description}
                            </p>

                        </div>

                    </div>


                    {/* NAVIGATION */}

                    <div className="visual-navigation">

                        <button
                            onClick={previousStep}
                            disabled={activeStep === 0}
                        >
                            ← Previous
                        </button>


                        <div className="progress-dots">

                            {steps.map((step, index) => (

                                <span
                                    key={step.number}
                                    className={
                                        activeStep === index
                                            ? "active"
                                            : ""
                                    }
                                ></span>

                            ))}

                        </div>


                        <button
                            onClick={nextStep}
                            disabled={
                                activeStep === steps.length - 1
                            }
                        >
                            Next →
                        </button>

                    </div>

                </div>

            </section>


            {/* QUICK VISUAL FLOW */}

            <section className="quick-flow-section">

                <div className="quick-heading">

                    <span>⚡</span>

                    <div>

                        <h2>
                            Your Complete Journey
                        </h2>

                        <p>
                            Six simple steps from registration to prescription.
                        </p>

                    </div>

                </div>


                <div className="quick-flow">

                    {steps.map((step, index) => (

                        <React.Fragment key={step.number}>

                            <button
                                className="quick-card"
                                onClick={() =>
                                    setActiveStep(index)
                                }
                            >

                                <span className="quick-number">
                                    {step.number}
                                </span>

                                <div className="quick-card-icon">
                                    {step.icon}
                                </div>

                                <strong>
                                    {step.title}
                                </strong>

                            </button>

                            {index !== steps.length - 1 && (
                                <div className="flow-arrow">
                                    →
                                </div>
                            )}

                        </React.Fragment>

                    ))}

                </div>

            </section>


            {/* BOTTOM MESSAGE */}

            <section className="howituse-bottom">

                <div className="bottom-icon">
                    🏥
                </div>

                <div>

                    <span>
                        SIMPLE • FAST • PATIENT FRIENDLY
                    </span>

                    <h2>
                        Healthcare made easier with MediBridge.
                    </h2>

                    <p>
                        Just follow the visual steps and let the
                        kiosk guide you through your hospital visit.
                    </p>

                </div>

            </section>


            <footer className="howituse-footer">

                <strong>
                    MediBridge
                    <span> AI</span>
                </strong>

                <p>
                    Patient Kiosk • Easy Healthcare Access
                </p>

            </footer>

        </div>
    );
}

export default Howituse;