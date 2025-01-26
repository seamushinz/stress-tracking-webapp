"use client"
import { useState } from "react";
import styles from "./page.module.css";
import Webcam from "@/components/webcam";
import NotificationRequestButton from "@/components/notificationRequestButton";

export default function Home() {

  const [stressLevel, setStressLevel] = useState("Loading...");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="mainContent">
          <div className="main">
            <div className="menu">
              <NotificationRequestButton/>
              <button className="menuButton">Options</button>
              <button className="menuButton">Github</button>
            </div>
            <div className="stressText">
              <h1 className="stressTitle">Your Stress level is: <br/>__Example__</h1>
              <p className="stressDescription">This is where a tidbit of knowledge would show up. too stressed? maybe take a break! Stress levels fine?
                keep on keeping on! text. Our Bonzai buddy/clippy clone has this to say to you:
                “Why did the chicken cross the road? Because he was too stressed!”.</p>
            </div>
            <DestresserPickButton route={"/breathingExcercise"} destresserName={"Breathing Excercise"} />
          </div>
          <div className="sidebar">
            <Webcam setStressLevel={setStressLevel} />
            <h5 className="stressPercent">{stressLevel}% Stress</h5>
            <p>Stress bar to go here</p>
          </div>
        </div>
        <div className="mascot section">
          <p>grass goes here</p>
          <p>mascot goes here</p>
        </div>
        </main>
    </div>
  );
}
