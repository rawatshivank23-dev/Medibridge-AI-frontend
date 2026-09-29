import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Doctor.css";

const doctorsData = [
  {
    id: 1,
    name: "Dr. Rahul Sharma",
    email: "rahul@medibridge.com",
    phone: "+91 9876543210",
    specialization: "Cardiologist",
    experience: "12 Years",
    patients: 245,
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Priya Verma",
    email: "priya@medibridge.com",
    phone: "+91 9876543211",
    specialization: "Dermatologist",
    experience: "8 Years",
    patients: 180,
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Amit Singh",
    email: "amit@medibridge.com",
    phone: "+91 9876543212",
    specialization: "Neurologist",
    experience: "10 Years",
    patients: 210,
    status: "Active",
  },
  {
    id: 4,
    name: "Dr. Neha Kapoor",
    email: "neha@medibridge.com",
    phone: "+91 9876543213",
    specialization: "Pediatrician",
    experience: "6 Years",
    patients: 156,
    status: "Inactive",
  },
];

function Doctor() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState(doctorsData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
  });

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.name} ${doctor.specialization} ${doctor.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addDoctor = (e) => {
    e.preventDefault();

    const newDoctor = {
      id: doctors.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      specialization: formData.specialization,
      experience: formData.experience,
      patients: 0,
      status: "Active",
    };

    setDoctors([...doctors, newDoctor]);

    setFormData({
      name: "",
      email: "",
      phone: "",
      specialization: "",
      experience: "",
    });

    setShowModal(false);
  };

  const viewDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div className="doctor-page">

      {/* ================= HEADER ================= */}

      <div className="doctor-page-header">

        <div className="doctor-header-left">

          <button
            className="back-dashboard-btn"
            onClick={() => navigate("/")}
          >
            ← Back to Dashboard
          </button>

          <div>
            <div className="breadcrumb">
              Dashboard <span>›</span> Doctors
            </div>

            <h1>Doctors</h1>

            <p>
              Manage doctors, specialists and their information
            </p>
          </div>

        </div>

        <button
          className="add-doctor-btn"
          onClick={() => setShowModal(true)}
        >
          <span>+</span>
          Add Doctor
        </button>

      </div>


      {/* ================= STATS ================= */}

      <div className="doctor-stats">

        <div className="doctor-stat-card">
          <div className="doctor-stat-icon blue">👨‍⚕️</div>

          <div>
            <span>Total Doctors</span>
            <strong>{doctors.length}</strong>
            <small>Registered doctors</small>
          </div>
        </div>


        <div className="doctor-stat-card">
          <div className="doctor-stat-icon green">✓</div>

          <div>
            <span>Active Doctors</span>
            <strong>
              {doctors.filter((d) => d.status === "Active").length}
            </strong>
            <small>Currently available</small>
          </div>
        </div>


        <div className="doctor-stat-card">
          <div className="doctor-stat-icon purple">🩺</div>

          <div>
            <span>Specialists</span>
            <strong>
              {new Set(doctors.map((d) => d.specialization)).size}
            </strong>
            <small>Medical specialties</small>
          </div>
        </div>


        <div className="doctor-stat-card">
          <div className="doctor-stat-icon orange">👥</div>

          <div>
            <span>Total Patients</span>
            <strong>
              {doctors.reduce((sum, d) => sum + d.patients, 0)}
            </strong>
            <small>Patients handled</small>
          </div>
        </div>

      </div>


      {/* ================= MAIN CARD ================= */}

      <div className="doctor-main-card">

        {/* TOOLBAR */}

        <div className="doctor-toolbar">

          <div className="doctor-title">

            <div className="doctor-title-icon">
              👨‍⚕️
            </div>

            <div>
              <h2>Doctor Directory</h2>
              <p>View and manage all doctors</p>
            </div>

          </div>


          <div className="doctor-tools">

            <div className="doctor-search-box">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search doctor or specialization..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            <button className="filter-doctor-btn">
              ⚙ Filter
            </button>

            <button className="export-doctor-btn">
              ↓ Export
            </button>

          </div>

        </div>


        {/* TABLE */}

        <div className="doctor-table-container">

          <table className="doctor-table">

            <thead>
              <tr>
                <th>DOCTOR</th>
                <th>ID</th>
                <th>SPECIALIZATION</th>
                <th>EXPERIENCE</th>
                <th>PHONE</th>
                <th>PATIENTS</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>

              {filteredDoctors.length > 0 ? (

                filteredDoctors.map((doctor) => (

                  <tr key={doctor.id}>

                    <td>

                      <div className="doctor-name-cell">

                        <div className="doctor-avatar-small">
                          👨‍⚕️
                        </div>

                        <div>
                          <strong>{doctor.name}</strong>
                          <small>{doctor.email}</small>
                        </div>

                      </div>

                    </td>


                    <td>
                      <span className="doctor-id">
                        DOC-{String(doctor.id).padStart(3, "0")}
                      </span>
                    </td>


                    <td>
                      <span className="specialization">
                        {doctor.specialization}
                      </span>
                    </td>


                    <td className="experience">
                      {doctor.experience}
                    </td>


                    <td className="phone">
                      {doctor.phone}
                    </td>


                    <td>
                      <span className="patient-count">
                        {doctor.patients}
                      </span>
                    </td>


                    <td>

                      <span
                        className={
                          doctor.status === "Active"
                            ? "doctor-active-status"
                            : "doctor-inactive-status"
                        }
                      >
                        {doctor.status}
                      </span>

                    </td>


                    <td>

                      <div className="doctor-action-buttons">

                        <button
                          className="view-doctor"
                          onClick={() => viewDoctor(doctor)}
                        >
                          👁
                        </button>

                        <button className="edit-doctor">
                          ✎
                        </button>

                        <button className="more-doctor">
                          ⋮
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td
                    colSpan="8"
                    className="no-doctors"
                  >
                    <div>👨‍⚕️</div>
                    <h3>No Doctors Found</h3>
                    <p>
                      Try another search or add a new doctor.
                    </p>
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* FOOTER */}

        <div className="doctor-table-footer">

          <span>
            Showing <strong>{filteredDoctors.length}</strong> doctors
          </span>

          <div className="pagination">

            <button>‹</button>
            <button className="page-active">1</button>
            <button>2</button>
            <button>3</button>
            <button>›</button>

          </div>

        </div>

      </div>


      {/* ================= ADD DOCTOR MODAL ================= */}

      {showModal && (

        <div
          className="doctor-modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="doctor-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="doctor-modal-header">

              <div>
                <h2>Add New Doctor</h2>
                <p>Enter doctor information</p>
              </div>

              <button
                className="close-doctor-modal"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>


            <form onSubmit={addDoctor}>

              <div className="doctor-form-grid">

                <div className="doctor-form-group">
                  <label>Doctor Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter doctor name"
                    required
                  />
                </div>


                <div className="doctor-form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    required
                  />
                </div>


                <div className="doctor-form-group">
                  <label>Phone</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>


                <div className="doctor-form-group">
                  <label>Specialization</label>

                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    required
                  >

                    <option value="">
                      Select specialization
                    </option>

                    <option>Cardiologist</option>
                    <option>Dermatologist</option>
                    <option>Neurologist</option>
                    <option>Pediatrician</option>
                    <option>General Physician</option>
                    <option>Orthopedic</option>

                  </select>

                </div>


                <div className="doctor-form-group doctor-full">
                  <label>Experience</label>

                  <input
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Example: 5 Years"
                    required
                  />

                </div>

              </div>


              <div className="doctor-modal-actions">

                <button
                  type="button"
                  className="cancel-doctor-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-doctor-btn"
                >
                  Add Doctor
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* ================= DETAILS MODAL ================= */}

      {selectedDoctor && (

        <div
          className="doctor-modal-overlay"
          onClick={() => setSelectedDoctor(null)}
        >

          <div
            className="doctor-detail-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-doctor-detail"
              onClick={() => setSelectedDoctor(null)}
            >
              ×
            </button>


            <div className="doctor-detail-profile">

              <div className="doctor-detail-avatar">
                👨‍⚕️
              </div>

              <div>
                <h2>{selectedDoctor.name}</h2>
                <p>{selectedDoctor.specialization}</p>
              </div>

            </div>


            <div className="doctor-detail-grid">

              <div>
                <span>Email</span>
                <strong>{selectedDoctor.email}</strong>
              </div>

              <div>
                <span>Phone</span>
                <strong>{selectedDoctor.phone}</strong>
              </div>

              <div>
                <span>Experience</span>
                <strong>{selectedDoctor.experience}</strong>
              </div>

              <div>
                <span>Patients</span>
                <strong>{selectedDoctor.patients}</strong>
              </div>

            </div>


            <div className="doctor-detail-actions">

              <button
                onClick={() => setSelectedDoctor(null)}
              >
                Close
              </button>

              <button>
                View Appointments
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Doctor;