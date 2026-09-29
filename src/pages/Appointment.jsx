import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Appointment.css";

const appointmentsData = [
  {
    id: 1,
    patient: "Rahul Kumar",
    doctor: "Dr. Rahul Sharma",
    date: "27 Sep 2026",
    time: "10:00 AM",
    type: "General Checkup",
    status: "CONFIRMED",
  },
  {
    id: 2,
    patient: "Priya Singh",
    doctor: "Dr. Priya Verma",
    date: "27 Sep 2026",
    time: "11:30 AM",
    type: "Skin Consultation",
    status: "PENDING",
  },
  {
    id: 3,
    patient: "Amit Rawat",
    doctor: "Dr. Amit Singh",
    date: "28 Sep 2026",
    time: "09:30 AM",
    type: "Neurology",
    status: "CONFIRMED",
  },
  {
    id: 4,
    patient: "Neha Sharma",
    doctor: "Dr. Neha Kapoor",
    date: "28 Sep 2026",
    time: "02:00 PM",
    type: "Child Checkup",
    status: "CANCELLED",
  },
];

function Appointment() {
  const navigate = useNavigate();

  const [appointments, setAppointments] =
    useState(appointmentsData);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [selectedAppointment, setSelectedAppointment] =
    useState(null);

  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    date: "",
    time: "",
    type: "",
  });

  const filteredAppointments = appointments.filter((appointment) =>
    `${appointment.patient} ${appointment.doctor} ${appointment.type}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addAppointment = (e) => {
    e.preventDefault();

    const newAppointment = {
      id: appointments.length + 1,
      patient: formData.patient,
      doctor: formData.doctor,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      status: "PENDING",
    };

    setAppointments([
      ...appointments,
      newAppointment,
    ]);

    setFormData({
      patient: "",
      doctor: "",
      date: "",
      time: "",
      type: "",
    });

    setShowModal(false);
  };

  return (
    <div className="appointment-page">

      {/* ================= HEADER ================= */}

      <div className="appointment-page-header">

        <div className="appointment-header-left">

          <button
            className="back-dashboard-btn"
            onClick={() => navigate("/")}
          >
            ← Back to Dashboard
          </button>

          <div>
            <div className="breadcrumb">
              Dashboard <span>›</span> Appointments
            </div>

            <h1>Appointments</h1>

            <p>
              Manage patient appointments and schedules
            </p>
          </div>

        </div>

        <button
          className="add-appointment-btn"
          onClick={() => setShowModal(true)}
        >
          <span>+</span>
          Add Appointment
        </button>

      </div>


      {/* ================= STATS ================= */}

      <div className="appointment-stats">

        <div className="appointment-stat-card">

          <div className="appointment-stat-icon blue">
            📅
          </div>

          <div>
            <span>Total Appointments</span>

            <strong>
              {appointments.length}
            </strong>

            <small>All appointments</small>
          </div>

        </div>


        <div className="appointment-stat-card">

          <div className="appointment-stat-icon green">
            ✓
          </div>

          <div>
            <span>Confirmed</span>

            <strong>
              {
                appointments.filter(
                  (a) => a.status === "CONFIRMED"
                ).length
              }
            </strong>

            <small>Confirmed appointments</small>
          </div>

        </div>


        <div className="appointment-stat-card">

          <div className="appointment-stat-icon orange">
            ⏳
          </div>

          <div>
            <span>Pending</span>

            <strong>
              {
                appointments.filter(
                  (a) => a.status === "PENDING"
                ).length
              }
            </strong>

            <small>Waiting for confirmation</small>
          </div>

        </div>


        <div className="appointment-stat-card">

          <div className="appointment-stat-icon purple">
            🩺
          </div>

          <div>
            <span>Today</span>

            <strong>2</strong>

            <small>Today's appointments</small>
          </div>

        </div>

      </div>


      {/* ================= MAIN CARD ================= */}

      <div className="appointment-main-card">

        {/* TOOLBAR */}

        <div className="appointment-toolbar">

          <div className="appointment-title">

            <div className="appointment-title-icon">
              📅
            </div>

            <div>
              <h2>Appointment Schedule</h2>

              <p>
                View and manage all appointments
              </p>
            </div>

          </div>


          <div className="appointment-tools">

            <div className="appointment-search-box">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search patient or doctor..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            <button className="filter-appointment-btn">
              ⚙ Filter
            </button>

            <button className="export-appointment-btn">
              ↓ Export
            </button>

          </div>

        </div>


        {/* ================= TABLE ================= */}

        <div className="appointment-table-container">

          <table className="appointment-table">

            <thead>

              <tr>
                <th>APPOINTMENT</th>
                <th>PATIENT</th>
                <th>DOCTOR</th>
                <th>DATE</th>
                <th>TIME</th>
                <th>TYPE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>

            </thead>


            <tbody>

              {filteredAppointments.length > 0 ? (

                filteredAppointments.map(
                  (appointment) => (

                    <tr key={appointment.id}>

                      <td>

                        <span className="appointment-id">
                          APT-
                          {String(
                            appointment.id
                          ).padStart(3, "0")}
                        </span>

                      </td>


                      <td>

                        <div className="appointment-patient-cell">

                          <div className="appointment-avatar">
                            👤
                          </div>

                          <strong>
                            {appointment.patient}
                          </strong>

                        </div>

                      </td>


                      <td>

                        <div className="appointment-doctor-cell">

                          <div className="doctor-mini-avatar">
                            👨‍⚕️
                          </div>

                          <span>
                            {appointment.doctor}
                          </span>

                        </div>

                      </td>


                      <td>
                        <span className="appointment-date">
                          {appointment.date}
                        </span>
                      </td>


                      <td>
                        <span className="appointment-time">
                          {appointment.time}
                        </span>
                      </td>


                      <td>

                        <span className="appointment-type">
                          {appointment.type}
                        </span>

                      </td>


                      <td>

                        <span
                          className={`appointment-status ${appointment.status.toLowerCase()}`}
                        >
                          {appointment.status}
                        </span>

                      </td>


                      <td>

                        <div className="appointment-action-buttons">

                          <button
                            className="view-appointment"
                            onClick={() =>
                              setSelectedAppointment(
                                appointment
                              )
                            }
                          >
                            👁
                          </button>

                          <button className="edit-appointment">
                            ✎
                          </button>

                          <button className="more-appointment">
                            ⋮
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="no-appointments"
                  >

                    <div>📅</div>

                    <h3>
                      No Appointments Found
                    </h3>

                    <p>
                      Try another search or add a
                      new appointment.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* ================= FOOTER ================= */}

        <div className="appointment-table-footer">

          <span>
            Showing{" "}
            <strong>
              {filteredAppointments.length}
            </strong>{" "}
            appointments
          </span>

          <div className="pagination">

            <button>‹</button>

            <button className="page-active">
              1
            </button>

            <button>2</button>

            <button>3</button>

            <button>›</button>

          </div>

        </div>

      </div>


      {/* ================= ADD APPOINTMENT MODAL ================= */}

      {showModal && (

        <div
          className="appointment-modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="appointment-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="appointment-modal-header">

              <div>

                <h2>
                  Add New Appointment
                </h2>

                <p>
                  Enter appointment information
                </p>

              </div>

              <button
                className="close-appointment-modal"
                onClick={() =>
                  setShowModal(false)
                }
              >
                ×
              </button>

            </div>


            <form onSubmit={addAppointment}>

              <div className="appointment-form-grid">

                <div className="appointment-form-group">

                  <label>
                    Patient Name
                  </label>

                  <input
                    name="patient"
                    value={formData.patient}
                    onChange={handleInputChange}
                    placeholder="Enter patient name"
                    required
                  />

                </div>


                <div className="appointment-form-group">

                  <label>
                    Doctor
                  </label>

                  <select
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleInputChange}
                    required
                  >

                    <option value="">
                      Select doctor
                    </option>

                    <option>
                      Dr. Rahul Sharma
                    </option>

                    <option>
                      Dr. Priya Verma
                    </option>

                    <option>
                      Dr. Amit Singh
                    </option>

                    <option>
                      Dr. Neha Kapoor
                    </option>

                  </select>

                </div>


                <div className="appointment-form-group">

                  <label>
                    Appointment Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />

                </div>


                <div className="appointment-form-group">

                  <label>
                    Appointment Time
                  </label>

                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />

                </div>


                <div className="appointment-form-group appointment-full">

                  <label>
                    Appointment Type
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >

                    <option value="">
                      Select appointment type
                    </option>

                    <option>
                      General Checkup
                    </option>

                    <option>
                      Follow Up
                    </option>

                    <option>
                      Consultation
                    </option>

                    <option>
                      Emergency
                    </option>

                    <option>
                      Medical Test
                    </option>

                  </select>

                </div>

              </div>


              <div className="appointment-modal-actions">

                <button
                  type="button"
                  className="cancel-appointment-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-appointment-btn"
                >
                  Add Appointment
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* ================= VIEW MODAL ================= */}

      {selectedAppointment && (

        <div
          className="appointment-modal-overlay"
          onClick={() =>
            setSelectedAppointment(null)
          }
        >

          <div
            className="appointment-detail-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="close-appointment-detail"
              onClick={() =>
                setSelectedAppointment(null)
              }
            >
              ×
            </button>


            <div className="appointment-detail-profile">

              <div className="appointment-detail-avatar">
                📅
              </div>

              <div>

                <h2>
                  Appointment #
                  {selectedAppointment.id}
                </h2>

                <p>
                  {selectedAppointment.type}
                </p>

              </div>

            </div>


            <div className="appointment-detail-grid">

              <div>
                <span>Patient</span>

                <strong>
                  {selectedAppointment.patient}
                </strong>
              </div>


              <div>
                <span>Doctor</span>

                <strong>
                  {selectedAppointment.doctor}
                </strong>
              </div>


              <div>
                <span>Date</span>

                <strong>
                  {selectedAppointment.date}
                </strong>
              </div>


              <div>
                <span>Time</span>

                <strong>
                  {selectedAppointment.time}
                </strong>
              </div>


              <div>
                <span>Type</span>

                <strong>
                  {selectedAppointment.type}
                </strong>
              </div>


              <div>
                <span>Status</span>

                <strong>
                  {selectedAppointment.status}
                </strong>
              </div>

            </div>


            <div className="appointment-detail-actions">

              <button
                onClick={() =>
                  setSelectedAppointment(null)
                }
              >
                Close
              </button>

              <button>
                View Patient
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Appointment;
