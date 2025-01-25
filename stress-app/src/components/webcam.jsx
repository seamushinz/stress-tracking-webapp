"use client"
import { useEffect, useState } from 'react';
import styles from '../app/page.module.css';
import { FilesetResolver, FaceLandmarker, DrawingUtils } from "@mediapipe/tasks-vision";

export default function Webcam() {
    const [blendShapes, setBlendShapes] = useState([]);

    useEffect(() => {
        const video = document.getElementById("webcam");
        const canvasElement = document.getElementById("output_canvas");
        const canvasCtx = canvasElement.getContext("2d");

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

        async function createTask() {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
            );
            const faceLandmarker = await FaceLandmarker.createFromOptions(
                vision,
                {
                    baseOptions: {
                        modelAssetPath: "/public/models/blaze_face_short_range.tflite"
                    },
                    runningMode: 'VIDEO',
                    outputFaceBlendshapes: true,
                    outputFaceLightshapes: true
                }
            );

            await faceLandmarker.setOptions({ runningMode: "VIDEO" });

            let lastVideoTime = -1;
            const drawingUtils = new DrawingUtils(canvasCtx);

            function renderLoop() {
                if (video.currentTime !== lastVideoTime) {
                    const faceLandmarkerResult = faceLandmarker.detectForVideo(video, performance.now());
                    if (faceLandmarkerResult.faceLandmarks) {
                        if (faceLandmarkerResult.faceBlendshapes) {
                            setBlendShapes(faceLandmarkerResult.faceBlendshapes[0].categories);
                        }
                        lastVideoTime = video.currentTime;
                    }
                }
                requestAnimationFrame(renderLoop);
            }

            renderLoop();
        }

        createTask();
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Webcam</h2>
            <p className={styles.description}>This is a webcam test.</p>
            <video id="webcam" autoPlay playsInline muted></video>
            <canvas className="output_canvas" id="output_canvas"></canvas>
            <ul>
                {blendShapes.map((shape, index) => (
                    <li key={index}>
                        {shape.displayName || shape.categoryName}: {shape.score.toFixed(4)}
                    </li>
                ))}
            </ul>
        </div>
    );
}