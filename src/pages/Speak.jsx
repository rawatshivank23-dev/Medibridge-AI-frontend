import React, { useEffect, useRef, useState } from "react";
import "../css/Speak.css";

function Speak() {

    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [error, setError] = useState("");
    const [inputMode, setInputMode] = useState("speak");

    const recognitionRef = useRef(null);


    // =====================================
    // COMMON PROBLEMS
    // =====================================

    const commonProblems = [
        {
            icon: "🔥",
            name: "Fever",
            text: "I have fever"
        },
        {
            icon: "🤕",
            name: "Headache",
            text: "I have headache"
        },
        {
            icon: "🤧",
            name: "Cold",
            text: "I have cold"
        },
        {
            icon: "😷",
            name: "Cough",
            text: "I have cough"
        },
        {
            icon: "🤢",
            name: "Vomiting",
            text: "I am having vomiting"
        },
        {
            icon: "🤕",
            name: "Body Pain",
            text: "I have body pain"
        },
        {
            icon: "🫃",
            name: "Stomach Pain",
            text: "I have stomach pain"
        },
        {
            icon: "😵",
            name: "Dizziness",
            text: "I am feeling dizzy"
        },
        {
            icon: "😮‍💨",
            name: "Breathing Problem",
            text: "I have difficulty breathing"
        }
    ];


    // =====================================
    // SPEECH RECOGNITION
    // =====================================

    useEffect(() => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            setError(
                "Speech recognition is not supported in this browser. Please use Google Chrome."
            );

            return;
        }


        const recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = true;

        // English - India
        recognition.lang = "en-IN";


        recognition.onstart = () => {

            setListening(true);
            setError("");

        };


        recognition.onresult = (event) => {

            let finalText = "";
            let interimText = "";

            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {

                const text =
                    event.results[i][0].transcript;

                if (event.results[i].isFinal) {

                    finalText += text;

                } else {

                    interimText += text;

                }
            }


            if (finalText) {

                setTranscript((previous) => {

                    return previous
                        ? `${previous} ${finalText}`
                        : finalText;

                });

            } else if (interimText) {

                setTranscript((previous) => {

                    return previous || interimText;

                });

            }

        };


        recognition.onerror = (event) => {

            console.error(
                "Speech recognition error:",
                event.error
            );

            setListening(false);


            if (event.error === "not-allowed") {

                setError(
                    "Microphone permission denied. Please allow microphone access."
                );

            } else if (event.error === "no-speech") {

                setError(
                    "No speech detected. Please try again."
                );

            } else {

                setError(
                    "Unable to recognize your voice. Please try again."
                );

            }

        };


        recognition.onend = () => {

            setListening(false);

        };


        recognitionRef.current = recognition;


        return () => {

            try {
                recognition.stop();
            } catch (error) {
                console.log(error);
            }

            recognitionRef.current = null;

        };

    }, []);


    // =====================================
    // START / STOP MICROPHONE
    // =====================================

    const handleMic = () => {

        if (!recognitionRef.current) {

            setError(
                "Speech recognition is not available in this browser."
            );

            return;
        }


        if (listening) {

            recognitionRef.current.stop();

            setListening(false);

        } else {

            setError("");

            try {

                recognitionRef.current.start();

            } catch (error) {

                console.error(error);

            }

        }

    };


    // =====================================
    // WRITE MODE
    // =====================================

    const handleWriteMode = () => {

        if (listening && recognitionRef.current) {

            recognitionRef.current.stop();

        }

        setListening(false);
        setInputMode("write");
        setError("");

    };


    // =====================================
    // SPEAK MODE
    // =====================================

    const handleSpeakMode = () => {

        setInputMode("speak");
        setError("");

    };


    // =====================================
    // QUICK PROBLEM SELECT
    // =====================================

    const handleQuickProblem = (problemText) => {

        setTranscript((previous) => {

            if (!previous.trim()) {

                return problemText;

            }

            return `${previous}, ${problemText}`;

        });

        setError("");

    };


    // =====================================
    // CLEAR TEXT
    // =====================================

    const handleClear = () => {

        setTranscript("");
        setError("");

    };


    // =====================================
    // ANALYZE SYMPTOMS
    // =====================================

    const handleSubmit = () => {

        if (!transcript.trim()) {

            alert(
                "Please speak, write, or select a problem first."
            );

            return;
        }


        alert(
            `Your symptoms have been captured:\n\n${transcript}\n\nAI disease analysis will be connected next.`
        );

    };


    return (

        <div className="speak-page">


            {/* =========================
                BRAND
            ========================== */}

            <div className="speak-brand">

                <span className="speak-brand-medi">
                    MediBridge
                </span>

                <span className="speak-brand-ai">
                    {" "}AI
                </span>

            </div>


            {/* =========================
                HEADER
            ========================== */}

            <div className="speak-header">

                <div className="speak-logo">
                    🩺
                </div>

                <h1>
                    Speak Your Problem
                </h1>

                <p>
                    Tell us about your symptoms using your voice
                </p>

            </div>


            {/* =========================
                INPUT MODE BUTTONS
            ========================== */}

            <div className="input-mode-buttons">

                <button
                    className={
                        inputMode === "speak"
                            ? "mode-button active-mode"
                            : "mode-button"
                    }
                    onClick={handleSpeakMode}
                >
                    🎤 Speak
                </button>


                <button
                    className={
                        inputMode === "write"
                            ? "mode-button active-mode"
                            : "mode-button"
                    }
                    onClick={handleWriteMode}
                >
                    ⌨️ Write
                </button>

            </div>


            {/* =========================
                MIC CONTAINER
            ========================== */}

            <div className="mic-container">


                {/* =========================
                    SPEAK MODE
                ========================== */}

                {inputMode === "speak" && (

                    <>

                        <div
                            className={`mic-circle ${
                                listening
                                    ? "mic-active"
                                    : ""
                            }`}
                            onClick={handleMic}
                        >

                            <span>
                                🎤
                            </span>

                        </div>


                        <h2>

                            {listening
                                ? "Listening..."
                                : "Tap the Mic to Speak"}

                        </h2>


                        <p className="mic-description">

                            {listening
                                ? "Please describe your symptoms clearly."
                                : "You can speak in English or Hindi."}

                        </p>


                        {/* Voice Waves */}

                        {listening && (

                            <div className="voice-waves">

                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>

                            </div>

                        )}


                        <button
                            className={`mic-button ${
                                listening
                                    ? "stop-button"
                                    : ""
                            }`}
                            onClick={handleMic}
                        >

                            {listening
                                ? "⏹ Stop Listening"
                                : "🎤 Start Speaking"}

                        </button>

                    </>

                )}


                {/* =========================
                    WRITE MODE
                ========================== */}

                {inputMode === "write" && (

                    <>

                        <div className="write-icon">
                            ⌨️
                        </div>


                        <h2>
                            Write Your Problem
                        </h2>


                        <p className="mic-description">
                            Type your symptoms or health problem below.
                        </p>


                        <textarea
                            className="symptom-textarea"
                            value={transcript}
                            onChange={(event) =>
                                setTranscript(
                                    event.target.value
                                )
                            }
                            placeholder="Example: I have fever, headache and cough..."
                            rows="6"
                        />

                    </>

                )}


                {/* =========================
                    TRANSCRIPT BOX
                ========================== */}

                <div className="transcript-box">

                    <div className="transcript-title">

                        <span>
                            📝 Your Problem
                        </span>


                        {transcript && (

                            <button
                                className="clear-btn"
                                onClick={handleClear}
                            >
                                Clear
                            </button>

                        )}

                    </div>


                    <div className="transcript-text">

                        {transcript ? (

                            <p>
                                {transcript}
                            </p>

                        ) : (

                            <span className="placeholder">
                                Your symptoms will appear here...
                            </span>

                        )}

                    </div>

                </div>


                {/* =========================
                    ERROR
                ========================== */}

                {error && (

                    <div className="speech-error">

                        ⚠️ {error}

                    </div>

                )}


                {/* =========================
                    ANALYZE BUTTON
                ========================== */}

                <button
                    className="analyze-button"
                    onClick={handleSubmit}
                >

                    🔍 Analyze Symptoms

                </button>

            </div>


            {/* =========================
                QUICK PROBLEMS
            ========================== */}

            <div className="quick-problems-section">

                <h2>
                    Common Problems
                </h2>

                <p>
                    Tap a problem if you cannot speak or type
                </p>


                <div className="quick-problems-grid">

                    {commonProblems.map(
                        (problem, index) => (

                            <button
                                key={index}
                                className="quick-problem-card"
                                onClick={() =>
                                    handleQuickProblem(
                                        problem.text
                                    )
                                }
                            >

                                <span className="quick-icon">
                                    {problem.icon}
                                </span>

                                <span className="quick-name">
                                    {problem.name}
                                </span>

                            </button>

                        )
                    )}

                </div>

            </div>


            {/* =========================
                EXAMPLES
            ========================== */}

            <div className="example-section">

                <h3>
                    You can say or write something like:
                </h3>


                <div className="example-list">

                    <div className="example-card">
                        🗣️ "I have fever and headache"
                    </div>

                    <div className="example-card">
                        🗣️ "Mujhe khansi aur bukhar hai"
                    </div>

                    <div className="example-card">
                        🗣️ "I have stomach pain"
                    </div>

                </div>

            </div>


            {/* =========================
                DISCLAIMER
            ========================== */}

            <div className="speak-disclaimer">

                <span>
                    ℹ️
                </span>

                <p>
                    Voice input records what you say.
                    It does not provide a medical diagnosis.
                    For medical concerns, consult a qualified healthcare professional.
                </p>

            </div>

        </div>

    );

}

export default Speak;