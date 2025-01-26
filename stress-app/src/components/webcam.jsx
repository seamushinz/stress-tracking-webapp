"use client"
import { useEffect, useState } from 'react';
import styles from '../app/page.module.css';
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";

export default function Webcam() {
   const [blendShapes, setBlendShapes] = useState([]);

   useEffect(() => {
       const video = document.getElementById("webcam");
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
               video.onloadedmetadata = () => {
                   video.play();
                   createTask();
               };
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
                       modelAssetPath: "/models/face_landmarker.task"
                   },
                   runningMode: 'VIDEO',
                   outputFaceBlendshapes: true,
                   outputFaceLightshapes: true
               }
           );

           await faceLandmarker.setOptions({ runningMode: "VIDEO" });

           let lastVideoTime = -1;

           function renderLoop() {
               if (video.currentTime !== lastVideoTime) {
                   const faceLandmarkerResult = faceLandmarker.detectForVideo(video, performance.now());
                   if (faceLandmarkerResult.faceLandmarks) {
                       if (faceLandmarkerResult.faceBlendshapes) {
                           //console.log("Blendshapes detected:", faceLandmarkerResult.faceBlendshapes[0].categories);
                           setBlendShapes(faceLandmarkerResult.faceBlendshapes[0].categories);
                       }
                       lastVideoTime = video.currentTime;
                   }
               }
               requestAnimationFrame(renderLoop);
           }

           renderLoop();
       }
   }, []);

   return (
    <div className={styles.container}>
        <div style={{ display: 'flex' }}>
            <div>
                <video id="webcam" autoPlay playsInline muted className='webcam'></video>
            </div>
        </div>
    </div>
   );
}
