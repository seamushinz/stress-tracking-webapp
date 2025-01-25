"use client"
    import styles from "./page.module.css";
    import Webcam from "@/components/webcam";
    import NotificationRequestButton from "@/components/notificationRequestButton";
    import { useEffect } from "react";

    export default function Home() {
      return (
        <div className={styles.page}>
          <main className={styles.main}>
            <NotificationRequestButton/>
          </main>
        </div>
      );
    }