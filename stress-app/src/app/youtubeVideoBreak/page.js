'use client'
import React, { useState, useEffect} from 'react';

const videoCategories = {
  animals: [
    'https://www.youtube.com/embed/KwpN0dMeJHI?si=xnu4zOHaXBztIaeU&amp;controls=0',
    'https://www.youtube.com/embed/BWAnHej2vH8?si=NA8AVTvrBv77IlWN&amp;controls=0',
    'https://www.youtube.com/embed/-0y_JwvGIfc?si=XfeDW6d-QPA8wAxO&amp;controls=0',
  ],
  education: [
    'https://www.youtube.com/watch?v=4',
    'https://www.youtube.com/watch?v=5',
    'https://www.youtube.com/watch?v=6',
  ],
  nature: [
    'https://www.youtube.com/watch?v=7',
    'https://www.youtube.com/watch?v=8',
    'https://www.youtube.com/watch?v=9',
  ],
  music: [
    'https://www.youtube.com/watch?v=10',
    'https://www.youtube.com/watch?v=11',
    'https://www.youtube.com/watch?v=12',
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
    <div>
      <h1>Relax with a YouTube Video</h1>
      <div>
        <button onClick={() => handleButtonClick('animals')}>Animals</button>
        <button onClick={() => handleButtonClick('education')}>Education</button>
        <button onClick={() => handleButtonClick('nature')}>Nature</button>
        <button onClick={() => handleButtonClick('music')}>Music</button>
      </div>
      {videoUrl && (
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
    </div>
  );
};

export default YoutubeVideoBreak;
