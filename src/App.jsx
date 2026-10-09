
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Patient from "./pages/Patient";

import Scancard from "./pages/Scancard";
import VerifyOTP from "./pages/Verifyotp";
import Speak from "./pages/Speak";

import Doctor from "./pages/Doctor";
import DoctorAppointment from "./pages/DoctorAppointment";
import Appointment from "./pages/Appointment";
import TodaysAppointments from "./pages/TodaysAppointments";

import MedicalRecords from "./pages/MedicalRecords";
import Prescription from "./pages/Prescription";
import LiveQueue from "./pages/LiveQueue";

import Billing from "./pages/Billing";
import Emergency from "./pages/Emergency";
import Howituse from "./pages/Howitsuse";

/* ================= NEW ================= */
import KioskSide from "./pages/Kioskside";
import PhoneSide from "./pages/Phoneside";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= HOME ================= */}
        <Route
          path="/"
          element={<Home />}
        />


        {/* ================= DASHBOARD ================= */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


        {/* ================= PATIENT ================= */}
        <Route
          path="/patient"
          element={<Patient />}
        />


        {/* ================= SCAN CARD ================= */}
        <Route
          path="/scan-card"
          element={<Scancard />}
        />


        {/* ================= OTP VERIFICATION ================= */}
        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />


        {/* ================= SPEAK ================= */}
        <Route
          path="/speak"
          element={<Speak />}
        />


        {/* ================= DOCTOR ================= */}
        <Route
          path="/doctor"
          element={<Doctor />}
        />


        {/* ================= DOCTOR APPOINTMENT ================= */}
        <Route
          path="/doctor-appointment"
          element={<DoctorAppointment />}
        />


        {/* ================= APPOINTMENT ================= */}
        <Route
          path="/appointment"
          element={<Appointment />}
        />


        {/* ================= TODAY'S APPOINTMENTS ================= */}
        <Route
          path="/todays-appointments"
          element={<TodaysAppointments />}
        />


        {/* ================= MEDICAL RECORDS ================= */}
        <Route
          path="/medical-records"
          element={<MedicalRecords />}
        />


        {/* ================= PRESCRIPTION ================= */}
        <Route
          path="/prescription"
          element={<Prescription />}
        />


        {/* ================= LIVE QUEUE ================= */}
        <Route
          path="/live-queue"
          element={<LiveQueue />}
        />


        {/* ================= BILLING ================= */}
        <Route
          path="/billing"
          element={<Billing />}
        />


        {/* ================= EMERGENCY ================= */}
        <Route
          path="/emergency"
          element={<Emergency />}
        />


        {/* ================= HOW TO USE ================= */}
        <Route
          path="/how-it-use"
          element={<Howituse />}
        />


        {/* ================= KIOSK SIDE ================= */}
        <Route
          path="/kiosk-Side"
          element={<KioskSide />}
        />


        {/* ================= PHONE SIDE ================= */}
        <Route
          path="/phone-side"
          element={<PhoneSide />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

