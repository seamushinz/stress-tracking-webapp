"use client"
import React, { useState, useEffect } from 'react';

export default function BreathingExercise() {
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationComplete(true);
        }, 16000); // 8s animation * 2 cycles = 16s

        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={containerStyle}>
          <div style={contentStyle}>
            <h1>Time your breathing with the circle's pulses</h1>
          </div>
            <div style={circleStyle}></div>
            {animationComplete && (
                <button style={buttonStyle} onClick={() => window.location.href = '/'}>Return to App</button>
            )}
            <style jsx>{`
                @keyframes breathe {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.5); }
                    85% { transform: scale(1); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    textAlign: "center",
    tranform: "translateY(-20%)",
};

const contentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "40px",
    marginBottom: "10vh",
}

const circleStyle = {
    width: '150px',
    height: '150px',
    backgroundColor: '#4CAF50',
    borderRadius: '50%',
    animation: 'breathe 8s ease-in-out 2',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)'
};

const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer'
};