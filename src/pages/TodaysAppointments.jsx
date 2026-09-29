import React, { useState } from "react";
import "../css/TodaysAppointments.css";

function TodaysAppointments() {

  const [search, setSearch] = useState("");

  const appointments = [
    {
      id: 1,
      time: "09:30 AM",
      doctor: "Dr. Rajesh Mehta",
      department: "General Medicine",
      token: "P-014",
      room: "101",
      status: "Completed"
    },
    {
      id: 2,
      time: "10:15 AM",
      doctor: "Dr. Priya Sharma",
      department: "Cardiology",
      token: "P-017",
      room: "203",
      status: "In Queue"
    },
    {
      id: 3,
      time: "11:00 AM",
      doctor: "Dr. Amit Verma",
      department: "Orthopedics",
      token: "P-018",
      room: "105",
      status: "Upcoming"
    },
    {
      id: 4,
      time: "12:30 PM",
      doctor: "Dr. Neha Gupta",
      department: "Pediatrics",
      token: "P-019",
      room: "202",
      status: "Upcoming"
    },
    {
      id: 5,
      time: "02:00 PM",
      doctor: "Dr. Arjun Kapoor",
      department: "Dermatology",
      token: "P-020",
      room: "108",
      status: "Upcoming"
    },
    {
      id: 6,
      time: "03:30 PM",
      doctor: "Dr. Anjali Singh",
      department: "Gynecology",
      token: "P-021",
      room: "205",
      status: "Upcoming"
    }
  ];

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.doctor
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    appointment.department
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    appointment.token
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleBack = () => {
    window.history.back();
  };

  const handleHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="today-page">

      {/* ================= HEADER ================= */}

      <header className="today-header">

        <div className="today-brand">

          <div className="today-logo">
            ✚
          </div>

          <div>
            <h1>
              MEDIBRIDGE <span>AI</span>
            </h1>

            <p>
              SMART HEALTHCARE KIOSK
            </p>
          </div>

        </div>


        <div className="today-status">

          <span className="online-dot"></span>

          SYSTEM ONLINE

        </div>

      </header>


      {/* ================= TITLE ================= */}

      <section className="today-title">

        <div className="calendar-big">
          📅
        </div>

        <div>

          <h2>
            TODAY'S APPOINTMENTS
          </h2>

          <p>
            Your scheduled appointments for today
          </p>

        </div>

      </section>


      {/* ================= DATE BAR ================= */}

      <div className="date-bar">

        <div>
          <span className="date-icon">📅</span>

          <div>
            <small>DATE</small>
            <strong>27 September 2026</strong>
          </div>
        </div>


        <div className="appointment-count">

          <strong>
            {appointments.length}
          </strong>

          <span>
            Appointments
          </span>

        </div>

      </div>


      {/* ================= SEARCH ================= */}

      <div className="today-search">

        <span>🔍</span>

        <input
          type="text"
          placeholder="Search doctor, department or token..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>


      {/* ================= APPOINTMENTS ================= */}

      <main className="today-list">

        <div className="list-heading">

          <span>TIME</span>
          <span>DOCTOR</span>
          <span>DEPARTMENT</span>
          <span>TOKEN</span>
          <span>ROOM</span>
          <span>STATUS</span>

        </div>


        {filteredAppointments.length > 0 ? (

          filteredAppointments.map((appointment) => (

            <div
              className="appointment-card"
              key={appointment.id}
            >

              {/* TIME */}

              <div className="appointment-time">

                <span className="clock-icon">
                  ◷
                </span>

                <strong>
                  {appointment.time}
                </strong>

              </div>


              {/* DOCTOR */}

              <div className="doctor-info">

                <div className="doctor-avatar">
                  👨‍⚕️
                </div>

                <div>

                  <strong>
                    {appointment.doctor}
                  </strong>

                  <small>
                    Doctor
                  </small>

                </div>

              </div>


              {/* DEPARTMENT */}

              <div className="department">

                {appointment.department}

              </div>


              {/* TOKEN */}

              <div className="token">

                {appointment.token}

              </div>


              {/* ROOM */}

              <div className="room">

                Room {appointment.room}

              </div>


              {/* STATUS */}

              <div>

                <span
                  className={`appointment-status ${
                    appointment.status
                      .toLowerCase()
                      .replace(" ", "-")
                  }`}
                >
                  {appointment.status}
                </span>

              </div>

            </div>

          ))

        ) : (

          <div className="no-results">

            <span>🔍</span>

            <h3>
              No appointments found
            </h3>

            <p>
              Try another doctor, department or token.
            </p>

          </div>

        )}

      </main>


      {/* ================= LEGEND ================= */}

      <div className="status-legend">

        <div>
          <span className="legend-dot completed-dot"></span>
          Completed
        </div>

        <div>
          <span className="legend-dot queue-dot"></span>
          In Queue
        </div>

        <div>
          <span className="legend-dot upcoming-dot"></span>
          Upcoming
        </div>

      </div>


      {/* ================= BUTTONS ================= */}

      <div className="today-buttons">

        <button
          className="today-back"
          onClick={handleBack}
        >
          ← BACK
        </button>


        <button
          className="today-home"
          onClick={handleHome}
        >
          🏠 HOME
        </button>

      </div>


      {/* ================= FOOTER ================= */}

      <footer className="today-footer">

        <span>
          🔊 Need Help? Press the help button for instructions.
        </span>

        <button>
          🆘 HELP
        </button>

      </footer>

    </div>
  );
}

export default TodaysAppointments;