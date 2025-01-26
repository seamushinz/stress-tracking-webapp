 import styles from "./page.module.css";
    import Webcam from "@/components/webcam";
    import NotificationRequestButton from "@/components/notificationRequestButton";

<<<<<<< Updated upstream
    export default function Home() {
      return (
        <div className={styles.page}>
          <main className={styles.main}>
            <NotificationRequestButton/>
            <Webcam />
          </main>
        </div>
      );
    }
=======
export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="main">
          <div className="menu">
            <button className="menuButton">Options</button>
            <button className="menuButton">Github</button>
          </div>
        </div>
        <div className="sidebar">
          <Webcam/>
          <h5 className="stressPercent">%Xx Stress</h5>
          <p>Stress bar to go here</p>
        </div>
        </main>
    </div>
  );
}
>>>>>>> Stashed changes
