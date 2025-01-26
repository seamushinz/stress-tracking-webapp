"use client"
import { useState } from "react";
import styles from "./page.module.css";
import Webcam from "@/components/webcam";
import NotificationRequestButton from "@/components/notificationRequestButton";
import DestresserPickButton from "@/components/destresserPickButton";

export default function Home() {

  const [stressLevel, setStressLevel] = useState("Loading...");
  const [isOverStressed, setIsOverStressed] = useState(false);

  const stressTexts = [
    { range: [0, 20], text: "Restful Rabbit" },
    { range: [20, 40], text: "Worried Wombat" },
    { range: [40, 60], text: "Tense Tortoise" },
    { range: [60, 80], text: "Frazzled Fox" },
    { range: [80, 100], text: "Panicked Peacock" },
  ];
  function detectHighStress() {
      if (!isOverStressed && stressLevel > 45) {
        new Notification('Stress App', {
          body: 'You\'re stressed! Take a break!'
        });
        setIsOverStressed(true);
      }
  }
  detectHighStress();

  const getStressText = (level) => {
    const entry = stressTexts.find(
      (item) => level >= item.range[0] && level < item.range[1]
    );
    return entry ? entry.text : "Unknown Stress Level"
  }

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
              <h1 className="stressTitle">Your Stress level is: <br/>{getStressText(stressLevel)}</h1>
              <p className="stressDescription">This is where a tidbit of knowledge would show up. too stressed? maybe take a break! Stress levels fine?
                keep on keeping on! text. Our Bonzai buddy/clippy clone has this to say to you:
                “Why did the chicken cross the road? Because he was too stressed!”.</p>
                {isOverStressed ? (
              <div className="destresserPick">
                <DestresserPickButton route={"/breathingExcercise"} destresserName={"Breathing Excercise"} />
                <DestresserPickButton route={"/stepAwayFromComputer"} destresserName={"Take A Screen Break"} />
                <DestresserPickButton route={"/breathingExcercise"} destresserName={"Breathing Excercise"} />
              </div>
            ) : null}
            </div>
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
