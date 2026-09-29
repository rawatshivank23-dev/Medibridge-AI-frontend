import React, { useState } from "react";
import "../css/MedicalRecords.css";

function MedicalRecords() {
  const [selectedRecord, setSelectedRecord] = useState(null);

  const records = [
    {
      id: 1,
      date: "27 Sep 2026",
      doctor: "Dr. Rajesh Mehta",
      department: "General Medicine",
      diagnosis: "Fever & Viral Infection",
      type: "Consultation",
      status: "Completed",
    },
    {
      id: 2,
      date: "18 Sep 2026",
      doctor: "Dr. Priya Sharma",
      department: "Cardiology",
      diagnosis: "Regular Heart Checkup",
      type: "Checkup",
      status: "Completed",
    },
    {
      id: 3,
      date: "05 Sep 2026",
      doctor: "Dr. Amit Verma",
      department: "Orthopedics",
      diagnosis: "Knee Pain",
      type: "Consultation",
      status: "Completed",
    },
    {
      id: 4,
      date: "21 Aug 2026",
      doctor: "Dr. Neha Gupta",
      department: "Pediatrics",
      diagnosis: "General Health Checkup",
      type: "Checkup",
      status: "Completed",
    },
  ];

  return (
    <div className="medical-page">

      {/* HEADER */}
      <header className="medical-header">
        <div className="medical-logo">
          <div className="logo-symbol">✚</div>

          <div>
            <h1>MediBridge <span>AI</span></h1>
            <p>SMART HEALTHCARE KIOSK</p>
          </div>
        </div>

        <div className="header-title">
          <h2>MEDICAL RECORDS</h2>
          <p>View your previous medical records</p>
        </div>

        <div className="patient-info">
          <div className="patient-icon">👤</div>
          <div>
            <span>PATIENT</span>
            <strong>P-019</strong>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="medical-main">

        {/* TOP INFO */}
        <section className="records-top">

          <div className="records-heading">
            <span className="records-icon">📋</span>

            <div>
              <h2>Your Medical Records</h2>
              <p>
                Select a record to view complete medical details
              </p>
            </div>
          </div>

          <div className="record-count">
            <span>TOTAL RECORDS</span>
            <strong>{records.length}</strong>
          </div>

        </section>

        {/* RECORD CARDS */}
        <section className="records-list">

          {records.map((record) => (
            <div
              className={`record-card ${
                selectedRecord?.id === record.id
                  ? "record-selected"
                  : ""
              }`}
              key={record.id}
              onClick={() => setSelectedRecord(record)}
            >

              <div className="record-date">
                <span>DATE</span>
                <strong>{record.date}</strong>
              </div>

              <div className="record-doctor">
                <div className="doctor-circle">👨‍⚕️</div>

                <div>
                  <h3>{record.doctor}</h3>
                  <p>{record.department}</p>
                </div>
              </div>

              <div className="record-diagnosis">
                <span>DIAGNOSIS</span>
                <strong>{record.diagnosis}</strong>
              </div>

              <div className="record-type">
                <span>TYPE</span>
                <strong>{record.type}</strong>
              </div>

              <div className="record-status">
                <span>●</span>
                {record.status}
              </div>

              <div className="record-arrow">
                ›
              </div>

            </div>
          ))}

        </section>

        {/* SELECTED RECORD DETAILS */}
        {selectedRecord && (
          <section className="record-details">

            <div className="details-header">
              <div>
                <span>SELECTED MEDICAL RECORD</span>
                <h2>{selectedRecord.diagnosis}</h2>
              </div>

              <button
                className="close-details"
                onClick={() => setSelectedRecord(null)}
              >
                ✕
              </button>
            </div>

            <div className="details-grid">

              <div className="detail-box">
                <span>DOCTOR</span>
                <strong>{selectedRecord.doctor}</strong>
              </div>

              <div className="detail-box">
                <span>DEPARTMENT</span>
                <strong>{selectedRecord.department}</strong>
              </div>

              <div className="detail-box">
                <span>VISIT DATE</span>
                <strong>{selectedRecord.date}</strong>
              </div>

              <div className="detail-box">
                <span>RECORD TYPE</span>
                <strong>{selectedRecord.type}</strong>
              </div>

            </div>

            <div className="medical-summary">
              <span>MEDICAL SUMMARY</span>

              <p>
                Patient visited the hospital for{" "}
                <strong>{selectedRecord.diagnosis}</strong>.
                Doctor consultation was completed successfully.
                Further treatment and medicines can be checked
                from the prescription section.
              </p>
            </div>

          </section>
        )}

        {/* QUICK OPTIONS */}
        <section className="quick-options">

          <div className="quick-box">
            <span>💊</span>
            <div>
              <strong>PRESCRIPTIONS</strong>
              <p>View prescribed medicines</p>
            </div>
          </div>

          <div className="quick-box">
            <span>🧪</span>
            <div>
              <strong>LAB REPORTS</strong>
              <p>View your test reports</p>
            </div>
          </div>

          <div className="quick-box">
            <span>📄</span>
            <div>
              <strong>DOWNLOAD</strong>
              <p>Get medical record copy</p>
            </div>
          </div>

        </section>

      </main>

      {/* BOTTOM NAVIGATION */}
      <footer className="medical-footer">

        <button
          className="medical-back"
          onClick={() => window.history.back()}
        >
          ← BACK
        </button>

        <div className="footer-message">
          <span>🔒</span>
          Your medical information is secure
        </div>

        <button
          className="medical-home"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          🏠 HOME
        </button>

      </footer>

    </div>
  );
}

export default MedicalRecords;