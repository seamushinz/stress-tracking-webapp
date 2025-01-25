import Image from "next/image";
import styles from "./page.module.css";
import Webcam from "@/components/webcam";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Stress Test</h1>
        <p className={styles.description}>This is a stress test application.</p>
        <Webcam/>
        </main>
    </div>
  );
}
