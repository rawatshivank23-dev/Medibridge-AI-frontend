import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import "../css/Kioskside.css";

function Kioskside() {
    const navigate = useNavigate();

    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [selectedImage, setSelectedImage] = useState(null);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [cameraStream, setCameraStream] = useState(null);
    const [message, setMessage] = useState("");

    // --------------------------------
    // DYNAMIC KIOSK SESSION
    // --------------------------------
    const [kioskSessionId, setKioskSessionId] = useState("");

    const [phoneUrl, setPhoneUrl] = useState("");

    useEffect(() => {
        // Generate unique session ID for this kiosk
        const sessionId =
            "KIOSK-" +
            Date.now() +
            "-" +
            Math.random().toString(36).substring(2, 8).toUpperCase();

        setKioskSessionId(sessionId);

        /*
          IMPORTANT:

          window.location.hostname = current computer IP/domain.

          Example:
          http://192.168.1.5:5173/phone-side?session=KIOSK-12345-ABC123
        */

        const url =
            `${window.location.protocol}//` +
            `${window.location.hostname}:5173` +
            `/phone-side?session=${sessionId}`;

        setPhoneUrl(url);

    }, []);

    // -----------------------------
    // Select Image from Phone/File
    // -----------------------------
    const handlePhoneImage = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setMessage("Please select a valid image.");
            return;
        }

        const imageUrl = URL.createObjectURL(file);

        setSelectedImage({
            url: imageUrl,
            file: file,
            source: "phone",
        });

        setMessage("Photo selected successfully.");
    };

    // -----------------------------
    // Open Camera
    // -----------------------------
    const openCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "environment",
                },
                audio: false,
            });

            setCameraStream(stream);
            setCameraOpen(true);

            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            }, 100);

        } catch (error) {
            console.error(error);
            setMessage("Camera permission is required.");
        }
    };

    // -----------------------------
    // Capture Photo
    // -----------------------------
    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) return;

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

        canvas.toBlob((blob) => {
            if (!blob) return;

            const imageUrl = URL.createObjectURL(blob);

            setSelectedImage({
                url: imageUrl,
                file: blob,
                source: "camera",
            });

            closeCamera();

            setMessage("Photo captured successfully.");

        }, "image/jpeg");
    };

    // -----------------------------
    // Close Camera
    // -----------------------------
    const closeCamera = () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach((track) => {
                track.stop();
            });
        }

        setCameraStream(null);
        setCameraOpen(false);
    };

    // -----------------------------
    // Remove Image
    // -----------------------------
    const removeImage = () => {
        if (selectedImage?.url) {
            URL.revokeObjectURL(selectedImage.url);
        }

        setSelectedImage(null);
        setMessage("");
    };

    // -----------------------------
    // Confirm Photo
    // -----------------------------
    const confirmPhoto = () => {
        if (!selectedImage) {
            setMessage("Please select or capture a photo first.");
            return;
        }

        /*
          Later:

          selectedImage.file ko backend par upload
          karenge using FormData + Axios/fetch.
        */

        setMessage("Photo confirmed. Ready for processing.");

        console.log("Selected Image:", selectedImage);
    };

    return (
        <div className="kiosk-page">

            {/* --------------------------------
                HEADER
            -------------------------------- */}
            <header className="kiosk-header">

                <div
                    className="kiosk-logo"
                    onClick={() => navigate("/")}
                >

                    <div className="logo-icon">
                        +
                    </div>

                    <div className="logo-text">
                        <h2>MediBridge</h2>
                        <span>AI Healthcare Kiosk</span>
                    </div>

                </div>

                <button
                    className="home-button"
                    onClick={() => navigate("/")}
                >
                    ← Home
                </button>

            </header>


            {/* --------------------------------
                MAIN CONTENT
            -------------------------------- */}
            <main className="kiosk-main">

                <section className="kiosk-card">

                    {/* TITLE */}
                    <div className="kiosk-title">

                        <div className="title-icon">
                            📷
                        </div>

                        <div>

                            <h1>
                                Upload Your Photo
                            </h1>

                            <p>
                                Select a photo from your phone or capture
                                a new photo using the kiosk camera.
                            </p>

                        </div>

                    </div>


                    {/* --------------------------------
                        IMAGE PREVIEW
                    -------------------------------- */}
                    {selectedImage ? (

                        <div className="preview-section">

                            <div className="preview-label">

                                <span>
                                    Photo Preview
                                </span>

                                <button
                                    className="remove-button"
                                    onClick={removeImage}
                                >
                                    ✕ Remove
                                </button>

                            </div>

                            <div className="image-preview-box">

                                <img
                                    src={selectedImage.url}
                                    alt="Selected"
                                    className="selected-image"
                                />

                            </div>

                            <div className="preview-info">

                                <span>
                                    ✓ Photo selected
                                </span>

                                <span>
                                    Source:{" "}
                                    {selectedImage.source === "phone"
                                        ? "Phone"
                                        : "Camera"}
                                </span>

                            </div>

                            <button
                                className="confirm-button"
                                onClick={confirmPhoto}
                            >
                                ✓ Confirm & Continue
                            </button>

                        </div>

                    ) : (

                        /* --------------------------------
                           UPLOAD OPTIONS
                        -------------------------------- */
                        <div className="upload-options">

                            {/* PHONE OPTION */}
                            <div className="upload-option phone-option">

                                <div className="option-icon">
                                    📱
                                </div>

                                <h2>
                                    Select from Phone
                                </h2>

                                <p>
                                    Select a photo stored on your phone
                                    or connected device.
                                </p>

                                <button
                                    className="primary-option-button"
                                    onClick={() =>
                                        fileInputRef.current.click()
                                    }
                                >
                                    📁 Select Photo
                                </button>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhoneImage}
                                    style={{ display: "none" }}
                                />

                            </div>


                            {/* DIVIDER */}
                            <div className="or-divider">
                                <span>OR</span>
                            </div>


                            {/* CAMERA OPTION */}
                            <div className="upload-option camera-option">

                                <div className="option-icon">
                                    📷
                                </div>

                                <h2>
                                    Use Kiosk Camera
                                </h2>

                                <p>
                                    Capture a new photo directly using
                                    the kiosk camera.
                                </p>

                                <button
                                    className="secondary-option-button"
                                    onClick={openCamera}
                                >
                                    📸 Open Camera
                                </button>

                            </div>

                        </div>

                    )}


                    {/* --------------------------------
                        PHONE CONNECTION + QR
                    -------------------------------- */}
                    {!selectedImage && !cameraOpen && (

                        <div className="phone-connect">

                            <div className="connect-icon">
                                📲
                            </div>

                            <div className="connect-content">

                                <h3>
                                    Want to use your phone?
                                </h3>

                                <p>
                                    Scan this QR code with your phone
                                    to connect to this kiosk.
                                </p>

                                <p>
                                    After scanning, your phone will open
                                    the MediBridge login page.
                                </p>

                                {kioskSessionId && (
                                    <small>
                                        Kiosk ID: {kioskSessionId}
                                    </small>
                                )}

                            </div>


                            {/* --------------------------------
                                DYNAMIC QR CODE
                            -------------------------------- */}
                            <div className="qr-placeholder">

                                {phoneUrl ? (

                                    <QRCodeSVG
                                        value={phoneUrl}
                                        size={150}
                                        level="H"
                                        includeMargin={true}
                                    />

                                ) : (

                                    <div className="qr-inner">
                                        Loading...
                                    </div>

                                )}

                            </div>

                        </div>

                    )}


                    {/* --------------------------------
                        MESSAGE
                    -------------------------------- */}
                    {message && (

                        <div className="kiosk-message">
                            {message}
                        </div>

                    )}

                </section>

            </main>


            {/* --------------------------------
                CAMERA MODAL
            -------------------------------- */}
            {cameraOpen && (

                <div className="camera-overlay">

                    <div className="camera-modal">

                        <div className="camera-header">

                            <h2>
                                Capture Photo
                            </h2>

                            <button
                                onClick={closeCamera}
                                className="camera-close"
                            >
                                ✕
                            </button>

                        </div>

                        <div className="camera-view">

                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                            />

                            <div className="camera-frame"></div>

                        </div>

                        <canvas
                            ref={canvasRef}
                            style={{ display: "none" }}
                        />

                        <div className="camera-actions">

                            <button
                                className="cancel-camera"
                                onClick={closeCamera}
                            >
                                Cancel
                            </button>

                            <button
                                className="capture-button"
                                onClick={capturePhoto}
                            >
                                <span>●</span>
                                Capture
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Kioskside;