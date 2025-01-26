"use client"
import { useEffect, useState, useMemo } from "react";
import styles from "./page.module.css";
import Webcam from "@/components/webcam";
import NotificationRequestButton from "@/components/notificationRequestButton";
import DestresserPickButton from "@/components/destresserPickButton";

export default function Home() {

  const [stressLevel, setStressLevel] = useState("Loading...");
  const [isOverStressed, setIsOverStressed] = useState(false);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in");

  function randomize(arr) {
    const randomized = arr;
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return randomized;
  }

  const relaxationTips = useMemo(
    () => randomize([
    "Like a wise owl, take a moment to observe the beauty around you and breathe deeply.",
    "Channel the calm of a koala, resting peacefully in the trees without a care in the world.",
    "Be like a bear, strong yet serene, finding peace in the quiet moments.",
    "Float like a jellyfish, drifting effortlessly with the rhythm of the ocean.",
    "Pause like a cat, stretching luxuriously and enjoying the present moment.",
    "Move at the pace of a sloth, slow and steady, letting go of urgency.",
    "Rest like a lion after a long day, knowing you’ve earned a moment of stillness.",
    "Soar like an eagle, rising above the noise to find clarity and calm.",
    "Wade like a flamingo, gracefully balanced, one step at a time.",
    "Hibernate like a hedgehog, retreating into yourself for moments of peace.",
    "Dive like a dolphin, playful and free, finding joy in the little things.",
    "Bloom like a butterfly, slowly emerging into the light and spreading your wings.",
    "Glow like a firefly, illuminating the world with your inner calm.",
    "Hop like a frog, leaping from one peaceful moment to the next.",
    "Swim like a turtle, steady and purposeful, enjoying the journey.",
    "Hum like a honeybee, working diligently but knowing when to rest.",
    "Curl up like a fox, finding comfort and warmth in your quiet moments.",
    "Wander like a deer, moving gracefully and savoring the stillness of nature.",
    "Prowl like a panther, calm and confident in your strength and peace.",
    "Sing like a songbird, letting your voice carry away the stress of the day."
    ]),
  []
);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        setCurrentTipIndex((prevIndex) => (prevIndex + 1) % relaxationTips.length);
        setFadeClass("fade-in");
      }, 500);
    }, 10_000);

    return () => clearInterval(interval);
  }, [relaxationTips])

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
              <p className={`stressDescription ${fadeClass}`}>{relaxationTips[currentTipIndex]}</p>
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
          <div className="grass">
            <img src="/bunnyT.png" className="bunny"/>
          </div>
        </div>
        </main>
    </div>
  );
}
