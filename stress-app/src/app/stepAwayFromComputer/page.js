"use client"
import { useState, useEffect, useRef } from "react";
import styles from "../page.module.css";
import Webcam from "@/components/webcam";
import { Container } from "postcss";

export default function BreakTimer() {
  const [stressLevel, setStressLevel] = useState("Loading...");
  const [timeAway, setTimeAway] = useState(0);
  const [breakComplete, setBreakComplete] = useState(false);
  const timerRunningRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (stressLevel === "Loading..." && !breakComplete) {
      if (!timerRunningRef.current) {
        timerRunningRef.current = true;
        timerRef.current = setInterval(() => {
          setTimeAway((prev) => prev + 1);
        }, 1000);
     }
    } else {
      timerRunningRef.current = false;
      setTimeAway(0);
      clearInterval(timerRef.current)
    }

    return () => clearInterval(timerRef.current);
  }, [stressLevel, breakComplete]);

  useEffect(() => {
    if (timeAway >= 10 && !breakComplete) {
      new Notification("Great job!", {
        body: "You've looked away from your screen for 2 minutes!",
      });
      setBreakComplete(true);
      clearInterval(timerRef.current);
      timerRunningRef.current = false;
    }
  }, [timeAway, breakComplete]);

  return (
    <div style={containerStyle}>
      <Webcam setStressLevel={setStressLevel} />
      <div style={mainContentStyle}>
        {stressLevel === "Loading..." && !breakComplete ? (
          <h1>Look away from the screen! Timer: {timeAway}s</h1>
        ) : breakComplete ? (
          <h1>Break complete! Feel free to return to the app.</h1>
        ) : (
          <h1>You’re looking at the screen. Take a break!</h1>
        )}
        {breakComplete && (
                <button style={buttonStyle} onClick={() => window.location.href = '/'}>Return to App</button>
            )}
      </div>
    </div>
  )
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  height: '100vh',
  fontFamily: 'Arial, sans-serif',
  textAlign: 'center',
};

const mainContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
};

const buttonStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer'
};