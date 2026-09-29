import React, { useState } from "react";
import "../css/Dashboard.css";

const appointmentsData = [
  { time: "09:00 AM", name: "Rohan Singh", purpose: "General Checkup", status: "Completed" },
  { time: "09:30 AM", name: "Priya Sharma", purpose: "Follow Up", status: "Completed" },
  { time: "10:00 AM", name: "Amit Verma", purpose: "Fever", status: "In Progress" },
  { time: "10:30 AM", name: "Neha Gupta", purpose: "Consultation", status: "Waiting" },
  { time: "11:00 AM", name: "Suresh Kumar", purpose: "Diabetes Checkup", status: "Waiting" },
  { time: "11:30 AM", name: "Pooja Patel", purpose: "Follow Up", status: "Waiting" },
];

const queueData = [
  { id: 1, name: "Amit Verma", token: "Q-05", status: "In Room" },
  { id: 2, name: "Neha Gupta", token: "Q-06", status: "Waiting" },
  { id: 3, name: "Suresh Kumar", token: "Q-07", status: "Waiting" },
  { id: 4, name: "Pooja Patel", token: "Q-08", status: "Waiting" },
  { id: 5, name: "Rajesh Yadav", token: "Q-09", status: "Waiting" },
];

const notifications = [
  {
    title: "New patient registration",
    text: "Rohan Mehta has been registered",
    time: "10:15 AM",
    type: "pink",
  },
  {
    title: "Appointment reminder",
    text: "Neha Gupta — 10:30 AM",
    time: "10:20 AM",
    type: "blue",
  },
  {
    title: "Prescription generated",
    text: "For Amit Verma",
    time: "09:45 AM",
    type: "green",
  },
  {
    title: "Billing update",
    text: "₹ 1,500 received from Suresh Kumar",
    time: "09:20 AM",
    type: "orange",
  },
];

