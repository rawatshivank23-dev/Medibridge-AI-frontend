
import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/VerifyOTP.css";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const inputRefs = useRef([]);

  // Demo OTP
  const DEMO_OTP = "123456";

  // Card information coming from Scan Card page
  const cardType = location.state?.cardType || "ID Card";

  const handleChange = (value, index) => {
    // Allow only numbers
    if (!/^[0-9]*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    setError("");
    setMessage("");

    // Automatically move to next box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous box when Backspace is pressed
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOTP = otp.join("");

    if (enteredOTP.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    if (enteredOTP !== DEMO_OTP) {
      setError("Invalid OTP. Please try again.");
      return;
    }

    setError("");
    setMessage("OTP verified successfully!");

    // Go to Patient Dashboard after successful verification
    setTimeout(() => {
      navigate("/patient", {
        state: {
          authenticated: true,
          cardType: cardType,
        },
      });
    }, 800);
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setMessage("A new OTP has been sent.");

    inputRefs.current[0]?.focus();
  };

  const handleBack = () => {
    navigate("/scan-card");
  };

  return (
    <div className="otp-page">

      <div className="otp-card">

        {/* Back Button */}
        <button
          className="back-button"
          onClick={handleBack}
        >
          ← Back
        </button>

        {/* Icon */}
        <div className="otp-icon">
          🔐
        </div>

        {/* Heading */}
        <h1>Verify OTP</h1>

        <p className="otp-subtitle">
          Enter the 6-digit OTP sent to your registered
          mobile number.
        </p>

        {/* Card Type */}
        <div className="card-info">
          <span>Verification for</span>
          <strong>{cardType}</strong>
        </div>

        {/* OTP Inputs */}
        <div className="otp-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              onKeyDown={(e) =>
                handleKeyDown(e, index)
              }
              className="otp-input"
            />
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {/* Success */}
        {message && (
          <p className="success-message">
            {message}
          </p>
        )}

        {/* Verify Button */}
        <button
          className="verify-button"
          onClick={handleVerify}
        >
          Verify OTP
        </button>

        {/* Resend */}
        <div className="resend-section">
          <span>Didn't receive the OTP?</span>

          <button
            className="resend-button"
            onClick={handleResend}
          >
            Resend OTP
          </button>
        </div>

        {/* Demo Information */}
        <div className="demo-box">
          <strong>Demo OTP</strong>
          <p>123456</p>
          <small>
            Use this OTP for testing.
          </small>
        </div>

      </div>

    </div>
  );
}

export default VerifyOTP;

