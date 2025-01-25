"use client"
import { useEffect } from 'react';
            import styles from '../app/page.module.css';

            export default function Webcam({ title, description }) {
                useEffect(() => {
                    // Put variables in global scope to make them available to the browser console.
                    const video = document.querySelector("video");
                    const constraints = {
                        audio: false,
                        video: true,
                    };

                    navigator.mediaDevices
                        .getUserMedia(constraints)
                        .then((stream) => {
                            const videoTracks = stream.getVideoTracks();
                            console.log("Got stream with constraints:", constraints);
                            console.log(`Using video device: ${videoTracks[0].label}`);
                            stream.onremovetrack = () => {
                                console.log("Stream ended");
                            };
                            video.srcObject = stream;
                        })
                        .catch((error) => {
                            if (error.name === "OverconstrainedError") {
                                console.error(
                                    `The resolution ${constraints.video.width.exact}x${constraints.video.height.exact} px is not supported by your device.`,
                                );
                            } else if (error.name === "NotAllowedError") {
                                console.error(
                                    "You need to grant this page permission to access your camera and microphone.",
                                );
                            } else {
                                console.error(`getUserMedia error: ${error.name}`, error);
                            }
                        });
                }, []);

                return (
                    <div className={styles.container}>
                        <h2 className={styles.title}>Webcam</h2>
                        <p className={styles.description}>This is a webcam test.</p>
                        <video autoPlay playsInline muted></video>
                    </div>
                );
            }