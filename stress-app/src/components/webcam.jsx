"use client"
import { useEffect, useState } from 'react';
import styles from '../app/page.module.css';
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";

export default function Webcam({ setStressLevel }) {
   const [blendShapes, setBlendShapes] = useState([]);
   const throttleInterval = 500;
   let lastSentTime = 0;

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
                           const detectedBlendshapes = faceLandmarkerResult.faceBlendshapes[0].categories
                           //console.log("Blendshapes detected:", detectedBlendshapes);
                           setBlendShapes(detectedBlendshapes);

                           const now = Date.now();
                           if (now - lastSentTime >= throttleInterval) {
                            lastSentTime = now;
                            sendBlendshapesToBackend(detectedBlendshapes);
                           }
                       }
                       lastVideoTime = video.currentTime;
                   }
               }
               requestAnimationFrame(renderLoop);
           }

           renderLoop();
       }

       async function sendBlendshapesToBackend(blendshapeData) {
        const selectedFeatures = [
            "browDownLeft",
            "browDownRight",
            "browOuterUpLeft",
            "browOuterUpRight",
            "jawClench",
            "mouthFrownLeft",
            "mouthFrownRight",
            "eyeSquintLeft",
            "eyeSquintRight",
            "eyeBlinkLeft",
            "eyeBlinkRight",
            "mouthPucker",
            "browInnerUp",
            "mouthShrugLower",
            "mouthShrugUpper",
            "jawOpen",
        ];
  
        const filteredData = blendshapeData.reduce((acc, shape) => {
          if (selectedFeatures.includes(shape.categoryName)) {
            acc[shape.categoryName] = shape.score;
          }
          return acc;
        }, {});
  
        //console.log("Filtered Data Sent to Backend:", filteredData);

        try {
          const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filteredData),
          });
  
          const result = await response.json();
          setStressLevel(result.stress_percentage.toFixed(2));
          //console.log("Backend Response:", result);
          
        } catch (err) {
          setStressLevel("Error");
          console.error("Error sending blendshapes to backend:", err);
        }
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
