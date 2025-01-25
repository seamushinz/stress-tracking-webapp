'use client'

import { useState } from "react";

export default function TestPage() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    const sendTestMessage = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/test", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });
            const data = await res.json();
            setResponse(data.received_message);
        } catch (err) {
            console.error("Error connecting to backend:", err);
            setResponse("Failed to connect to backend");
        }
    };

    return (
        <div>
            <h1>Test Frontend-to-Backend Connection</h1>
            <input
                type = "text"
                placeholder="Enter a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendTestMessage}>Send</button>
            {response && <p>Response from backend: {response}</p>}
        </div>
    );
}
