'use client'
import React, { useState, useEffect} from 'react';
import styles from "../page.module.css";

const videoCategories = {
  animals: [
    'https://www.youtube.com/embed/KwpN0dMeJHI?si=xnu4zOHaXBztIaeU&amp;controls=0',
    'https://www.youtube.com/embed/BWAnHej2vH8?si=NA8AVTvrBv77IlWN&amp;controls=0',
    'https://www.youtube.com/embed/-0y_JwvGIfc?si=XfeDW6d-QPA8wAxO&amp;controls=0',
  ],
  education: [
    'https://www.youtube.com/embed/Zl_5LT2fzak?si=QERrUZVzo9iPnuWU&amp;controls=0',
    'https://www.youtube.com/embed/TFpzps-DCb0?si=KkFYnJGEyJ5OXSff&amp;controls=0',
    'https://www.youtube.com/embed/egEraZP9yXQ?si=7RoJABv47IYs-pXM&amp;controls=0',
  ],
  nature: [
    'https://www.youtube.com/embed/7ZhdXgRfxHI?si=8lr0UjPZHr_E4DV6&amp;controls=0',
    'https://www.youtube.com/embed/bj2t7yGA_0M?si=rmWfpu3f9xknnGwK&amp;controls=0',
    'https://www.youtube.com/embed/GjPIvvxIQME?si=SlUOn_oydrnXaSBF&amp;controls=0',
  ],
  music: [
    'https://www.youtube.com/embed/dnBAU8Co6PA?si=oy5SreMJWy5D6IJ8&amp;controls=0',
    'https://www.youtube.com/embed/z-qigE1ym40?si=WEXdFRaYctnpRC2W&amp;controls=0',
    'https://www.youtube.com/embed/bnRjV69xTak?si=5F_R-i2_-L2qXAID&amp;controls=0',
  ],
};

const YoutubeVideoBreak = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [breakComplete, setBreakComplete] = useState(false);
  const [countdown, setCountdown] = useState(120); // 2 minutes countdown

  useEffect(() => {
    if (videoUrl) {
      const timer = setTimeout(() => {
        setBreakComplete(true);
      }, 2 * 60 * 1000); // 2 minute break

      const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [videoUrl]);

  const handleButtonClick = (category) => {
    const videos = videoCategories[category];
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    setVideoUrl(randomVideo);
    setBreakComplete(false);
    setCountdown(120); // reset countdown
  };

  const value = (countdown/(2*60))*100;

  return (
    <div style={containerStyle}>
      <h1>Relax with a YouTube Video</h1>
      {!videoUrl && (
      <div>
        <button style={buttonStyle} onClick={() => handleButtonClick('animals')}>Animals</button>
        <button style={buttonStyle} onClick={() => handleButtonClick('education')}>Education</button>
        <button style={buttonStyle} onClick={() => handleButtonClick('nature')}>Nature</button>
        <button style={buttonStyle} onClick={() => handleButtonClick('music')}>Music</button>
      </div>
      )}
      {videoUrl && !breakComplete && (
        <div>
          <h2>Enjoy your video!</h2>
          <iframe
           width="560" 
           height="315"
           src={videoUrl}
           title="YouTube video player"
           frameBorder="0" 
           allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;
            web-share" referrerPolicy="strict-origin-when-cross-origin"/>
          <h3>Time remaining: {Math.floor(countdown / 60)}:{('0' + (countdown % 60)).slice(-2)}</h3>
          <div className="progress-bar">
              <div className="progress" style={{width: `${value}%`}}></div>
          </div>
        </div>
      )}
      {breakComplete && (
        <div>
          <h2>Break Complete!</h2>
          <button style={buttonStyle} onClick={() => window.location.href = '/'}>Return to App</button>
        </div>
      )}
    </div>
  );
};

export default YoutubeVideoBreak;


const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  fontFamily: 'Arial, sans-serif',
  textAlign: 'center',
};

const buttonStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  margin: '10px',
  fontSize: '16px',
  cursor: 'pointer'
};