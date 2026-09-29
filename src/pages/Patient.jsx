<button
  className="back-dashboard-btn"
  onClick={() => navigate("/")}
>
  ← Back to Dashboard
</button>
import React, { useState } from "react";
import "../css/Patient.css";

const patientsData = [
  {
    id: "P-1001",
    name: "Rohan Singh",
    age: 32,
    gender: "Male",
    phone: "+91 98765 43210",
    blood: "O+",
    condition: "Fever",
    lastVisit: "10 Sep 2025",
    status: "Active",
  },
  {
    id: "P-1002",
    name: "Priya Sharma",
    age: 28,
    gender: "Female",
    phone: "+91 98765 12345",
    blood: "A+",
    condition: "Follow Up",
    lastVisit: "09 Sep 2025",
    status: "Active",
  },
  {
    id: "P-1003",
    name: "Amit Verma",
    age: 45,
    gender: "Male",
    phone: "+91 99887 66554",
    blood: "B+",
    condition: "Diabetes",
    lastVisit: "08 Sep 2025",
    status: "Active",
  },
  {
    id: "P-1004",
    name: "Neha Gupta",
    age: 35,
    gender: "Female",
    phone: "+91 97654 32109",
    blood: "AB+",
    condition: "Consultation",
    lastVisit: "07 Sep 2025",
    status: "Active",
  },
  {
    id: "P-1005",
    name: "Suresh Kumar",
    age: 52,
    gender: "Male",
    phone: "+91 98761 23456",
    blood: "O-",
    condition: "Blood Pressure",
    lastVisit: "05 Sep 2025",
    status: "Active",
  },
  {
    id: "P-1006",
    name: "Pooja Patel",
    age: 26,
    gender: "Female",
    phone: "+91 98989 45678",
    blood: "A-",
    condition: "Follow Up",
    lastVisit: "03 Sep 2025",
    status: "Active",
  },
];

