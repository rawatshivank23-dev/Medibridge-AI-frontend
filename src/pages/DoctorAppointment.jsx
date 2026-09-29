import React, { useState } from "react";
import "../css/DoctorAppointment.css";

const doctors = [
  {
    id: 1,
    name: "Dr. Rajesh Mehta",
    department: "General Medicine",
    qualification: "MBBS, MD",
    experience: "12 Years",
    room: "Room 101",
    status: "Available",
    queue: 4,
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    department: "Cardiology",
    qualification: "MBBS, MD, DM",
    experience: "15 Years",
    room: "Room 203",
    status: "Available",
    queue: 7,
  },
  {
    id: 3,
    name: "Dr. Amit Verma",
    department: "Orthopedics",
    qualification: "MBBS, MS",
    experience: "10 Years",
    room: "Room 105",
    status: "Busy",
    queue: 12,
  },
  {
    id: 4,
    name: "Dr. Neha Gupta",
    department: "Pediatrics",
    qualification: "MBBS, MD",
    experience: "8 Years",
    room: "Room 202",
    status: "Available",
    queue: 3,
  },
];

const departments = [
  "All Departments",
  "General Medicine",
  "Cardiology",
  "Orthopedics",
  "Pediatrics",
];

const timeSlots = [
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
];

const queuePatients = [
  {
    token: "P-014",
    name: "Ramesh Singh",
    status: "NOW",
  },
  {
    token: "P-015",
    name: "Priya Sharma",
    status: "WAITING",
  },
  {
    token: "P-016",
    name: "Sohan Lal",
    status: "WAITING",
  },
  {
    token: "P-017",
    name: "Neha Verma",
    status: "WAITING",
  },
];

