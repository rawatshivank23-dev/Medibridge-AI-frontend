import React, { useMemo, useState } from "react";
import "../css/Billing.css";

function Billing() {
  // =========================
  // BILL DATA
  // =========================

  const [bills, setBills] = useState([
    {
      id: 1,
      patientId: "P-019",
      patientName: "Shivank Rawat",
      appointmentId: "A-101",
      doctor: "Dr. Rajesh Mehta",
      department: "General Medicine",
      date: "27 Sep 2026",
      consultationFee: 800,
      medicineFee: 450,
      testFee: 250,
      paymentStatus: "PENDING",
      paymentMethod: "UPI",
    },
    {
      id: 2,
      patientId: "P-017",
      patientName: "Rahul Sharma",
      appointmentId: "A-102",
      doctor: "Dr. Priya Sharma",
      department: "Cardiology",
      date: "27 Sep 2026",
      consultationFee: 1200,
      medicineFee: 600,
      testFee: 700,
      paymentStatus: "PAID",
      paymentMethod: "CARD",
    },
    {
      id: 3,
      patientId: "P-018",
      patientName: "Aman Verma",
      appointmentId: "A-103",
      doctor: "Dr. Amit Verma",
      department: "Orthopedics",
      date: "26 Sep 2026",
      consultationFee: 900,
      medicineFee: 500,
      testFee: 300,
      paymentStatus: "PAID",
      paymentMethod: "CASH",
    },
    {
      id: 4,
      patientId: "P-020",
      patientName: "Anjali Gupta",
      appointmentId: "A-104",
      doctor: "Dr. Neha Gupta",
      department: "Pediatrics",
      date: "26 Sep 2026",
      consultationFee: 700,
      medicineFee: 350,
      testFee: 200,
      paymentStatus: "PENDING",
      paymentMethod: "UPI",
    },
  ]);

  // =========================
  // STATES
  // =========================

  const [selectedBill, setSelectedBill] = useState(null);

  const [search, setSearch] = useState("");

  const [showAddBill, setShowAddBill] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const [newBill, setNewBill] = useState({
    patientId: "",
    patientName: "",
    appointmentId: "",
    doctor: "",
    department: "",
    consultationFee: "",
    medicineFee: "",
    testFee: "",
    paymentMethod: "UPI",
  });

  // =========================
  // TOTAL AMOUNT
  // =========================

  const calculateTotal = (bill) => {
    return (
      Number(bill.consultationFee || 0) +
      Number(bill.medicineFee || 0) +
      Number(bill.testFee || 0)
    );
  };

  // =========================
  // SEARCH
  // =========================

  const filteredBills = useMemo(() => {
    return bills.filter((bill) => {
      const value = search.toLowerCase();

      return (
        bill.patientId.toLowerCase().includes(value) ||
        bill.patientName.toLowerCase().includes(value) ||
        bill.doctor.toLowerCase().includes(value) ||
        bill.department.toLowerCase().includes(value) ||
        String(bill.id).includes(value)
      );
    });
  }, [bills, search]);

  // =========================
  // SELECT BILL
  // =========================

  const openBill = (bill) => {
    setSelectedBill(bill);
    setPaymentMethod(bill.paymentMethod);
  };

  // =========================
  // PAY NOW
  // =========================

  const payBill = () => {
    if (!selectedBill) return;

    const updatedBill = {
      ...selectedBill,
      paymentStatus: "PAID",
      paymentMethod: paymentMethod,
    };

    setBills((oldBills) =>
      oldBills.map((bill) =>
        bill.id === selectedBill.id ? updatedBill : bill
      )
    );

    setSelectedBill(updatedBill);

    alert(
      `Payment Successful!\n\nBill #${updatedBill.id}\nAmount: ₹${calculateTotal(
        updatedBill
      )}\nPayment: ${paymentMethod}`
    );
  };

  // =========================
  // UPDATE PAYMENT METHOD
  // =========================

  const changePaymentMethod = (method) => {
    setPaymentMethod(method);

    if (selectedBill) {
      setSelectedBill({
        ...selectedBill,
        paymentMethod: method,
      });
    }
  };

  // =========================
  // DELETE BILL
  // =========================

  const deleteBill = () => {
    if (!selectedBill) return;

    const confirmDelete = window.confirm(
      `Delete Bill #${selectedBill.id}?`
    );

    if (!confirmDelete) return;

    setBills((oldBills) =>
      oldBills.filter((bill) => bill.id !== selectedBill.id)
    );

    setSelectedBill(null);
  };

  // =========================
  // PRINT BILL
  // =========================

  const printBill = () => {
    if (!selectedBill) {
      alert("Please select a bill first.");
      return;
    }

    window.print();
  };

  // =========================
  // ADD NEW BILL
  // =========================

  const handleInput = (e) => {
    setNewBill({
      ...newBill,
      [e.target.name]: e.target.value,
    });
  };

  const addBill = (e) => {
    e.preventDefault();

    if (
      !newBill.patientId ||
      !newBill.patientName ||
      !newBill.doctor
    ) {
      alert("Please fill Patient ID, Patient Name and Doctor.");
      return;
    }

    const createdBill = {
      id: bills.length + 1,
      ...newBill,
      date: "27 Sep 2026",
      paymentStatus: "PENDING",
      consultationFee: Number(newBill.consultationFee || 0),
      medicineFee: Number(newBill.medicineFee || 0),
      testFee: Number(newBill.testFee || 0),
    };

    setBills([...bills, createdBill]);

    setShowAddBill(false);

    setNewBill({
      patientId: "",
      patientName: "",
      appointmentId: "",
      doctor: "",
      department: "",
      consultationFee: "",
      medicineFee: "",
      testFee: "",
      paymentMethod: "UPI",
    });

    alert("New bill created successfully!");
  };

  // =========================
  // SUMMARY
  // =========================

  const totalBills = bills.length;

  const paidBills = bills.filter(
    (bill) => bill.paymentStatus === "PAID"
  ).length;

  const pendingBills = bills.filter(
    (bill) => bill.paymentStatus === "PENDING"
  ).length;

  const totalAmount = bills.reduce(
    (total, bill) => total + calculateTotal(bill),
    0
  );

  const pendingAmount = bills
    .filter((bill) => bill.paymentStatus === "PENDING")
    .reduce(
      (total, bill) => total + calculateTotal(bill),
      0
    );

  return (
    <div className="billing-page">

      {/* ================= HEADER ================= */}

      <header className="billing-header">

        <div>
          <h1>
            🏥 MediBridge <span>AI</span>
          </h1>

          <p>
            Smart Hospital Management System
          </p>
        </div>

        <div className="billing-header-right">
          <div className="live-dot"></div>

          <span>LIVE BILLING</span>

          <div className="patient-badge">
            👤 PATIENT BILLING
          </div>
        </div>

      </header>

      {/* ================= TITLE ================= */}

      <section className="billing-title">

        <div>
          <h2>💳 BILLING & PAYMENT</h2>

          <p>
            Manage hospital bills and payments
          </p>
        </div>

        <button
          className="add-bill-btn"
          onClick={() => setShowAddBill(true)}
        >
          ＋ CREATE NEW BILL
        </button>

      </section>

      {/* ================= SUMMARY ================= */}

      <section className="billing-summary">

        <div className="summary-card">
          <div className="summary-icon">
            🧾
          </div>

          <div>
            <p>TOTAL BILLS</p>
            <h3>{totalBills}</h3>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon green">
            ✓
          </div>

          <div>
            <p>PAID BILLS</p>
            <h3>{paidBills}</h3>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon red">
            !
          </div>

          <div>
            <p>PENDING</p>
            <h3>{pendingBills}</h3>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon yellow">
            ₹
          </div>

          <div>
            <p>TOTAL COLLECTION</p>
            <h3>₹{totalAmount}</h3>
          </div>
        </div>

      </section>

      {/* ================= PENDING ALERT ================= */}

      {pendingBills > 0 && (
        <div className="pending-alert">

          <span>⚠️</span>

          <div>
            <strong>
              {pendingBills} payment(s) pending
            </strong>

            <p>
              Total pending amount: ₹{pendingAmount}
            </p>
          </div>

        </div>
      )}

      {/* ================= SEARCH ================= */}

      <section className="billing-container">

        <div className="billing-toolbar">

          <div>
            <h2>📋 BILL HISTORY</h2>

            <span>
              {filteredBills.length} bill(s) found
            </span>
          </div>

          <div className="search-box">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search patient, doctor, bill..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                onClick={() => setSearch("")}
              >
                ✕
              </button>
            )}

          </div>

        </div>

        {/* ================= BILL LIST ================= */}

        <div className="bill-list">

          {filteredBills.length === 0 ? (

            <div className="no-bills">
              <div>🔎</div>

              <h3>No Bills Found</h3>

              <p>
                Try searching with another patient,
                doctor or bill number.
              </p>
            </div>

          ) : (

            filteredBills.map((bill) => (

              <div
                key={bill.id}
                className={`bill-card ${
                  selectedBill?.id === bill.id
                    ? "selected"
                    : ""
                }`}
                onClick={() => openBill(bill)}
              >

                <div className="bill-main">

                  <div className="bill-icon">
                    🧾
                  </div>

                  <div className="bill-info">

                    <div className="bill-number">
                      BILL #{bill.id}
                    </div>

                    <h3>
                      {bill.patientName}
                    </h3>

                    <p>
                      {bill.patientId}
                      {" • "}
                      {bill.doctor}
                    </p>

                    <small>
                      {bill.department}
                      {" • "}
                      Appointment {bill.appointmentId}
                    </small>

                  </div>

                </div>

                <div className="bill-middle">

                  <span>
                    PAYMENT
                  </span>

                  <strong>
                    {bill.paymentMethod}
                  </strong>

                </div>

                <div className="bill-right">

                  <h2>
                    ₹{calculateTotal(bill)}
                  </h2>

                  <span
                    className={`payment-status ${
                      bill.paymentStatus === "PAID"
                        ? "paid"
                        : "pending"
                    }`}
                  >
                    {bill.paymentStatus === "PAID"
                      ? "✓ PAID"
                      : "⚠ PENDING"}
                  </span>

                </div>

              </div>

            ))

          )}

        </div>

      </section>

      {/* ================= SELECTED BILL ================= */}

      {selectedBill && (

        <section className="bill-details">

          <div className="details-header">

            <div>
              <div className="detail-label">
                SELECTED BILL
              </div>

              <h2>
                Bill #{selectedBill.id}
              </h2>

              <p>
                {selectedBill.patientName}
                {" • "}
                {selectedBill.patientId}
              </p>
            </div>

            <button
              className="close-btn"
              onClick={() =>
                setSelectedBill(null)
              }
            >
              ✕
            </button>

          </div>

          {/* PATIENT DETAILS */}

          <div className="patient-details">

            <div>
              <span>Patient</span>
              <strong>
                {selectedBill.patientName}
              </strong>
            </div>

            <div>
              <span>Patient ID</span>
              <strong>
                {selectedBill.patientId}
              </strong>
            </div>

            <div>
              <span>Doctor</span>
              <strong>
                {selectedBill.doctor}
              </strong>
            </div>

            <div>
              <span>Department</span>
              <strong>
                {selectedBill.department}
              </strong>
            </div>

          </div>

          {/* BILL BREAKDOWN */}

          <div className="bill-breakdown">

            <div className="breakdown-title">
              BILL BREAKDOWN
            </div>

            <div className="breakdown-row">

              <span>
                👨‍⚕️ Doctor Consultation
              </span>

              <strong>
                ₹{selectedBill.consultationFee}
              </strong>

            </div>

            <div className="breakdown-row">

              <span>
                💊 Medicines
              </span>

              <strong>
                ₹{selectedBill.medicineFee}
              </strong>

            </div>

            <div className="breakdown-row">

              <span>
                🧪 Tests / Laboratory
              </span>

              <strong>
                ₹{selectedBill.testFee}
              </strong>

            </div>

            <div className="breakdown-line"></div>

            <div className="total-row">

              <span>
                TOTAL AMOUNT
              </span>

              <strong>
                ₹{calculateTotal(selectedBill)}
              </strong>

            </div>

          </div>

          {/* PAYMENT */}

          <div className="payment-section">

            <div className="payment-section-title">
              💳 PAYMENT
            </div>

            <div className="payment-methods">

              {["UPI", "CARD", "CASH"].map(
                (method) => (

                  <button
                    key={method}
                    className={
                      paymentMethod === method
                        ? "method active"
                        : "method"
                    }
                    onClick={() =>
                      changePaymentMethod(method)
                    }
                  >
                    {method === "UPI" && "📱"}
                    {method === "CARD" && "💳"}
                    {method === "CASH" && "💵"}

                    <span>
                      {method}
                    </span>
                  </button>

                )
              )}

            </div>

            <div className="current-status">

              <span>
                CURRENT STATUS
              </span>

              <strong
                className={
                  selectedBill.paymentStatus === "PAID"
                    ? "status-paid"
                    : "status-pending"
                }
              >
                {selectedBill.paymentStatus}
              </strong>

            </div>

          </div>

          {/* ACTION BUTTONS */}

          <div className="bill-actions">

            {selectedBill.paymentStatus ===
              "PENDING" && (

              <button
                className="pay-btn"
                onClick={payBill}
              >
                💳 PAY ₹
                {calculateTotal(selectedBill)}
              </button>

            )}

            {selectedBill.paymentStatus ===
              "PAID" && (

              <div className="paid-message">
                ✓ PAYMENT COMPLETED
              </div>

            )}

            <button
              className="print-btn"
              onClick={printBill}
            >
              🖨️ PRINT BILL
            </button>

            <button
              className="delete-btn"
              onClick={deleteBill}
            >
              🗑 DELETE
            </button>

          </div>

        </section>

      )}

      {/* ================= ADD BILL MODAL ================= */}

      {showAddBill && (

        <div className="modal-overlay">

          <div className="add-bill-modal">

            <div className="modal-header">

              <div>
                <h2>＋ CREATE NEW BILL</h2>

                <p>
                  Enter patient billing information
                </p>
              </div>

              <button
                onClick={() =>
                  setShowAddBill(false)
                }
              >
                ✕
              </button>

            </div>

            <form onSubmit={addBill}>

              <div className="form-grid">

                <div className="form-group">
                  <label>Patient ID *</label>

                  <input
                    name="patientId"
                    value={newBill.patientId}
                    onChange={handleInput}
                    placeholder="P-021"
                  />
                </div>

                <div className="form-group">
                  <label>Patient Name *</label>

                  <input
                    name="patientName"
                    value={newBill.patientName}
                    onChange={handleInput}
                    placeholder="Patient name"
                  />
                </div>

                <div className="form-group">
                  <label>Appointment ID</label>

                  <input
                    name="appointmentId"
                    value={newBill.appointmentId}
                    onChange={handleInput}
                    placeholder="A-105"
                  />
                </div>

                <div className="form-group">
                  <label>Doctor *</label>

                  <input
                    name="doctor"
                    value={newBill.doctor}
                    onChange={handleInput}
                    placeholder="Dr. Name"
                  />
                </div>

                <div className="form-group">
                  <label>Department</label>

                  <input
                    name="department"
                    value={newBill.department}
                    onChange={handleInput}
                    placeholder="General Medicine"
                  />
                </div>

                <div className="form-group">
                  <label>Payment Method</label>

                  <select
                    name="paymentMethod"
                    value={newBill.paymentMethod}
                    onChange={handleInput}
                  >
                    <option value="UPI">
                      UPI
                    </option>

                    <option value="CARD">
                      CARD
                    </option>

                    <option value="CASH">
                      CASH
                    </option>
                  </select>

                </div>

                <div className="form-group">
                  <label>Consultation Fee</label>

                  <input
                    type="number"
                    name="consultationFee"
                    value={newBill.consultationFee}
                    onChange={handleInput}
                    placeholder="800"
                  />
                </div>

                <div className="form-group">
                  <label>Medicine Fee</label>

                  <input
                    type="number"
                    name="medicineFee"
                    value={newBill.medicineFee}
                    onChange={handleInput}
                    placeholder="400"
                  />
                </div>

                <div className="form-group">
                  <label>Test Fee</label>

                  <input
                    type="number"
                    name="testFee"
                    value={newBill.testFee}
                    onChange={handleInput}
                    placeholder="300"
                  />
                </div>

              </div>

              {/* LIVE TOTAL */}

              <div className="new-bill-total">

                <span>
                  TOTAL BILL
                </span>

                <strong>
                  ₹
                  {Number(
                    newBill.consultationFee || 0
                  ) +
                    Number(
                      newBill.medicineFee || 0
                    ) +
                    Number(
                      newBill.testFee || 0
                    )}
                </strong>

              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-modal"
                  onClick={() =>
                    setShowAddBill(false)
                  }
                >
                  CANCEL
                </button>

                <button
                  type="submit"
                  className="create-modal"
                >
                  ✓ CREATE BILL
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* ================= NAVIGATION ================= */}

      <div className="bottom-buttons">

        <button
          className="back-btn"
          onClick={() => window.history.back()}
        >
          ← BACK
        </button>

        <button
          className="home-btn"
          onClick={() =>
            (window.location.href = "/")
          }
        >
          🏠 HOME
        </button>

        <button
          className="next-btn"
          onClick={() =>
            (window.location.href =
              "/prescription")
          }
        >
          NEXT →
        </button>

      </div>

      <footer className="billing-footer">
        🔒 Secure Billing System
        <span>•</span>
        MediBridge AI
      </footer>

    </div>
  );
}

export default Billing;