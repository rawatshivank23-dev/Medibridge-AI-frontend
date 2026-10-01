import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

function Home() {

  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(new Date());

  // ================= LANGUAGE =================

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "EN"
  );

  // ================= LIVE QUEUE =================

  const [queue, setQueue] = useState([
    {
      no: 1,
      name: "Ramesh Singh",
      token: "P-014",
      status: "NOW",
    },
    {
      no: 2,
      name: "Priya Sharma",
      token: "P-017",
      status: "Waiting",
    },
    {
      no: 3,
      name: "Sohan Lal",
      token: "P-018",
      status: "Waiting",
    },
    {
      no: 4,
      name: "Neha Verma",
      token: "P-019",
      status: "Waiting",
    },
    {
      no: 5,
      name: "Amit Kumar",
      token: "P-020",
      status: "Waiting",
    },
    {
      no: 6,
      name: "Pooja Patel",
      token: "P-021",
      status: "Waiting",
    },
  ]);

  // ================= APPOINTMENTS =================

  const appointments = [
    {
      time: "09:30 AM",
      doctor: "Dr. Mehta",
      status: "Completed",
    },
    {
      time: "10:15 AM",
      doctor: "Dr. Sharma",
      status: "In Queue",
    },
    {
      time: "11:00 AM",
      doctor: "Dr. Verma",
      status: "Upcoming",
    },
    {
      time: "12:30 PM",
      doctor: "Dr. Gupta",
      status: "Upcoming",
    },
  ];

  // ================= LANGUAGE TEXT =================

  const text = {

    EN: {
      language: "English",
      languageSmall: "Language",

      brandSubtitle: "Your AI Health Assistant",

      welcome: "Welcome To",
      smartHealthcare: "Smart Healthcare. Easy Access.",

      scanTitle: "SCAN",
      scanTitle2: "YOUR ID",
      scanDescription: "Scan your ID card",
      begin: "to begin",

      aadhaar: "Aadhaar",
      swasthya: "Swasthya",
      other: "Other",
      card: "Card",

      scanner: "ID CARD SCANNER",
      scanning: "SCANNING...",

      speak: "SPEAK",
      speakHindi: "कृपया बोलें",
      speakDescription: "Tap the mic and",
      speakDescription2: "speak your problem",

      doctor: "DOCTOR",
      appointment: "APPOINTMENT",
      bookAppointment: "Book, reschedule or",
      doctorAvailability: "check doctor availability",

      todays: "TODAY'S",
      appointments: "APPOINTMENTS",
      viewUpcoming: "View your upcoming",
      yourAppointments: "appointments",

      medicalRecords: "MEDICAL RECORDS",
      viewMedical: "View your medical",
      historyReports: "history & reports",

      prescription: "PRESCRIPTION",
      viewDownload: "View or download",
      yourPrescription: "your prescription",

      howToUse: "HOW TO USE",
      instructions: "See instructions",
      howToUse2: "on how to use",

      liveQueue: "LIVE QUEUE",
      live: "● Live",

      no: "No.",
      patientName: "Patient Name",
      token: "Token",
      status: "Status",

      now: "NOW",
      waiting: "Waiting",

      fullQueue: "View Full Queue",

      todaysAppointments: "TODAY'S APPOINTMENTS",

      time: "Time",
      doctorName: "Doctor",

      completed: "Completed",
      inQueue: "In Queue",
      upcoming: "Upcoming",

      viewAllAppointments: "View All Appointments",

      emergency: "EMERGENCY",
      emergencyText: "Press in case of medical emergency",

      back: "BACK",
      cancel: "CANCEL",
      next: "NEXT",

      help: "Need Help? Press the button to hear instructions.",

      voicePrompt:
        "Please tell me your problem. What are you experiencing?",

      helpVoice:
        "Please follow the instructions on the screen.",

      languageHindi: "हिंदी",
      languageEnglish: "English",
    },

    HI: {
      language: "हिंदी",
      languageSmall: "भाषा",

      brandSubtitle: "आपका AI स्वास्थ्य सहायक",

      welcome: "स्वागत है",
      smartHealthcare: "स्मार्ट स्वास्थ्य सेवा। आसान पहुंच।",

      scanTitle: "स्कैन",
      scanTitle2: "अपनी ID",
      scanDescription: "अपना ID कार्ड स्कैन करें",
      begin: "शुरू करने के लिए",

      aadhaar: "आधार",
      swasthya: "स्वास्थ्य",
      other: "अन्य",
      card: "कार्ड",

      scanner: "ID कार्ड स्कैनर",
      scanning: "स्कैन हो रहा है...",

      speak: "बोलें",
      speakHindi: "कृपया बोलें",
      speakDescription: "माइक पर टैप करें और",
      speakDescription2: "अपनी समस्या बताएं",

      doctor: "डॉक्टर",
      appointment: "अपॉइंटमेंट",
      bookAppointment: "बुक करें, बदलें या",
      doctorAvailability: "डॉक्टर की उपलब्धता देखें",

      todays: "आज के",
      appointments: "अपॉइंटमेंट",
      viewUpcoming: "अपने आने वाले",
      yourAppointments: "अपॉइंटमेंट देखें",

      medicalRecords: "मेडिकल रिकॉर्ड",
      viewMedical: "अपने मेडिकल",
      historyReports: "रिकॉर्ड और रिपोर्ट देखें",

      prescription: "प्रिस्क्रिप्शन",
      viewDownload: "अपना प्रिस्क्रिप्शन",
      yourPrescription: "देखें या डाउनलोड करें",

      howToUse: "कैसे उपयोग करें",
      instructions: "उपयोग करने के",
      howToUse2: "निर्देश देखें",

      liveQueue: "लाइव कतार",
      live: "● लाइव",

      no: "नं.",
      patientName: "मरीज का नाम",
      token: "टोकन",
      status: "स्थिति",

      now: "अभी",
      waiting: "प्रतीक्षा",

      fullQueue: "पूरी कतार देखें",

      todaysAppointments: "आज के अपॉइंटमेंट",

      time: "समय",
      doctorName: "डॉक्टर",

      completed: "पूरा",
      inQueue: "कतार में",
      upcoming: "आने वाला",

      viewAllAppointments: "सभी अपॉइंटमेंट देखें",

      emergency: "आपातकाल",
      emergencyText: "मेडिकल इमरजेंसी में दबाएं",

      back: "वापस",
      cancel: "रद्द करें",
      next: "आगे",

      help:
        "मदद चाहिए? निर्देश सुनने के लिए बटन दबाएं।",

      voicePrompt:
        "कृपया अपनी समस्या बताएं। आपको क्या हो रहा है?",

      helpVoice:
        "कृपया स्क्रीन पर दिए गए निर्देशों का पालन करें.",

      languageHindi: "हिंदी",
      languageEnglish: "English",
    },

  };

  const t = text[language];

  // ================= SAVE LANGUAGE =================

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // ================= LIVE CLOCK =================

  useEffect(() => {

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  // ================= DEMO LIVE QUEUE =================

  useEffect(() => {

    const queueTimer = setInterval(() => {

      setQueue((oldQueue) => {

        const updated = [...oldQueue];

        if (updated.length > 1) {

          updated[0].status = "Completed";
          updated[1].status = "NOW";

          const first = updated.shift();

          updated.push(first);

          return updated.map((item, index) => ({
            ...item,
            no: index + 1,
          }));

        }

        return oldQueue;

      });

    }, 15000);

    return () => clearInterval(queueTimer);

  }, []);

  // ================= FORMAT TIME =================

  const formatTime = (date) => {

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  };

  // ================= FORMAT DATE =================

  const formatDate = (date) => {

    return date.toLocaleDateString(
      language === "HI" ? "hi-IN" : "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  };

  // ================= VOICE FUNCTION =================

  const speakText = (message) => {

    if (!("speechSynthesis" in window)) {

      alert(
        language === "HI"
          ? "आपके ब्राउज़र में आवाज़ की सुविधा उपलब्ध नहीं है।"
          : "Voice feature is not supported in this browser."
      );

      return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(message);

    speech.lang =
      language === "HI"
        ? "hi-IN"
        : "en-IN";

    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);

  };

  // ================= SPEAK CARD =================

  const handleSpeak = () => {

    speakText(t.voicePrompt);

    handleAction("Voice Assistant");

  };

  // ================= HELP VOICE =================

  const handleHelpVoice = () => {

    speakText(t.helpVoice);

  };

  // ================= LANGUAGE CHANGE =================

  const changeLanguage = (selectedLanguage) => {

    setLanguage(selectedLanguage);

  };

  // ================= PAGE NAVIGATION =================

  const handleAction = (action) => {

    switch (action) {

      case "Scan Your ID":
        navigate("/scan-card");
        break;

      case "Voice Assistant":
        navigate("/speak");
        break;

      case "Doctor Appointment":
        navigate("/doctor");
        break;

      case "Todays Appointments":
        navigate("/todays-appointments");
        break;

      // ================= SCAN PHONE =================

      case "Scan Phone":
        navigate("/kiosk-side");
        break;

      case "Prescription":
        navigate("/prescription");
        break;

      case "How To Use":
        navigate("/how-it-use");
        break;

      case "View Full Queue":
        navigate("/live-queue");
        break;

      case "View All Appointments":
        navigate("/appointment");
        break;

      case "Emergency":
        navigate("/emergency");
        break;

      case "Back":
        navigate(-1);
        break;

      case "Cancel":
        navigate("/");
        break;

      case "Next":
        navigate("/scan-card");
        break;

      case "Help Instructions":
        navigate("/how-it-use");
        break;

      case "Aadhaar Card":
        navigate("/scan-card");
        break;

      case "Swasthya Card":
        navigate("/scan-card");
        break;

      case "Other Card":
        navigate("/scan-card");
        break;

      default:
        console.log(`${action} selected`);

    }

  };

  // ================= UI =================

  return (

    <div className="kiosk-page">

      {/* ================= HEADER ================= */}

      <header className="kiosk-header">

        <div className="brand-section">

          <div className="brand-logo">
            <span>✚</span>
          </div>

          <div>

            <h1>
              MEDIBRIDGE <span>AI</span>
            </h1>

            <p>
              {t.brandSubtitle}
            </p>

          </div>

        </div>


        <div className="header-right">

          {/* ================= LANGUAGE BUTTONS ================= */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >

            {/* HINDI BUTTON - LEFT */}

            <button
              onClick={() => changeLanguage("HI")}
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                border:
                  language === "HI"
                    ? "2px solid #1689ff"
                    : "1px solid #34526d",
                background:
                  language === "HI"
                    ? "#0879d4"
                    : "#0b223c",
                color: "white",
                fontWeight: "bold",
                fontSize: "15px",
                cursor: "pointer",
                minWidth: "80px",
              }}
            >
              हिंदी
            </button>


            {/* ENGLISH BUTTON - RIGHT */}

            <button
              onClick={() => changeLanguage("EN")}
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                border:
                  language === "EN"
                    ? "2px solid #1689ff"
                    : "1px solid #34526d",
                background:
                  language === "EN"
                    ? "#0879d4"
                    : "#0b223c",
                color: "white",
                fontWeight: "bold",
                fontSize: "15px",
                cursor: "pointer",
                minWidth: "90px",
              }}
            >
              English
            </button>

          </div>


          {/* ================= DATE TIME ================= */}

          <div
            className="date-time"
            style={{
              marginLeft: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "3px",
            }}
          >

            <strong
              style={{
                fontSize: "20px",
                fontWeight: "800",
              }}
            >
              {formatDate(currentTime)}
            </strong>

            <span
              style={{
                fontSize: "19px",
                fontWeight: "800",
              }}
            >
              ◷ {formatTime(currentTime)}
            </span>

          </div>

        </div>

      </header>


      {/* ================= WELCOME ================= */}

      <section className="welcome-section">

        <div className="welcome-text">

          <h2>
            {t.welcome}
          </h2>

          <h3>
            MEDI<span>BRIDGE AI</span>
          </h3>

          <div className="ecg-line">
            ──────╱╲╱╲──────
          </div>

          <p>
            {t.smartHealthcare}
          </p>

        </div>


        <div className="health-icon">

          🩺

          <div className="heart-icon">
            ♥
          </div>

        </div>

      </section>


      {/* ================= MAIN CONTENT ================= */}

      <main className="main-content">


        {/* ================= LEFT AREA ================= */}

        <div className="main-left">


          {/* ================= SCAN + SPEAK ================= */}

          <div className="top-cards">


            {/* ================= SCAN CARD ================= */}

            <div
              className="feature-card scan-card"
              onClick={() =>
                handleAction(
                  "Scan Your ID"
                )
              }
            >


              {/* ================= SCANNER ================= */}

              <div className="scanner-container">

                <div className="scanner-machine">


                  <div className="scanner-top">

                    <div className="scanner-light"></div>

                    <span>
                      {t.scanner}
                    </span>

                  </div>


                  <div className="scanner-slot">

                    <div className="scan-corner top-left"></div>

                    <div className="scan-corner top-right"></div>

                    <div className="scan-corner bottom-left"></div>

                    <div className="scan-corner bottom-right"></div>


                    {/* MOVING ID CARD */}

                    <div className="moving-id-card">

                      <div className="card-photo">
                        👤
                      </div>

                      <div className="card-information">

                        <div className="card-line long"></div>

                        <div className="card-line"></div>

                        <div className="card-line short"></div>

                        <div className="card-chip">
                          ▦
                        </div>

                      </div>

                    </div>


                    {/* SCANNER LASER */}

                    <div className="scanner-line"></div>

                  </div>


                  <div className="scanner-bottom">

                    <div className="scanner-status-dot"></div>

                    <span>
                      {t.scanning}
                    </span>

                  </div>

                </div>

              </div>


              {/* ================= SCAN TITLE ================= */}

              <h2>

                {t.scanTitle}{" "}

                <span>
                  {t.scanTitle2}
                </span>

              </h2>

              <p>

                {t.scanDescription}

                <br />

                {t.begin}

              </p>


              {/* ================= CARD OPTIONS ================= */}

              <div
                className="scan-options"
                style={{
                  gap: "18px",
                }}
              >


                {/* AADHAAR */}

                <button
                  type="button"
                  onClick={(e) => {

                    e.stopPropagation();

                    handleAction(
                      "Aadhaar Card"
                    );

                  }}
                >

                  <span>
                    ◎
                  </span>

                  <strong>
                    {t.aadhaar}
                  </strong>

                  <small>
                    {t.card}
                  </small>

                </button>


                {/* SWASTHYA */}

                <button
                  type="button"
                  className="purple-card"
                  onClick={(e) => {

                    e.stopPropagation();

                    handleAction(
                      "Swasthya Card"
                    );

                  }}
                >

                  <span>
                    ✚
                  </span>

                  <strong>
                    {t.swasthya}
                  </strong>

                  <small>
                    {t.card}
                  </small>

                </button>


                {/* OTHER */}

                <button
                  type="button"
                  className="other-card"
                  onClick={(e) => {

                    e.stopPropagation();

                    handleAction(
                      "Other Card"
                    );

                  }}
                >

                  <span>
                    ▣
                  </span>

                  <strong>
                    {t.other}
                  </strong>

                  <small>
                    {t.card}
                  </small>

                </button>

              </div>


              <div className="card-arrow">
                ›
              </div>

            </div>


            {/* ================= SPEAK CARD ================= */}

            <div
              className="feature-card speak-card"
              onClick={handleSpeak}
            >

              <div className="mic-circle">
                🎙️
              </div>

              <div className="voice-waves">
                )))
              </div>

              <h2>
                {t.speak}
              </h2>

              <h3>
                {t.speakHindi}
              </h3>

              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  lineHeight: "1.5",
                }}
              >

                {t.speakDescription}

                <br />

                {t.speakDescription2}

              </p>

              <div className="mic-arrow">
                ›
              </div>

            </div>

          </div>


          {/* ================= APPOINTMENT ================= */}

          <div className="two-cards">


            {/* DOCTOR APPOINTMENT */}

            <div
              className="small-feature purple-feature"
              onClick={() =>
                handleAction(
                  "Doctor Appointment"
                )
              }
            >

              <div className="small-icon">
                📅
              </div>

              <div>

                <h2>
                  {t.doctor}
                </h2>

                <h2>
                  {t.appointment}
                </h2>

                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    lineHeight: "1.5",
                  }}
                >

                  {t.bookAppointment}

                  <br />

                  {t.doctorAvailability}

                </p>

              </div>

              <span className="small-arrow">
                ›
              </span>

            </div>


            {/* TODAY APPOINTMENTS */}

            <div
              className="small-feature blue-feature"
              onClick={() =>
                handleAction(
                  "Todays Appointments"
                )
              }
            >

              <div className="small-icon">
                🗓️
              </div>

              <div>

                <h2>
                  {t.todays}
                </h2>

                <h2>
                  {t.appointments}
                </h2>

                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    lineHeight: "1.5",
                  }}
                >

                  {t.viewUpcoming}

                  <br />

                  {t.yourAppointments}

                </p>

              </div>

              <span className="small-arrow">
                ›
              </span>

            </div>

          </div>


          {/* ================= SERVICE GRID ================= */}

          <div className="service-grid">


            {/* ================= SCAN PHONE ================= */}

            <div
              className="service-card medical-card"
              onClick={() =>
                handleAction(
                  "Scan Phone"
                )
              }
            >

              <span className="service-icon">
                📱
              </span>

              <h3>
                SCAN PHONE
              </h3>

              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "700",
                  lineHeight: "1.5",
                }}
              >
                Scan QR with your phone
                <br />
                and send photo to kiosk
              </p>

              <span className="service-arrow">
                ›
              </span>

            </div>


            {/* ================= PRESCRIPTION ================= */}

            <div
              className="service-card prescription-card"
              onClick={() =>
                handleAction(
                  "Prescription"
                )
              }
            >

              <span className="service-icon">
                📋
              </span>

              <h3>
                {t.prescription}
              </h3>

              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "700",
                  lineHeight: "1.5",
                }}
              >

                {t.viewDownload}

                <br />

                {t.yourPrescription}

              </p>

              <span className="service-arrow">
                ›
              </span>

            </div>


            {/* ================= HOW TO USE ================= */}

            <div
              className="service-card how-card"
              onClick={() =>
                handleAction(
                  "How To Use"
                )
              }
            >

              <span className="service-icon">
                ⓘ
              </span>

              <h3>
                {t.howToUse}
              </h3>

              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "700",
                  lineHeight: "1.5",
                }}
              >

                {t.instructions}

                <br />

                {t.howToUse2}

              </p>

              <span className="service-arrow">
                ›
              </span>

            </div>

          </div>

        </div>


        {/* ================= RIGHT PANEL ================= */}

        <aside className="right-panel">


          {/* ================= LIVE QUEUE ================= */}

          <div className="queue-panel">

            <div className="panel-title">

              <div>

                👥{" "}

                <strong>
                  {t.liveQueue}
                </strong>

              </div>

              <span className="live-indicator">
                {t.live}
              </span>

            </div>


            <div className="queue-header">

              <span>
                {t.no}
              </span>

              <span>
                {t.patientName}
              </span>

              <span>
                {t.token}
              </span>

              <span>
                {t.status}
              </span>

            </div>


            <div className="queue-list">

              {queue.map((patient) => (

                <div
                  className={`queue-row ${
                    patient.status === "NOW"
                      ? "active-patient"
                      : ""
                  }`}
                  key={patient.token}
                >

                  <span className="queue-number">
                    {patient.no}
                  </span>

                  <span className="patient-name">
                    {patient.name}
                  </span>

                  <span className="patient-token">
                    {patient.token}
                  </span>

                  <span>

                    <span
                      className={
                        patient.status === "NOW"
                          ? "status-now"
                          : "status-waiting"
                      }
                    >

                      {patient.status === "NOW"
                        ? t.now
                        : t.waiting}

                    </span>

                  </span>

                </div>

              ))}

            </div>


            <button
              className="full-queue-btn"
              onClick={() =>
                handleAction(
                  "View Full Queue"
                )
              }
            >

              👤 {t.fullQueue}

              <span>
                ›
              </span>

            </button>

          </div>


          {/* ================= TODAY APPOINTMENTS ================= */}

          <div className="appointments-panel">

            <div className="appointment-title">

              📅

              <strong>
                {t.todaysAppointments}
              </strong>

            </div>


            <div className="appointment-header">

              <span>
                {t.time}
              </span>

              <span>
                {t.doctorName}
              </span>

              <span>
                {t.status}
              </span>

            </div>


            {appointments.map(
              (appointment, index) => (

                <div
                  className="appointment-row"
                  key={index}
                >

                  <span>
                    {appointment.time}
                  </span>

                  <span>
                    {appointment.doctor}
                  </span>

                  <span>

                    <b
                      className={
                        appointment.status ===
                        "Completed"
                          ? "completed"
                          : appointment.status ===
                            "In Queue"
                          ? "in-queue"
                          : "upcoming"
                      }
                    >

                      {appointment.status ===
                      "Completed"
                        ? t.completed
                        : appointment.status ===
                          "In Queue"
                        ? t.inQueue
                        : t.upcoming}

                    </b>

                  </span>

                </div>

              )
            )}


            <button
              className="all-appointments-btn"
              onClick={() =>
                handleAction(
                  "View All Appointments"
                )
              }
            >

              {t.viewAllAppointments}

              <span>
                ›
              </span>

            </button>

          </div>

        </aside>

      </main>


      {/* ================= EMERGENCY ================= */}

      <section
        className="emergency-bar"
        onClick={() =>
          handleAction("Emergency")
        }
      >

        <div className="emergency-icon">
          🚨
        </div>

        <div>

          <h2>
            {t.emergency}
          </h2>

          <p>
            {t.emergencyText}
          </p>

        </div>

        <div className="emergency-pulse">
          〰〰〰〰〰
        </div>

        <span className="emergency-arrow">
          ›
        </span>

      </section>


      {/* ================= NAVIGATION ================= */}

      <div className="navigation-buttons">


        <button
          className="nav-btn back-btn"
          onClick={() =>
            handleAction("Back")
          }
        >

          <span>
            ←
          </span>

          {t.back}

        </button>


        <button
          className="nav-btn cancel-btn"
          onClick={() =>
            handleAction("Cancel")
          }
        >

          <span>
            ✕
          </span>

          {t.cancel}

        </button>


        <button
          className="nav-btn next-btn"
          onClick={() =>
            handleAction("Next")
          }
        >

          {t.next}

          <span>
            →
          </span>

        </button>

      </div>


      {/* ================= FOOTER ================= */}

      <footer className="help-footer">

        <div className="help-text">

          <span className="speaker-icon">
            🔊
          </span>

          {t.help}

        </div>


        <button
          className="sound-btn"
          onClick={handleHelpVoice}
        >
          🔊
        </button>

      </footer>

    </div>

  );

}

export default Home;