"use client"
import { useState } from "react";
import styles from "../page.module.css";
import Webcam from "@/components/webcam";

export default function Home() {

  const [stressLevel, setStressLevel] = useState("Loading...");
  const [isLookingAtScreen, setIsLookingAtScreen] = useState(false);

  function detectUserFace() {
      if (!isLookingAtScreen && stressLevel > 5) {
        new Notification('Stress App', {
          body: 'Stop Looking at the screen! Go take a break!'
        });
        setIsLookingAtScreen(true);
      }else if (isLookingAtScreen && stressLevel < 5) {
        setIsLookingAtScreen(false);
      }
  }
  detectUserFace();

  return (
    <div className={styles.page}>
      <Webcam setStressLevel={setStressLevel} />
      <div className="mainContent">
        <h1>{isLookingAtScreen ? "You are looking at the screen" : "You are not looking at the screen"}<br/>{stressLevel}</h1>
        
      </div>
    </div>
  );
}
