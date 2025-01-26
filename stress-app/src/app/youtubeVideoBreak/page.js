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

  useEffect(() => {
    if (videoUrl) {
      const timer = setTimeout(() => {
        setBreakComplete(true);
      }, 2 * 60 * 1000); // 2 minute break

      return () => clearTimeout(timer);
    }
  }, [videoUrl]);

  const handleButtonClick = (category) => {
    const videos = videoCategories[category];
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    setVideoUrl(randomVideo);
  };

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
        </div>
      )}
        {breakComplete && (
                <button style={buttonStyle} onClick={() => window.location.href = '/'}>Return to App</button>
      )}
    </div>
  );
};

export default YoutubeVideoBreak;


const buttonStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer'
};
