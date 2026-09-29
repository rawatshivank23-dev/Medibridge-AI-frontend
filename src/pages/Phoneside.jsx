import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Phoneside.css";

function Phoneside() {
    const navigate = useNavigate();

    const fileInputRef = useRef(null);

    const [selectedImage, setSelectedImage] = useState(null);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [message, setMessage] = useState("");

    // --------------------------------
    // SELECT PHOTO
    // --------------------------------
    const handleSelectPhoto = (event) => {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        // Check image
        if (!file.type.startsWith("image/")) {
            setMessage("Please select a valid image.");
            return;
        }

        // Maximum 10 MB
        if (file.size > 10 * 1024 * 1024) {
            setMessage("Image size should be less than 10 MB.");
            return;
        }

        const imageUrl = URL.createObjectURL(file);

        setSelectedImage({
            file: file,
            url: imageUrl,
            name: file.name,
            size: file.size,
        });

        setSent(false);
        setMessage("");
    };

    // --------------------------------
    // REMOVE PHOTO
    // --------------------------------
    const removePhoto = () => {
        if (selectedImage?.url) {
            URL.revokeObjectURL(selectedImage.url);
        }

        setSelectedImage(null);
        setSent(false);
        setMessage("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // --------------------------------
    // SEND PHOTO TO KIOSK
    // --------------------------------
    const sendToKiosk = () => {
        if (!selectedImage) {
            setMessage("Please select a photo first.");
            return;
        }

        setSending(true);
        setMessage("");

        /*
          ==========================================
          FUTURE BACKEND CONNECTION
          ==========================================

          Later we will send the actual image using:

          const formData = new FormData();
          formData.append("photo", selectedImage.file);

          fetch("BACKEND_URL", {
            method: "POST",
            body: formData
          });

          ==========================================
        */

        // Temporary simulation
        setTimeout(() => {
            setSending(false);
            setSent(true);
            setMessage("Photo sent successfully to the kiosk.");
        }, 1500);
    };

    // --------------------------------
    // CHANGE PHOTO
    // --------------------------------
    const changePhoto = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // --------------------------------
    // RESET
    // --------------------------------
    const selectAnotherPhoto = () => {
        removePhoto();

        setTimeout(() => {
            if (fileInputRef.current) {
                fileInputRef.current.click();
            }
        }, 100);
    };

    return (
        <div className="phone-page">

            {/* =================================
                HEADER
            ================================= */}

            <header className="phone-header">

                <div
                    className="phone-logo"
                    onClick={() => navigate("/")}
                >

                    <div className="phone-logo-icon">
                        +
                    </div>

                    <div className="phone-logo-text">
                        <h2>MediBridge</h2>
                        <span>AI Healthcare</span>
                    </div>

                </div>

                <button
                    className="phone-home-button"
                    onClick={() => navigate("/")}
                >
                    ← Home
                </button>

            </header>


            {/* =================================
                MAIN
            ================================= */}

            <main className="phone-main">

                <div className="phone-card">

                    {/* =================================
                        TOP ICON
                    ================================= */}

                    <div className="phone-top-icon">
                        📱
                    </div>


                    {/* =================================
                        TITLE
                    ================================= */}

                    <h1>
                        Send Photo to Kiosk
                    </h1>

                    <p className="phone-subtitle">
                        Select a photo from your phone and
                        send it directly to the MediBridge kiosk.
                    </p>


                    {/* =================================
                        CONNECTION STATUS
                    ================================= */}

                    <div className="connection-status">

                        <div className="status-dot"></div>

                        <div>
                            <strong>Kiosk Connected</strong>
                            <span>MediBridge Healthcare Kiosk</span>
                        </div>

                    </div>


                    {/* =================================
                        HIDDEN FILE INPUT
                    ================================= */}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleSelectPhoto}
                        style={{ display: "none" }}
                    />


                    {/* =================================
                        NO IMAGE SELECTED
                    ================================= */}

                    {!selectedImage && !sent && (

                        <div className="phone-upload-area">

                            <div className="phone-upload-icon">
                                🖼️
                            </div>

                            <h2>
                                Select Your Photo
                            </h2>

                            <p>
                                Choose a photo from your phone
                                gallery.
                            </p>

                            <button
                                className="select-photo-button"
                                onClick={() => fileInputRef.current.click()}
                            >
                                📁 Select Photo
                            </button>

                            <div className="supported-text">
                                JPG, JPEG, PNG • Maximum 10 MB
                            </div>

                        </div>

                    )}


                    {/* =================================
                        IMAGE PREVIEW
                    ================================= */}

                    {selectedImage && !sent && (

                        <div className="phone-preview-section">

                            <div className="preview-heading">

                                <span>
                                    Selected Photo
                                </span>

                                <button
                                    className="change-photo-button"
                                    onClick={changePhoto}
                                >
                                    Change
                                </button>

                            </div>


                            <div className="phone-image-box">

                                <img
                                    src={selectedImage.url}
                                    alt="Selected"
                                />

                            </div>


                            <div className="image-details">

                                <div>

                                    <strong>
                                        {selectedImage.name}
                                    </strong>

                                    <span>
                                        {(
                                            selectedImage.size / 1024 / 1024
                                        ).toFixed(2)}{" "}
                                        MB
                                    </span>

                                </div>

                                <button
                                    className="remove-photo-button"
                                    onClick={removePhoto}
                                >
                                    ✕
                                </button>

                            </div>


                            {/* =================================
                                SEND BUTTON
                            ================================= */}

                            <button
                                className="send-kiosk-button"
                                onClick={sendToKiosk}
                                disabled={sending}
                            >

                                {sending ? (
                                    <>
                                        <span className="loading-circle"></span>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        📤 Send to Kiosk
                                    </>
                                )}

                            </button>

                        </div>

                    )}


                    {/* =================================
                        SUCCESS
                    ================================= */}

                    {sent && (

                        <div className="success-section">

                            <div className="success-icon">
                                ✓
                            </div>

                            <h2>
                                Photo Sent Successfully
                            </h2>

                            <p>
                                Your photo has been sent to the
                                MediBridge kiosk.
                            </p>


                            <div className="success-preview">

                                <img
                                    src={selectedImage.url}
                                    alt="Sent"
                                />

                            </div>


                            <button
                                className="another-photo-button"
                                onClick={selectAnotherPhoto}
                            >
                                📷 Select Another Photo
                            </button>

                            <button
                                className="back-home-button"
                                onClick={() => navigate("/")}
                            >
                                ← Back to Home
                            </button>

                        </div>

                    )}


                    {/* =================================
                        MESSAGE
                    ================================= */}

                    {message && (

                        <div className="phone-message">
                            {message}
                        </div>

                    )}


                    {/* =================================
                        PRIVACY
                    ================================= */}

                    <div className="privacy-note">

                        <span>🔒</span>

                        <p>
                            Your photo is securely transferred
                            to the connected MediBridge kiosk.
                        </p>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Phoneside;