function Patient() {
  const [patients, setPatients] = useState(patientsData);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    blood: "",
    condition: "",
  });

  const filteredPatients = patients.filter((patient) =>
    `${patient.name} ${patient.id} ${patient.phone} ${patient.condition}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setNewPatient({
      ...newPatient,
      [e.target.name]: e.target.value,
    });
  };

  const addPatient = (e) => {
    e.preventDefault();

    const patient = {
      id: `P-${1001 + patients.length}`,
      name: newPatient.name,
      age: newPatient.age,
      gender: newPatient.gender,
      phone: newPatient.phone,
      blood: newPatient.blood,
      condition: newPatient.condition,
      lastVisit: "Today",
      status: "Active",
    };

    setPatients([patient, ...patients]);

    setNewPatient({
      name: "",
      age: "",
      gender: "",
      phone: "",
      blood: "",
      condition: "",
    });

    setShowAddForm(false);
  };

  return (
    <div className="patient-page">

      {/* ================= PAGE HEADER ================= */}

      <div className="patient-page-header">

        <div>
          <div className="breadcrumb">
            Dashboard <span>›</span> Patients
          </div>

          <h1>Patients</h1>

          <p>
            Manage patient information, medical history and appointments
          </p>
        </div>

        <button
          className="add-patient-btn"
          onClick={() => setShowAddForm(true)}
        >
          <span>＋</span>
          Add New Patient
        </button>

      </div>


      {/* ================= STATISTICS ================= */}

      <div className="patient-stats">

        <div className="patient-stat-card">
          <div className="patient-stat-icon blue">
            👥
          </div>

          <div>
            <span>Total Patients</span>
            <strong>{patients.length}</strong>
            <small>↑ 12% this month</small>
          </div>
        </div>


        <div className="patient-stat-card">
          <div className="patient-stat-icon green">
            ✓
          </div>

          <div>
            <span>Active Patients</span>
            <strong>
              {patients.filter((p) => p.status === "Active").length}
            </strong>
            <small>Currently under care</small>
          </div>
        </div>


        <div className="patient-stat-card">
          <div className="patient-stat-icon purple">
            📅
          </div>

          <div>
            <span>Today's Patients</span>
            <strong>18</strong>
            <small>Appointments today</small>
          </div>
        </div>


        <div className="patient-stat-card">
          <div className="patient-stat-icon orange">
            🩺
          </div>

          <div>
            <span>New Patients</span>
            <strong>06</strong>
            <small>Registered this week</small>
          </div>
        </div>

      </div>


      {/* ================= MAIN PATIENT CARD ================= */}

      <div className="patient-main-card">

        <div className="patient-toolbar">

          <div className="patient-title">

            <div className="patient-title-icon">
              👥
            </div>

            <div>
              <h2>All Patients</h2>
              <p>
                {patients.length} patients registered
              </p>
            </div>

          </div>


          <div className="patient-tools">

            <div className="patient-search-box">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Search by name, ID, phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button className="filter-btn">
              ⚙ Filter
            </button>

            <button className="export-btn">
              ↓ Export
            </button>

          </div>

        </div>


        {/* ================= TABLE ================= */}

        <div className="patient-table-container">

          <table className="patient-table">

            <thead>

              <tr>
                <th>
                  Patient
                </th>

                <th>
                  Patient ID
                </th>

                <th>
                  Age / Gender
                </th>

                <th>
                  Contact
                </th>

                <th>
                  Blood Group
                </th>

                <th>
                  Condition
                </th>

                <th>
                  Last Visit
                </th>

                <th>
                  Status
                </th>

                <th>
                  Action
                </th>
              </tr>

            </thead>


            <tbody>

              {filteredPatients.length > 0 ? (

                filteredPatients.map((patient) => (

                  <tr key={patient.id}>

                    <td>

                      <div className="patient-name-cell">

                        <div className="patient-avatar-small">
                          {patient.gender === "Female"
                            ? "👩"
                            : "👨"}
                        </div>

                        <div>
                          <strong>
                            {patient.name}
                          </strong>

                          <small>
                            {patient.condition}
                          </small>
                        </div>

                      </div>

                    </td>


                    <td>
                      <span className="patient-id">
                        {patient.id}
                      </span>
                    </td>


                    <td>
                      {patient.age} yrs
                      <span className="gender">
                        {" "}
                        / {patient.gender}
                      </span>
                    </td>


                    <td>
                      <span className="phone">
                        {patient.phone}
                      </span>
                    </td>


                    <td>

                      <span className="blood-group">
                        {patient.blood}
                      </span>

                    </td>


                    <td>

                      <span className="condition">
                        {patient.condition}
                      </span>

                    </td>


                    <td>
                      {patient.lastVisit}
                    </td>


                    <td>

                      <span className="active-status">
                        ● {patient.status}
                      </span>

                    </td>


                    <td>

                      <div className="action-buttons">

                        <button
                          className="view-patient"
                          title="View Patient"
                          onClick={() =>
                            setSelectedPatient(patient)
                          }
                        >
                          👁
                        </button>

                        <button
                          className="edit-patient"
                          title="Edit Patient"
                        >
                          ✎
                        </button>

                        <button
                          className="more-patient"
                          title="More"
                        >
                          ⋮
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="9"
                    className="no-patients"
                  >
                    <div>
                      🔍
                    </div>

                    <h3>
                      No patients found
                    </h3>

                    <p>
                      Try searching with another name, ID or phone number.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* ================= TABLE FOOTER ================= */}

        <div className="patient-table-footer">

          <span>
            Showing <strong>{filteredPatients.length}</strong> of{" "}
            <strong>{patients.length}</strong> patients
          </span>


          <div className="pagination">

            <button>
              ‹
            </button>

            <button className="page-active">
              1
            </button>

            <button>
              2
            </button>

            <button>
              3
            </button>

            <button>
              ›
            </button>

          </div>

        </div>

      </div>


      {/* ================= ADD PATIENT MODAL ================= */}

      {showAddForm && (

        <div className="modal-overlay">

          <div className="patient-modal">

            <div className="modal-header">

              <div>
                <h2>Add New Patient</h2>
                <p>
                  Enter patient details
                </p>
              </div>

              <button
                className="close-modal"
                onClick={() => setShowAddForm(false)}
              >
                ×
              </button>

            </div>


            <form onSubmit={addPatient}>

              <div className="form-grid">

                <div className="form-group full">
                  <label>
                    Patient Name
                  </label>

                  <input
                    name="name"
                    value={newPatient.name}
                    onChange={handleChange}
                    placeholder="Enter patient name"
                    required
                  />
                </div>


                <div className="form-group">
                  <label>
                    Age
                  </label>

                  <input
                    name="age"
                    type="number"
                    value={newPatient.age}
                    onChange={handleChange}
                    placeholder="Age"
                    required
                  />
                </div>


                <div className="form-group">
                  <label>
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={newPatient.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select Gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>


                <div className="form-group">
                  <label>
                    Phone Number
                  </label>

                  <input
                    name="phone"
                    value={newPatient.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />

                </div>


                <div className="form-group">
                  <label>
                    Blood Group
                  </label>

                  <select
                    name="blood"
                    value={newPatient.blood}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Blood Group
                    </option>

                    <option>O+</option>
                    <option>O-</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>

                  </select>

                </div>


                <div className="form-group full">

                  <label>
                    Current Condition
                  </label>

                  <input
                    name="condition"
                    value={newPatient.condition}
                    onChange={handleChange}
                    placeholder="e.g. Fever, Diabetes, Follow Up"
                  />

                </div>

              </div>


              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-patient-btn"
                >
                  ✓ Add Patient
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* ================= PATIENT DETAILS MODAL ================= */}

      {selectedPatient && (

        <div className="modal-overlay">

          <div className="patient-detail-modal">

            <button
              className="close-detail"
              onClick={() => setSelectedPatient(null)}
            >
              ×
            </button>


            <div className="detail-profile">

              <div className="detail-avatar">
                {selectedPatient.gender === "Female"
                  ? "👩"
                  : "👨"}
              </div>

              <div>

                <h2>
                  {selectedPatient.name}
                </h2>

                <p>
                  {selectedPatient.id}
                </p>

              </div>

            </div>


            <div className="detail-grid">

              <div>
                <span>Age</span>
                <strong>
                  {selectedPatient.age} Years
                </strong>
              </div>

              <div>
                <span>Gender</span>
                <strong>
                  {selectedPatient.gender}
                </strong>
              </div>

              <div>
                <span>Blood Group</span>
                <strong>
                  {selectedPatient.blood}
                </strong>
              </div>

              <div>
                <span>Phone</span>
                <strong>
                  {selectedPatient.phone}
                </strong>
              </div>

              <div>
                <span>Condition</span>
                <strong>
                  {selectedPatient.condition}
                </strong>
              </div>

              <div>
                <span>Last Visit</span>
                <strong>
                  {selectedPatient.lastVisit}
                </strong>
              </div>

            </div>


            <div className="detail-actions">

              <button>
                📅 Appointment
              </button>

              <button>
                📄 Medical Records
              </button>

              <button>
                💊 Prescription
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Patient;