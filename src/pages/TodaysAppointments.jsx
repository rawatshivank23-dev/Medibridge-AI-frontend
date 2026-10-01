import React, { useEffect, useState } from "react";
import "../css/TodaysAppointments.css";
import API from "../services/Api";

function TodaysAppointments() {

  const [search, setSearch] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH APPOINTMENTS =================

  useEffect(() => {

    API.get("/appointments")
      .then((response) => {

        console.log("Appointments from backend:", response.data);

        setAppointments(response.data);

      })
      .catch((error) => {

        console.error("Error fetching appointments:", error);

        setError("Unable to load appointments.");

      })
      .finally(() => {

        setLoading(false);

      });

  }, []);


  // ================= SEARCH =================

  const filteredAppointments = appointments.filter((appointment) => {

    const doctorName = appointment.doctor?.name || "";
    const token = appointment.queueNumber?.toString() || "";

    return (
      doctorName.toLowerCase().includes(search.toLowerCase()) ||
      token.toLowerCase().includes(search.toLowerCase())
    );

  });


  // ================= BUTTONS =================

  const handleBack = () => {
    window.history.back();
  };


  const handleHome = () => {
    window.location.href = "/";
  };


  // ================= LOADING =================

  if (loading) {

    return (
      <div className="today-page">

        <div className="no-results">

          <span>⏳</span>

          <h3>
            Loading appointments...
          </h3>

          <p>
            Please wait while we fetch your appointments.
          </p>

        </div>

      </div>
    );

  }


  // ================= ERROR =================

  if (error) {

    return (
      <div className="today-page">

        <div className="no-results">

          <span>⚠️</span>

          <h3>
            {error}
          </h3>

          <p>
            Please try again later.
          </p>

        </div>

      </div>
    );

  }


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

          <span className="date-icon">
            📅
          </span>

          <div>

            <small>
              DATE
            </small>

            <strong>
              {new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric"
              })}
            </strong>

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

        <span>
          🔍
        </span>

        <input
          type="text"
          placeholder="Search doctor or token..."
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
                  {appointment.appointmentTime || "N/A"}
                </strong>

              </div>


              {/* DOCTOR */}

              <div className="doctor-info">

                <div className="doctor-avatar">
                  👨‍⚕️
                </div>

                <div>

                  <strong>
                    {appointment.doctor?.name || "Unknown Doctor"}
                  </strong>

                  <small>
                    Doctor
                  </small>

                </div>

              </div>


              {/* DEPARTMENT */}

              <div className="department">

                {appointment.doctor?.specialization || "N/A"}

              </div>


              {/* TOKEN */}

              <div className="token">

                {appointment.queueNumber
                  ? `P-${String(appointment.queueNumber).padStart(3, "0")}`
                  : "N/A"
                }

              </div>


              {/* ROOM */}

              <div className="room">

                N/A

              </div>


              {/* STATUS */}

              <div>

                <span
                  className={`appointment-status ${
                    appointment.status
                      ? appointment.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                      : ""
                  }`}
                >

                  {appointment.status || "Upcoming"}

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
              {appointments.length === 0
                ? "There are no appointments available."
                : "Try another doctor or token."
              }
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