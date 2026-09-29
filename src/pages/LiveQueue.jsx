import React, { useEffect, useState } from "react";
import "../css/LiveQueue.css";

function LiveQueue() {

    const [currentToken, setCurrentToken] = useState(14);
    const [waitingTokens, setWaitingTokens] = useState([15, 16, 17, 18]);

    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentToken((prev) => {

                const nextToken = prev + 1;

                setWaitingTokens((oldQueue) => {
                    return [...oldQueue.slice(1), nextToken + 4];
                });

                return nextToken;
            });

        }, 15000);

        return () => clearInterval(interval);

    }, []);

    return (
        <div className="queue-page">

            {/* HEADER */}
            <header className="queue-header">

                <div>
                    <h1>MEDIBRIDGE <span>AI</span></h1>
                    <p>SMART HEALTHCARE KIOSK</p>
                </div>

                <div className="online-status">
                    <span></span>
                    SYSTEM ONLINE
                </div>

            </header>


            {/* TITLE */}
            <section className="queue-title">

                <h2>LIVE QUEUE</h2>

                <p>
                    Please wait for your token number
                </p>

            </section>


            {/* DOCTOR INFO */}
            <section className="doctor-info">

                <div>
                    <p>DOCTOR</p>
                    <h3>Dr. Rajesh Mehta</h3>
                </div>

                <div>
                    <p>DEPARTMENT</p>
                    <h3>General Medicine</h3>
                </div>

                <div>
                    <p>ROOM</p>
                    <h3>101</h3>
                </div>

            </section>


            {/* QUEUE MAIN */}
            <main className="queue-container">

                {/* NOW SERVING */}
                <div className="serving-card">

                    <div className="card-heading">
                        <span className="red-dot"></span>
                        NOW SERVING
                    </div>

                    <div className="big-token">
                        P-{String(currentToken).padStart(3, "0")}
                    </div>

                    <p>Please proceed to Room 101</p>

                </div>


                {/* YOUR TOKEN */}
                <div className="your-token-card">

                    <div className="card-heading">
                        YOUR TOKEN
                    </div>

                    <div className="your-token">
                        P-019
                    </div>

                    <div className="waiting-time">
                        <span>⏱</span>
                        Estimated wait: <strong>15 Minutes</strong>
                    </div>

                </div>


                {/* WAITING QUEUE */}
                <div className="waiting-card">

                    <div className="card-heading">
                        <span className="blue-dot"></span>
                        WAITING QUEUE
                    </div>

                    <div className="token-list">

                        {waitingTokens.map((token, index) => (

                            <div
                                className={`queue-token ${index === 0 ? "next-token" : ""
                                    }`}
                                key={token}
                            >

                                <span>
                                    P-{String(token).padStart(3, "0")}
                                </span>

                                {index === 0 && (
                                    <small>NEXT</small>
                                )}

                            </div>

                        ))}

                    </div>

                </div>

            </main>


            {/* LIVE MESSAGE */}
            <div className="live-message">

                <span className="live-circle"></span>

                Queue is updating automatically

            </div>


            {/* BUTTONS */}
            <div className="queue-buttons">

                <button
                    className="back-btn"
                    onClick={() => window.history.back()}
                >
                    ← BACK
                </button>

                <button
                    className="home-btn"
                    onClick={() => window.location.href = "/"}
                >
                    🏠 HOME
                </button>

            </div>


            {/* FOOTER */}
            <footer className="queue-footer">

                <p>
                    Need Help? Please contact MediBridge AI support desk.
                </p>

                <button>🆘 HELP</button>

            </footer>

        </div>
    );
}

export default LiveQueue;