function Dashboard() {
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const filteredAppointments = appointmentsData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="doctor-dashboard">

      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">✚</div>

          <div>
            <h1>
              Medi<span>Bridge</span> AI
            </h1>
            <p>Your Health, Our Bridge</p>
          </div>
        </div>

        <nav className="main-menu">

          {[
            ["▦", "Dashboard"],
            ["♙", "Patients"],
            ["▣", "Appointments"],
            ["◉", "Live Queue"],
            ["▤", "Medical Records"],
            ["💊", "Prescriptions"],
            ["₹", "Billing"],
            ["▧", "Reports"],
          ].map(([icon, name]) => (
            <button
              key={name}
              className={`menu-item ${activeMenu === name ? "active" : ""
                }`}
              onClick={() => setActiveMenu(name)}
            >
              <span className="menu-icon">{icon}</span>
              <span>{name}</span>
            </button>
          ))}

        </nav>

        <div className="sidebar-line"></div>

        <div className="quick-tools">

          <p className="quick-title">Quick Tools</p>

          <button className="tool-item">
            <span>⌕</span>
            Search Patient
          </button>

          <button className="tool-item">
            <span>＋</span>
            Add New Patient
          </button>

          <button className="tool-item emergency-tool">
            <span>●</span>
            Emergency / SOS
          </button>

        </div>

        <div className="sidebar-bottom">
          <div className="big-stethoscope">♧</div>

          <h2>
            Medi<span>Bridge</span> AI
          </h2>

          <p>Smarter Care, Better Tomorrow</p>

          <div className="heartbeat">
            〰〰〰〰〰〰〰
          </div>
        </div>

      </aside>


      {/* ================= MAIN ================= */}
      <main className="main-content">

        {/* TOP BAR */}
        <header className="topbar">

          <div className="global-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search patient by name, phone, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="top-right">

            <div className="date-time">
              <span className="calendar-icon">▣</span>
              <div>
                <strong>10 Sep 2025</strong>
                <small>10:42 AM</small>
              </div>
            </div>

            <div className="notification-bell">
              ♧
              <span>3</span>
            </div>

            <div className="doctor-mini">

              <div className="doctor-avatar">
                👨‍⚕️
              </div>

              <div>
                <strong>Dr. Rahul Sharma</strong>
                <small>General Physician</small>
              </div>

              <span className="down-arrow">⌄</span>

            </div>

          </div>

        </header>


        {/* CONTENT AREA */}
        <section className="dashboard-content">

          {/* ================= WELCOME ================= */}
          <div className="welcome-card">

            <div className="welcome-doctor">
              👨‍⚕️
            </div>

            <div className="welcome-text">
              <h2>Good Morning, Dr. Rahul Sharma</h2>
              <p>Make a difference in every life you touch</p>
            </div>

            <div className="welcome-medical">
              ♧
            </div>

          </div>


          {/* ================= STAT CARDS ================= */}
          <div className="stats-grid">

            <StatCard
              icon="👥"
              title="Total Patients"
              value="248"
              change="↑ 12% this week"
              type="blue"
            />

            <StatCard
              icon="▣"
              title="Today's Appointments"
              value="18"
              change="↑ 3% from yesterday"
              type="cyan"
            />

            <StatCard
              icon="♟"
              title="Live Queue"
              value="5"
              subtitle="Waiting for consultation"
              type="purple"
            />

            <StatCard
              icon="▤"
              title="Medical Records"
              value="156"
              change="↑ 8% this month"
              type="blue"
            />

          </div>


          <div className="stats-grid second-stats">

            <StatCard
              icon="💊"
              title="Prescriptions"
              value="138"
              change="↑ 10% this month"
              type="purple"
            />

            <StatCard
              icon="₹"
              title="Total Billing (Today)"
              value="₹ 28,500"
              change="↑ 15% from yesterday"
              type="cyan"
            />

            <StatCard
              icon="✓"
              title="Completed Appointments"
              value="12"
              change="↑ 20% this week"
              type="green"
            />

          </div>


          {/* ================= TWO COLUMN ================= */}
          <div className="middle-grid">

            <div className="left-column">

              {/* SEARCH PATIENT */}
              <div className="panel search-panel">

                <div className="panel-title">
                  <span className="title-icon">⌕</span>
                  <h3>Search Patient</h3>
                </div>

                <div className="patient-search">
                  <input
                    type="text"
                    placeholder="Enter patient name, phone number or ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <button>Search</button>
                </div>

              </div>


              {/* TODAY APPOINTMENTS */}
              <div className="panel appointments-panel">

                <div className="panel-header">
                  <div className="panel-title">
                    <span className="title-icon">▣</span>
                    <h3>Today's Appointments</h3>
                  </div>

                  <button className="view-all">
                    View All →
                  </button>
                </div>


                <div className="table-container">

                  <table>

                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Patient Name</th>
                        <th>Purpose</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>

                      {filteredAppointments.map((appointment, index) => (

                        <tr key={index}>

                          <td>{appointment.time}</td>

                          <td className="patient-name">
                            {appointment.name}
                          </td>

                          <td>
                            {appointment.purpose}
                          </td>

                          <td>
                            <StatusBadge status={appointment.status} />
                          </td>

                          <td>
                            <button className="view-button">
                              View
                            </button>
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

            </div>


            {/* ================= LIVE QUEUE ================= */}
            <div className="queue-column">

              <div className="panel queue-panel">

                <div className="panel-header">

                  <div className="panel-title">
                    <span className="title-icon">👥</span>
                    <h3>Live Queue</h3>
                  </div>

                  <button className="view-all">
                    View All →
                  </button>

                </div>


                <table className="queue-table">

                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Patient Name</th>
                      <th>Token</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {queueData.map((patient) => (

                      <tr key={patient.id}>

                        <td>{patient.id}</td>

                        <td className="patient-name">
                          {patient.name}
                        </td>

                        <td>{patient.token}</td>

                        <td>
                          <span
                            className={`queue-status ${patient.status === "In Room"
                                ? "room"
                                : "waiting"
                              }`}
                          >
                            {patient.status}
                          </span>
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>


              {/* NEXT PATIENT */}
              <div className="next-patient">

                <div className="next-arrow">
                  →
                </div>

                <div className="next-info">
                  <span>Next Patient</span>
                  <h3>Neha Gupta</h3>
                  <p>Token: Q-06</p>
                </div>

                <button className="consult-button">
                  Start Consultation
                </button>

              </div>

            </div>

          </div>


          {/* ================= BOTTOM MODULES ================= */}
          <div className="module-row">

            <ModuleCard
              icon="👥"
              title="Patients"
              text="Manage patient details"
            />

            <ModuleCard
              icon="▣"
              title="Appointments"
              text="Book & manage slots"
            />

            <ModuleCard
              icon="▤"
              title="Medical Records"
              text="View patient history"
            />

            <ModuleCard
              icon="💊"
              title="Prescriptions"
              text="Create & manage"
            />

            <ModuleCard
              icon="₹"
              title="Billing"
              text="Generate & track bills"
            />

          </div>

        </section>

      </main>


      {/* ================= RIGHT PANEL ================= */}
      <aside className="right-panel">

        {/* DOCTOR PROFILE */}
        <div className="right-card profile-card">

          <div className="profile-heading">

            <div className="profile-icon">
              ♧
            </div>

            <div>
              <h3>Dr. Rahul Sharma</h3>
              <p>General Physician</p>
            </div>

          </div>

          <div className="profile-details">

            <div>
              <span>Department</span>
              <strong>General Medicine</strong>
            </div>

            <div>
              <span>Experience</span>
              <strong>5+ Years</strong>
            </div>

            <div>
              <span>Consultation Fee</span>
              <strong>₹ 500</strong>
            </div>

          </div>

          <button className="profile-button">
            View Profile
          </button>

          <button className="settings-button">
            ⚙
          </button>

        </div>


        {/* QUICK ACTIONS */}
        <div className="right-card quick-actions">

          <h3>✣ &nbsp; Quick Actions</h3>

          <div className="action-grid">

            <ActionButton
              icon="+"
              text="Add Patient"
              type="green"
            />

            <ActionButton
              icon="▣"
              text="Create Appointment"
              type="purple"
            />

            <ActionButton
              icon="💊"
              text="Add Prescription"
              type="pink"
            />

            <ActionButton
              icon="▤"
              text="Create Medical Record"
              type="blue"
            />

            <ActionButton
              icon="₹"
              text="Generate Bill"
              type="orange"
            />

            <ActionButton
              icon="▥"
              text="View Reports"
              type="green"
            />

          </div>

        </div>


        {/* NOTIFICATIONS */}
        <div className="right-card notifications">

          <div className="notification-header">

            <h3>♧ &nbsp; Notifications</h3>

            <button>
              View All →
            </button>

          </div>


          {notifications.map((notification, index) => (

            <div className="notification-item" key={index}>

              <span
                className={`notification-dot ${notification.type}`}
              ></span>

              <div className="notification-content">

                <strong>
                  {notification.title}
                </strong>

                <p>
                  {notification.text}
                </p>

              </div>

              <time>
                {notification.time}
              </time>

            </div>

          ))}

        </div>

      </aside>


      {/* ================= FOOTER ================= */}
      <footer className="dashboard-footer">

        <div className="footer-brand">
          ♡ MediBridge AI
          <span>|</span>
          Connecting Patients & Doctors for a Healthier Tomorrow
        </div>

        <button className="footer-emergency">
          ⚠ Emergency / SOS
        </button>

        <div className="footer-navigation">

          <button className="back-btn">
            ← &nbsp; Back
          </button>

          <button className="next-btn">
            Next &nbsp; →
          </button>

          <button className="confirm-btn">
            Confirm ✓
          </button>

        </div>

      </footer>

    </div>
  );
}


/* ================= COMPONENTS ================= */

function StatCard({
  icon,
  title,
  value,
  change,
  subtitle,
  type,
}) {
  return (
    <div className="stat-card">

      <div className={`stat-icon ${type}`}>
        {icon}
      </div>

      <div className="stat-content">

        <p>{title}</p>

        <h2>{value}</h2>

        {change && (
          <span className="positive">
            {change}
          </span>
        )}

        {subtitle && (
          <span className="stat-subtitle">
            ♟ {subtitle}
          </span>
        )}

      </div>

    </div>
  );
}


function StatusBadge({ status }) {

  return (
    <span
      className={`status-badge ${status.toLowerCase().replace(" ", "-")
        }`}
    >
      {status}
    </span>
  );
}


function ModuleCard({ icon, title, text }) {

  return (
    <div className="module-card">

      <div className="module-icon">
        {icon}
      </div>

      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>

    </div>
  );
}


function ActionButton({ icon, text, type }) {

  return (
    <button className="action-button">

      <div className={`action-icon ${type}`}>
        {icon}
      </div>

      <span>{text}</span>

    </button>
  );
}

export default Dashboard;