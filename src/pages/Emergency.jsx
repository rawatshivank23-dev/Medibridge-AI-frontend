import React, { useEffect, useState } from "react";
import "../css/Emergency.css";

function Emergency() {
    const [severity, setSeverity] = useState("critical");
    const [showConfirm, setShowConfirm] = useState(false);
    const [action, setAction] = useState("");
    const [locationShared, setLocationShared] = useState(false);
    const [requestSent, setRequestSent] = useState(false);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let timer;

        if (requestSent) {
            timer = setInterval(() => {
                setSeconds((previous) => previous + 1);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [requestSent]);

    const severityData = {
        critical: {
            title: "Critical Emergency",
            subtitle: "Immediate medical assistance may be required.",
            icon: "🚨",
            className: "critical",
            ambulance: true
        },

        urgent: {
            title: "Urgent Medical Help",
            subtitle: "Medical attention should be arranged soon.",
            icon: "⚠️",
            className: "urgent",
            ambulance: false
        },

        normal: {
            title: "Need Medical Assistance",
            subtitle: "Get help or contact a healthcare professional.",
            icon: "🩺",
            className: "normal",
            ambulance: false
        }
    };

    const currentSeverity = severityData[severity];

    const handleAction = (actionName) => {
        setAction(actionName);
        setShowConfirm(true);
    };

    const confirmAction = () => {
        setShowConfirm(false);

        if (action === "location") {
            setLocationShared(true);
        }

        if (action === "emergency") {
            setRequestSent(true);
            setSeconds(0);
        }

        if (action === "ambulance") {
            window.location.href = "tel:108";
        }
    };

    const cancelAction = () => {
        setShowConfirm(false);
        setAction("");
    };

    const resetEmergency = () => {
        setRequestSent(false);
        setSeconds(0);
    };

    return (
        <div className={`emergency-page ${currentSeverity.className}`}>

            {/* HEADER */}
            <header className="emergency-header">

                <div className="emergency-brand">
                    <span className="brand-medi">
                        MediBridge
                    </span>
                    <span className="brand-ai">
                        {" "}AI
                    </span>
                </div>

                <div className="emergency-status">
                    <span className="status-dot"></span>
                    Emergency Center
                </div>

            </header>

            {/* HERO */}
            <section className="emergency-hero">

                <div className="hero-icon">
                    {currentSeverity.icon}
                </div>

                <div className="hero-content">
                    <span className="emergency-label">
                        EMERGENCY ASSISTANCE
                    </span>

                    <h1>
                        {currentSeverity.title}
                    </h1>

                    <p>
                        {currentSeverity.subtitle}
                    </p>
                </div>

                <div className="pulse-ring"></div>

            </section>

            {/* SEVERITY SELECTOR */}
            <section className="severity-section">

                <div className="section-heading">
                    <span>⚡</span>
                    <div>
                        <h2>How urgent is the situation?</h2>
                        <p>Select the option that best describes the situation.</p>
                    </div>
                </div>

                <div className="severity-grid">

                    <button
                        className={`severity-card ${
                            severity === "critical"
                                ? "selected"
                                : ""
                        }`}
                        onClick={() => setSeverity("critical")}
                    >
                        <span className="severity-icon">🚨</span>
                        <strong>Critical</strong>
                        <small>Immediate help</small>
                    </button>

                    <button
                        className={`severity-card ${
                            severity === "urgent"
                                ? "selected"
                                : ""
                        }`}
                        onClick={() => setSeverity("urgent")}
                    >
                        <span className="severity-icon">⚠️</span>
                        <strong>Urgent</strong>
                        <small>Needs attention</small>
                    </button>

                    <button
                        className={`severity-card ${
                            severity === "normal"
                                ? "selected"
                                : ""
                        }`}
                        onClick={() => setSeverity("normal")}
                    >
                        <span className="severity-icon">🩺</span>
                        <strong>Medical Help</strong>
                        <small>Need assistance</small>
                    </button>

                </div>

            </section>

            {/* CRITICAL AMBULANCE */}
            {currentSeverity.ambulance && (
                <section className="ambulance-alert">

                    <div className="ambulance-icon">
                        🚑
                    </div>

                    <div className="ambulance-content">
                        <span>CRITICAL EMERGENCY</span>

                        <h2>
                            Need an Ambulance?
                        </h2>

                        <p>
                            For serious or life-threatening emergencies,
                            call emergency ambulance services.
                        </p>
                    </div>

                    <button
                        className="ambulance-button"
                        onClick={() =>
                            handleAction("ambulance")
                        }
                    >
                        📞 Call 108
                    </button>

                </section>
            )}

            {/* MAIN ACTIONS */}
            <section className="emergency-actions">

                <div className="section-heading">
                    <span>🆘</span>
                    <div>
                        <h2>Emergency Actions</h2>
                        <p>Choose the help you need.</p>
                    </div>
                </div>

                <div className="action-grid">

                    {/* EMERGENCY REQUEST */}
                    <button
                        className="action-card emergency-request"
                        onClick={() =>
                            handleAction("emergency")
                        }
                    >
                        <div className="action-icon">
                            🆘
                        </div>

                        <div className="action-text">
                            <h3>Request Emergency Help</h3>

                            <p>
                                Send an emergency assistance request.
                            </p>
                        </div>

                        <span className="action-arrow">
                            →
                        </span>
                    </button>

                    {/* LOCATION */}
                    <button
                        className="action-card"
                        onClick={() =>
                            handleAction("location")
                        }
                    >
                        <div className="action-icon">
                            📍
                        </div>

                        <div className="action-text">
                            <h3>
                                {locationShared
                                    ? "Location Shared"
                                    : "Share Location"}
                            </h3>

                            <p>
                                {locationShared
                                    ? "Your location is ready to share."
                                    : "Help services can use your location."}
                            </p>
                        </div>

                        <span className="action-arrow">
                            →
                        </span>
                    </button>

                    {/* HOSPITAL */}
                    <button
                        className="action-card"
                        onClick={() =>
                            handleAction("hospital")
                        }
                    >
                        <div className="action-icon">
                            🏥
                        </div>

                        <div className="action-text">
                            <h3>Find Nearby Hospital</h3>

                            <p>
                                View nearby hospitals and emergency care.
                            </p>
                        </div>

                        <span className="action-arrow">
                            →
                        </span>
                    </button>

                    {/* DOCTOR */}
                    <button
                        className="action-card"
                        onClick={() =>
                            handleAction("doctor")
                        }
                    >
                        <div className="action-icon">
                            👨‍⚕️
                        </div>

                        <div className="action-text">
                            <h3>Contact Doctor</h3>

                            <p>
                                Request assistance from a healthcare professional.
                            </p>
                        </div>

                        <span className="action-arrow">
                            →
                        </span>
                    </button>

                </div>

            </section>

            {/* EMERGENCY STATUS */}
            {requestSent && (
                <section className="response-panel">

                    <div className="response-animation">
                        <span>✓</span>
                    </div>

                    <div className="response-content">

                        <span className="response-label">
                            REQUEST ACTIVE
                        </span>

                        <h2>
                            Emergency request sent
                        </h2>

                        <p>
                            Your emergency assistance request has been
                            recorded. This demo is ready to connect with
                            backend services.
                        </p>

                        <div className="response-time">
                            <span>⏱️</span>
                            Request active for{" "}
                            <strong>
                                {seconds}s
                            </strong>
                        </div>

                        <button
                            className="reset-button"
                            onClick={resetEmergency}
                        >
                            End Demo Request
                        </button>

                    </div>

                </section>
            )}

            {/* HEALTH INFORMATION */}
            <section className="health-info">

                <div className="health-info-header">
                    <span>❤️</span>

                    <div>
                        <h2>Important Information</h2>
                        <p>
                            Keep these details ready during an emergency.
                        </p>
                    </div>
                </div>

                <div className="info-grid">

                    <div className="info-card">
                        <span>🪪</span>
                        <div>
                            <strong>Patient ID</strong>
                            <p>Scan your health card when available.</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <span>💊</span>
                        <div>
                            <strong>Medicines</strong>
                            <p>Keep current medication information ready.</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <span>🩺</span>
                        <div>
                            <strong>Medical History</strong>
                            <p>Share important medical information with professionals.</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <span>📞</span>
                        <div>
                            <strong>Emergency Contact</strong>
                            <p>Keep a trusted emergency contact available.</p>
                        </div>
                    </div>

                </div>

            </section>

            {/* SAFETY NOTE */}
            <section className="safety-note">

                <span>ℹ️</span>

                <div>
                    <strong>Emergency Safety Notice</strong>

                    <p>
                        If someone has a serious or life-threatening emergency,
                        seek immediate professional medical help. In India,
                        108 ambulance service may be available depending on the
                        location.
                    </p>
                </div>

            </section>

            {/* CONFIRMATION MODAL */}
            {showConfirm && (
                <div className="modal-overlay">

                    <div className="confirmation-modal">

                        <div className="modal-icon">
                            {action === "ambulance"
                                ? "🚑"
                                : action === "location"
                                ? "📍"
                                : action === "emergency"
                                ? "🆘"
                                : action === "hospital"
                                ? "🏥"
                                : "👨‍⚕️"}
                        </div>

                        <h2>
                            Confirm Action
                        </h2>

                        <p>
                            Are you sure you want to continue
                            with this emergency action?
                        </p>

                        <div className="modal-buttons">

                            <button
                                className="modal-cancel"
                                onClick={cancelAction}
                            >
                                Cancel
                            </button>

                            <button
                                className="modal-confirm"
                                onClick={confirmAction}
                            >
                                Continue
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default Emergency;