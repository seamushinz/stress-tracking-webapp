import Image from "next/image";
import styles from "./page.module.css";
import Webcam from "@/components/webcam";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Webcam/>
        </main>
    </div>
  );
}
