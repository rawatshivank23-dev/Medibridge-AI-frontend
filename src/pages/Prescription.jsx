import React, { useState } from "react";
import "../css/Prescription.css";

function Prescription() {
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const prescriptions = [
    {
      id: 1,
      date: "27 Sep 2026",
      doctor: "Dr. Rajesh Mehta",
      department: "General Medicine",
      diagnosis: "Fever & Viral Infection",
      medicines: [
        {
          name: "Paracetamol 500mg",
          dose: "1 Tablet",
          timing: "Morning & Evening",
          duration: "5 Days",
        },
        {
          name: "Cetirizine 10mg",
          dose: "1 Tablet",
          timing: "Night",
          duration: "5 Days",
        },
      ],
      status: "ACTIVE",
    },
    {
      id: 2,
      date: "18 Sep 2026",
      doctor: "Dr. Priya Sharma",
      department: "Cardiology",
      diagnosis: "Heart Checkup",
      medicines: [
        {
          name: "Aspirin 75mg",
          dose: "1 Tablet",
          timing: "After Breakfast",
          duration: "30 Days",
        },
        {
          name: "Atorvastatin 10mg",
          dose: "1 Tablet",
          timing: "Night",
          duration: "30 Days",
        },
      ],
      status: "ACTIVE",
    },
    {
      id: 3,
      date: "05 Sep 2026",
      doctor: "Dr. Amit Verma",
      department: "Orthopedics",
      diagnosis: "Knee Pain",
      medicines: [
        {
          name: "Ibuprofen 400mg",
          dose: "1 Tablet",
          timing: "After Food",
          duration: "5 Days",
        },
        {
          name: "Calcium + Vitamin D",
          dose: "1 Tablet",
          timing: "Morning",
          duration: "30 Days",
        },
      ],
      status: "COMPLETED",
    },
  ];

  return (
    <div className="prescription-page">

      {/* HEADER */}
      <header className="prescription-header">

        <div className="prescription-logo">
          <div className="prescription-logo-symbol">✚</div>

          <div>
            <h1>
              MediBridge <span>AI</span>
            </h1>

            <p>SMART HEALTHCARE KIOSK</p>
          </div>
        </div>

        <div className="prescription-heading">
          <h2>PRESCRIPTIONS</h2>
          <p>View your prescribed medicines</p>
        </div>

        <div className="prescription-patient">
          <div className="prescription-patient-icon">
            👤
          </div>

          <div>
            <span>PATIENT</span>
            <strong>P-019</strong>
          </div>
        </div>

      </header>

      {/* MAIN */}
      <main className="prescription-main">

        {/* TOP INFO */}
        <section className="prescription-top">

          <div className="prescription-title-box">

            <div className="prescription-main-icon">
              💊
            </div>

            <div>
              <h2>Your Prescriptions</h2>

              <p>
                Select a prescription to view medicine details
              </p>
            </div>

          </div>

          <div className="prescription-count">

            <span>TOTAL PRESCRIPTIONS</span>

            <strong>{prescriptions.length}</strong>

          </div>

        </section>

        {/* PRESCRIPTION LIST */}
        <section className="prescription-list">

          {prescriptions.map((prescription) => (

            <div
              key={prescription.id}
              className={`prescription-card ${
                selectedPrescription?.id === prescription.id
                  ? "prescription-selected"
                  : ""
              }`}
              onClick={() =>
                setSelectedPrescription(prescription)
              }
            >

              <div className="prescription-date">

                <span>DATE</span>

                <strong>{prescription.date}</strong>

              </div>

              <div className="prescription-doctor">

                <div className="prescription-doctor-icon">
                  👨‍⚕️
                </div>

                <div>
                  <h3>{prescription.doctor}</h3>

                  <p>{prescription.department}</p>
                </div>

              </div>

              <div className="prescription-diagnosis">

                <span>DIAGNOSIS</span>

                <strong>
                  {prescription.diagnosis}
                </strong>

              </div>

              <div className="medicine-count">

                <span>MEDICINES</span>

                <strong>
                  {prescription.medicines.length}
                </strong>

              </div>

              <div
                className={`prescription-status ${
                  prescription.status === "ACTIVE"
                    ? "active-status"
                    : "completed-status"
                }`}
              >
                ● {prescription.status}
              </div>

              <div className="prescription-arrow">
                ›
              </div>

            </div>

          ))}

        </section>

        {/* SELECTED PRESCRIPTION */}
        {selectedPrescription && (

          <section className="prescription-details">

            <div className="prescription-details-header">

              <div>
                <span>SELECTED PRESCRIPTION</span>

                <h2>
                  {selectedPrescription.diagnosis}
                </h2>

                <p>
                  {selectedPrescription.doctor} •{" "}
                  {selectedPrescription.department}
                </p>
              </div>

              <button
                className="prescription-close"
                onClick={() =>
                  setSelectedPrescription(null)
                }
              >
                ✕
              </button>

            </div>

            {/* MEDICINES */}
            <div className="medicine-heading">

              <h3>💊 PRESCRIBED MEDICINES</h3>

              <span>
                {selectedPrescription.medicines.length} Medicines
              </span>

            </div>

            <div className="medicine-list">

              {selectedPrescription.medicines.map(
                (medicine, index) => (

                  <div
                    className="medicine-row"
                    key={index}
                  >

                    <div className="medicine-number">
                      {index + 1}
                    </div>

                    <div className="medicine-name">
                      <span>MEDICINE</span>

                      <strong>
                        {medicine.name}
                      </strong>
                    </div>

                    <div className="medicine-info">
                      <span>DOSE</span>

                      <strong>
                        {medicine.dose}
                      </strong>
                    </div>

                    <div className="medicine-info">
                      <span>TIME</span>

                      <strong>
                        {medicine.timing}
                      </strong>
                    </div>

                    <div className="medicine-info">
                      <span>DURATION</span>

                      <strong>
                        {medicine.duration}
                      </strong>
                    </div>

                  </div>

                )
              )}

            </div>

            {/* INSTRUCTIONS */}
            <div className="prescription-instructions">

              <span>DOCTOR'S INSTRUCTIONS</span>

              <p>
                Take medicines according to the prescribed
                timing. Complete the prescribed course and
                follow the doctor's instructions.
              </p>

            </div>

          </section>

        )}

        {/* QUICK ACTIONS */}
        <section className="prescription-actions">

          <div className="prescription-action-box">

            <span>💊</span>

            <div>
              <strong>MEDICINE DETAILS</strong>

              <p>
                Check medicine and dosage
              </p>
            </div>

          </div>

          <div className="prescription-action-box">

            <span>⏰</span>

            <div>
              <strong>MEDICINE TIMING</strong>

              <p>
                Check when to take medicine
              </p>
            </div>

          </div>

          <div className="prescription-action-box">

            <span>📄</span>

            <div>
              <strong>PRINT PRESCRIPTION</strong>

              <p>
                Get a copy of prescription
              </p>
            </div>

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="prescription-footer">

        <button
          className="prescription-back"
          onClick={() => window.history.back()}
        >
          ← BACK
        </button>

        <div className="prescription-security">
          🔒 Prescription information is secure
        </div>

        <button
          className="prescription-home"
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

export default Prescription;