import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Scancard.css";

function Scancard() {

    const navigate = useNavigate();

    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const canvasRef = useRef(null);

    const [cameraOpen, setCameraOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [selectedCard, setSelectedCard] = useState("");

    const handleScan = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "environment"
                },
                audio: false
            });

            streamRef.current = stream;
            setCameraOpen(true);

            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;

                    videoRef.current.play().catch((error) => {
                        console.error("Video play error:", error);
                    });
                }
            }, 100);

        } catch (error) {
            console.error("Camera error:", error);

            if (error.name === "NotAllowedError") {
                alert(
                    "Camera permission denied. Please allow camera access in your browser."
                );
            } else if (error.name === "NotFoundError") {
                alert("No camera found on this device.");
            } else if (error.name === "NotReadableError") {
                alert(
                    "Camera is already being used by another application."
                );
            } else {
                alert("Unable to access camera.");
            }
        }
    };

    const handleCapture = () => {

        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) {
            return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext("2d");

        context.drawImage(
            video,
            0,
            0,
            canvas.width,
            canvas.height
        );

        const imageData = canvas.toDataURL(
            "image/jpeg",
            0.9
        );

        setCapturedImage(imageData);

        stopCamera();

        setCameraOpen(false);
    };

    const stopCamera = () => {

        if (streamRef.current) {

            streamRef.current
                .getTracks()
                .forEach((track) => {
                    track.stop();
                });

            streamRef.current = null;
        }

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    };

    const handleRetake = () => {

        setCapturedImage(null);

        handleScan();
    };

    // Card select only
    const handleCardSelect = (cardName) => {

        setSelectedCard(cardName);

        alert(`${cardName} selected. Now scan your card.`);
    };

    // After scanning
    const handleContinueAfterCapture = () => {

        if (!capturedImage) {
            alert("Please scan your card first.");
            return;
        }

        navigate("/verify-otp", {
            state: {
                cardType: selectedCard || "Health Card",
                authenticationMethod: "camera",
                capturedImage: capturedImage
            }
        });
    };

    const handleSpeak = () => {
        alert("Speak feature will be added next.");
    };

    useEffect(() => {

        return () => {
            stopCamera();
        };

    }, []);

    return (
        <div className="scan-page">

            <div className="brand-name">
                <span className="brand-medi">
                    MediBridge
                </span>

                <span className="brand-ai">
                    {" "}AI
                </span>
            </div>

            <div className="scan-header">

                <div className="scan-logo">
                    🏥
                </div>

                <h1>Scan Your Card</h1>

                <p>
                    Select your health card or scan it using your camera
                </p>

            </div>

            <div className="scan-container">

                {/* ================= INITIAL SCAN ================= */}

                {!cameraOpen && !capturedImage && (

                    <>

                        <div className="scan-icon">
                            📷
                        </div>

                        <h2>
                            Scan Your ID Card
                        </h2>

                        <p className="scan-description">
                            Select your card type and then scan your card
                            using the camera.
                        </p>

                        <button
                            className="scan-btn"
                            onClick={handleScan}
                        >
                            <span>📷</span>
                            Scan Card
                        </button>

                    </>

                )}

                {/* ================= CAMERA ================= */}

                {cameraOpen && (

                    <div className="camera-section">

                        <h2>
                            Position Your Card
                        </h2>

                        <p className="scan-description">
                            Place your card clearly inside the camera frame.
                        </p>

                        <div className="camera-wrapper">

                            <video
                                ref={videoRef}
                                className="camera-video"
                                autoPlay
                                playsInline
                                muted
                            />

                            <div className="camera-frame">

                                <div className="corner top-left"></div>

                                <div className="corner top-right"></div>

                                <div className="corner bottom-left"></div>

                                <div className="corner bottom-right"></div>

                            </div>

                        </div>

                        <button
                            className="capture-btn"
                            onClick={handleCapture}
                        >
                            📸 Capture Card
                        </button>

                        <button
                            className="cancel-camera-btn"
                            onClick={() => {

                                stopCamera();

                                setCameraOpen(false);

                            }}
                        >
                            Cancel
                        </button>

                    </div>

                )}

                {/* ================= CAPTURED CARD ================= */}

                {capturedImage && (

                    <div className="captured-section">

                        <h2>
                            Card Captured
                        </h2>

                        <p className="scan-description">
                            Your card image has been captured successfully.
                        </p>

                        <div className="captured-image-wrapper">

                            <img
                                src={capturedImage}
                                alt="Captured Card"
                                className="captured-image"
                            />

                        </div>

                        <button
                            className="capture-btn"
                            onClick={handleRetake}
                        >
                            🔄 Retake
                        </button>

                        <button
                            className="continue-btn"
                            onClick={handleContinueAfterCapture}
                        >
                            Continue → Verify OTP
                        </button>

                    </div>

                )}

            </div>

            <canvas
                ref={canvasRef}
                style={{ display: "none" }}
            />

            {/* ================= CARD OPTIONS ================= */}

            <div className="cards-section">

                <h2>
                    Choose Your Card
                </h2>

                <p className="section-description">
                    Select the card you want to use
                </p>

                <div className="card-list">

                    <button
                        className={`health-card swasthya ${
                            selectedCard === "Swasthya Card"
                                ? "selected"
                                : ""
                        }`}
                        onClick={() =>
                            handleCardSelect("Swasthya Card")
                        }
                    >

                        <div className="card-icon">
                            🏥
                        </div>

                        <div className="card-content">

                            <h3>
                                Swasthya Card
                            </h3>

                            <p>
                                Use your Swasthya health card
                            </p>

                        </div>

                        <div className="arrow">
                            →
                        </div>

                    </button>

                    <button
                        className={`health-card golden ${
                            selectedCard === "Golden Card"
                                ? "selected"
                                : ""
                        }`}
                        onClick={() =>
                            handleCardSelect("Golden Card")
                        }
                    >

                        <div className="card-icon">
                            💳
                        </div>

                        <div className="card-content">

                            <h3>
                                Golden Card
                            </h3>

                            <p>
                                Use your Golden health card
                            </p>

                        </div>

                        <div className="arrow">
                            →
                        </div>

                    </button>

                    <button
                        className={`health-card aadhaar ${
                            selectedCard === "Aadhaar Card"
                                ? "selected"
                                : ""
                        }`}
                        onClick={() =>
                            handleCardSelect("Aadhaar Card")
                        }
                    >

                        <div className="card-icon">
                            🪪
                        </div>

                        <div className="card-content">

                            <h3>
                                Aadhaar Card
                            </h3>

                            <p>
                                Use your Aadhaar card
                            </p>

                        </div>

                        <div className="arrow">
                            →
                        </div>

                    </button>

                </div>

            </div>

            {/* ================= SPEAK ================= */}

            <button
                className="speak-btn"
                onClick={handleSpeak}
            >
                🔊
                <span>
                    Tap to Speak
                </span>
            </button>

        </div>
    );
}

export default Scancard;