function DoctorAppointment() {
  const [department, setDepartment] =
    useState("All Departments");

  const [selectedDoctor, setSelectedDoctor] =
    useState(null);

  const [selectedDate, setSelectedDate] =
    useState("Today");

  const [selectedTime, setSelectedTime] =
    useState("");

  const [search, setSearch] = useState("");

  const [showSuccess, setShowSuccess] =
    useState(false);

  const [token, setToken] =
    useState("");

  /* -------------------------------------------------------
     FILTER DOCTORS
  ------------------------------------------------------- */

  const filteredDoctors = doctors.filter((doctor) => {
    const departmentMatch =
      department === "All Departments" ||
      doctor.department === department;

    const searchMatch =
      doctor.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      doctor.department
        .toLowerCase()
        .includes(search.toLowerCase());

    return departmentMatch && searchMatch;
  });

  /* -------------------------------------------------------
     SELECT DOCTOR
  ------------------------------------------------------- */

  const handleDoctorSelect = (doctor) => {
    if (doctor.status === "Busy") {
      return;
    }

    setSelectedDoctor(doctor);
    setSelectedTime("");
  };

  /* -------------------------------------------------------
     CONFIRM APPOINTMENT
  ------------------------------------------------------- */

  const handleConfirm = () => {
    if (!selectedDoctor) {
      alert("Please select a doctor.");
      return;
    }

    if (!selectedTime) {
      alert("Please select an available time slot.");
      return;
    }

    const newToken =
      "P-" + Math.floor(100 + Math.random() * 900);

    setToken(newToken);
    setShowSuccess(true);
  };

  /* -------------------------------------------------------
     CANCEL
  ------------------------------------------------------- */

  const handleCancel = () => {
    setSelectedDoctor(null);
    setSelectedTime("");
    setShowSuccess(false);
    setToken("");
  };

  /* -------------------------------------------------------
     BACK
  ------------------------------------------------------- */

  const handleBack = () => {
    window.history.back();
  };

  /* -------------------------------------------------------
     NEXT
  ------------------------------------------------------- */

  const handleNext = () => {
    handleConfirm();
  };

  return (
    <div className="doctor-appointment-page">

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="da-header">

        <div className="da-brand">

          <div className="da-logo">
            +
          </div>

          <div className="da-brand-text">
            <h1>
              MEDIBRIDGE <span>AI</span>
            </h1>

            <p>
              Your AI Health Assistant
            </p>
          </div>

        </div>


        <div className="da-header-right">

          <div className="da-language">

            <span className="globe">
              🌐
            </span>

            <div>
              <small>Language</small>
              <strong>English</strong>
            </div>

            <span className="down-arrow">
              ▼
            </span>

          </div>


          <div className="da-live">

            <span className="live-dot">
              ●
            </span>

            <div>
              <strong>
                KIOSK ONLINE
              </strong>

              <small>
                Doctor Appointment
              </small>
            </div>

          </div>

        </div>

      </header>


      {/* ===================================================
          TITLE
      =================================================== */}

      <section className="da-title">

        <div>

          <div className="da-breadcrumb">
            HOME <span>›</span> DOCTOR APPOINTMENT
          </div>

          <h2>
            BOOK YOUR
            <span> DOCTOR APPOINTMENT</span>
          </h2>

          <p>
            Select your doctor, date and convenient time
          </p>

        </div>


        <div className="da-title-icon">
          🩺
        </div>

      </section>


      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <main className="da-main">

        {/* =================================================
            LEFT
        ================================================= */}

        <section className="da-left">

          {/* SEARCH */}

          <div className="da-controls">

            <div className="da-search">

              <span>
                🔍
              </span>

              <input
                type="text"
                placeholder="Search doctor or department..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            <select
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
              className="da-department-select"
            >

              {departments.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}

            </select>

          </div>


          {/* DEPARTMENT BUTTONS */}

          <div className="da-department-buttons">

            {departments.slice(1).map((item) => (

              <button
                key={item}
                className={
                  department === item
                    ? "da-department-btn active"
                    : "da-department-btn"
                }
                onClick={() =>
                  setDepartment(item)
                }
              >
                {item}
              </button>

            ))}

          </div>


          {/* DOCTOR HEADING */}

          <div className="da-section-title">

            <div className="da-section-left">

              <div className="da-section-icon">
                👨‍⚕️
              </div>

              <div>
                <h3>
                  SELECT DOCTOR
                </h3>

                <p>
                  Choose an available doctor
                </p>
              </div>

            </div>


            <div className="da-live-availability">
              ● LIVE AVAILABILITY
            </div>

          </div>


          {/* DOCTORS */}

          <div className="da-doctor-grid">

            {filteredDoctors.length > 0 ? (

              filteredDoctors.map((doctor) => (

                <div
                  key={doctor.id}
                  className={`
                    da-doctor-card
                    ${
                      selectedDoctor?.id === doctor.id
                        ? "selected"
                        : ""
                    }
                    ${
                      doctor.status === "Busy"
                        ? "busy"
                        : ""
                    }
                  `}
                  onClick={() =>
                    handleDoctorSelect(doctor)
                  }
                >

                  <div className="da-doctor-top">

                    <div className="da-doctor-avatar">
                      👨‍⚕️
                    </div>

                    <div
                      className={
                        doctor.status === "Available"
                          ? "da-status available"
                          : "da-status busy-status"
                      }
                    >
                      ● {doctor.status}
                    </div>

                  </div>


                  <h3>
                    {doctor.name}
                  </h3>

                  <p className="da-doctor-department">
                    {doctor.department}
                  </p>

                  <p className="da-doctor-qualification">
                    {doctor.qualification}
                  </p>


                  <div className="da-doctor-details">

                    <span>
                      🕐 {doctor.experience}
                    </span>

                    <span>
                      🚪 {doctor.room}
                    </span>

                  </div>


                  <div className="da-doctor-queue">

                    <span>
                      👥 {doctor.queue} patients waiting
                    </span>

                    <span>
                      →
                    </span>

                  </div>


                  {doctor.status === "Busy" && (
                    <div className="da-busy-message">
                      CURRENTLY BUSY
                    </div>
                  )}


                  {selectedDoctor?.id === doctor.id && (
                    <div className="da-selected-check">
                      ✓
                    </div>
                  )}

                </div>

              ))

            ) : (

              <div className="da-no-doctor">
                No doctor found.
              </div>

            )}

          </div>


          {/* =================================================
              DATE
          ================================================= */}

          <div className="da-sub-section">

            <div className="da-section-title">

              <div className="da-section-left">

                <div className="da-section-icon">
                  📅
                </div>

                <div>
                  <h3>
                    SELECT DATE
                  </h3>

                  <p>
                    Choose your appointment date
                  </p>
                </div>

              </div>

            </div>


            <div className="da-date-grid">

              <button
                className={
                  selectedDate === "Today"
                    ? "da-date-card selected"
                    : "da-date-card"
                }
                onClick={() =>
                  setSelectedDate("Today")
                }
              >
                <small>
                  TODAY
                </small>

                <strong>
                  27
                </strong>

                <span>
                  SEP
                </span>
              </button>


              <button
                className={
                  selectedDate === "Tomorrow"
                    ? "da-date-card selected"
                    : "da-date-card"
                }
                onClick={() =>
                  setSelectedDate("Tomorrow")
                }
              >
                <small>
                  TOMORROW
                </small>

                <strong>
                  28
                </strong>

                <span>
                  SEP
                </span>
              </button>


              <button
                className={
                  selectedDate === "29 Sep"
                    ? "da-date-card selected"
                    : "da-date-card"
                }
                onClick={() =>
                  setSelectedDate("29 Sep")
                }
              >
                <small>
                  TUESDAY
                </small>

                <strong>
                  29
                </strong>

                <span>
                  SEP
                </span>
              </button>


              <button
                className={
                  selectedDate === "30 Sep"
                    ? "da-date-card selected"
                    : "da-date-card"
                }
                onClick={() =>
                  setSelectedDate("30 Sep")
                }
              >
                <small>
                  WEDNESDAY
                </small>

                <strong>
                  30
                </strong>

                <span>
                  SEP
                </span>
              </button>

            </div>

          </div>


          {/* =================================================
              TIME
          ================================================= */}

          <div className="da-sub-section">

            <div className="da-section-title">

              <div className="da-section-left">

                <div className="da-section-icon">
                  🕐
                </div>

                <div>
                  <h3>
                    SELECT TIME
                  </h3>

                  <p>
                    Available appointment slots
                  </p>
                </div>

              </div>

            </div>


            <div className="da-time-grid">

              {timeSlots.map((time, index) => {

                const available =
                  index !== 4 &&
                  index !== 8;

                return (

                  <button
                    key={time}
                    disabled={!available}
                    className={`
                      da-time-btn
                      ${
                        selectedTime === time
                          ? "selected"
                          : ""
                      }
                      ${
                        !available
                          ? "not-available"
                          : ""
                      }
                    `}
                    onClick={() => {
                      if (available) {
                        setSelectedTime(time);
                      }
                    }}
                  >

                    🕐 {time}

                    {!available && (
                      <small>
                        FULL
                      </small>
                    )}

                  </button>

                );

              })}

            </div>

          </div>

        </section>


        {/* =================================================
            RIGHT SIDEBAR
        ================================================= */}

        <aside className="da-right">


          {/* SELECTED DOCTOR */}

          <div className="da-panel">

            <div className="da-panel-header red-header">
              👨‍⚕️ SELECTED DOCTOR
            </div>


            {selectedDoctor ? (

              <div className="da-selected-doctor">

                <div className="da-large-avatar">
                  👨‍⚕️
                </div>

                <h3>
                  {selectedDoctor.name}
                </h3>

                <p>
                  {selectedDoctor.department}
                </p>

                <div className="da-available-label">
                  ● AVAILABLE
                </div>


                <div className="da-info-row">
                  <span>
                    Qualification
                  </span>

                  <strong>
                    {selectedDoctor.qualification}
                  </strong>
                </div>


                <div className="da-info-row">
                  <span>
                    Experience
                  </span>

                  <strong>
                    {selectedDoctor.experience}
                  </strong>
                </div>


                <div className="da-info-row">
                  <span>
                    Room
                  </span>

                  <strong>
                    {selectedDoctor.room}
                  </strong>
                </div>

              </div>

            ) : (

              <div className="da-empty-doctor">

                <div>
                  👨‍⚕️
                </div>

                <p>
                  Select a doctor
                  <br />
                  to continue
                </p>

              </div>

            )}

          </div>


          {/* SUMMARY */}

          <div className="da-panel">

            <div className="da-panel-header blue-header">
              📋 APPOINTMENT SUMMARY
            </div>


            <div className="da-summary-row">

              <span>
                Doctor
              </span>

              <strong>
                {selectedDoctor
                  ? selectedDoctor.name
                  : "--"}
              </strong>

            </div>


            <div className="da-summary-row">

              <span>
                Department
              </span>

              <strong>
                {selectedDoctor
                  ? selectedDoctor.department
                  : "--"}
              </strong>

            </div>


            <div className="da-summary-row">

              <span>
                Date
              </span>

              <strong>
                {selectedDate}
              </strong>

            </div>


            <div className="da-summary-row">

              <span>
                Time
              </span>

              <strong>
                {selectedTime || "--"}
              </strong>

            </div>


            <button
              className="da-confirm-button"
              onClick={handleConfirm}
            >
              ✓ CONFIRM APPOINTMENT
            </button>

          </div>


          {/* LIVE QUEUE */}

          <div className="da-panel">

            <div className="da-panel-header queue-header">

              👥 LIVE QUEUE

              <span>
                ● LIVE
              </span>

            </div>


            <div className="da-current-token">

              <small>
                NOW SERVING
              </small>

              <strong>
                P-014
              </strong>

              <p>
                Dr. Rajesh Mehta
              </p>

            </div>


            <div className="da-queue-list">

              {queuePatients.map((patient) => (

                <div
                  key={patient.token}
                  className="da-queue-row"
                >

                  <strong>
                    {patient.token}
                  </strong>

                  <span>
                    {patient.name}
                  </span>

                  <small
                    className={
                      patient.status === "NOW"
                        ? "now"
                        : "waiting"
                    }
                  >
                    {patient.status}
                  </small>

                </div>

              ))}

            </div>


            <button
              className="da-view-queue"
              onClick={() =>
                alert("Live queue screen will open here.")
              }
            >
              VIEW FULL LIVE QUEUE →
            </button>

          </div>

        </aside>

      </main>


      {/* ===================================================
          SUCCESS POPUP
      =================================================== */}

      {showSuccess && (

        <div className="da-modal-overlay">

          <div className="da-success-modal">

            <div className="da-success-icon">
              ✓
            </div>

            <h2>
              APPOINTMENT CONFIRMED
            </h2>

            <p>
              Your appointment has been successfully booked.
            </p>


            <div className="da-token-box">

              <small>
                YOUR TOKEN NUMBER
              </small>

              <strong>
                {token}
              </strong>

            </div>


            <div className="da-confirmation-details">

              <p>
                👨‍⚕️ {selectedDoctor?.name}
              </p>

              <p>
                📅 {selectedDate}
              </p>

              <p>
                🕐 {selectedTime}
              </p>

            </div>


            <button
              className="da-done-button"
              onClick={() =>
                setShowSuccess(false)
              }
            >
              DONE
            </button>

          </div>

        </div>

      )}


      {/* ===================================================
          BOTTOM NAVIGATION
      =================================================== */}

      <div className="da-navigation">

        <button
          className="da-nav-button back"
          onClick={handleBack}
        >
          ← BACK
        </button>


        <button
          className="da-nav-button cancel"
          onClick={handleCancel}
        >
          ✕ CANCEL
        </button>


       <button
  className="next-btn"
  onClick={() => window.location.assign("/live-queue")}
>
  NEXT →
</button>
      </div>


      {/* ===================================================
          FOOTER
      =================================================== */}

      <footer className="da-footer">

        <div>
          🔊
          <span>
            Need Help? Press the button to hear instructions.
          </span>
        </div>

        <button
          onClick={() =>
            alert("Playing instructions...")
          }
        >
          🔊
        </button>

      </footer>

    </div>
  );
}

export default DoctorAppointment;