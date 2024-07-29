import React, { useRef, useState } from 'react';
import './videoplayer.css'


const Videoplayer = () => {
    const videoRef = useRef(null);
    const [currentResolution, setCurrentResolution] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [resolutions, setResolutions] = useState({});
    const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
    const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  
    const handleResolutionChange = (event) => {
      const selectedResolution = event.target.value;
      setCurrentResolution(selectedResolution);
      const currentTime = videoRef.current.currentTime;
      videoRef.current.src = resolutions[selectedResolution];
      videoRef.current.currentTime = currentTime;
      if (isPlaying) {
        videoRef.current.play();
      }
    };
  
    const handlePlayPause = () => {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };
  
    const handleVolumeChange = (event) => {
      videoRef.current.volume = event.target.value;
    };
  
    const handleFullScreen = () => {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    };
  
    const handleTouchStart = (event) => {
      const touch = event.touches[0];
      setTouchStart({ x: touch.clientX, y: touch.clientY });
    };
  
    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      setTouchEnd({ x: touch.clientX, y: touch.clientY });
    };
  
    const handleTouchEnd = () => {
      const deltaX = touchEnd.x - touchStart.x;
      const deltaY = touchEnd.y - touchStart.y;
  
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 30) {
          // Swipe right -> Seek forward
          videoRef.current.currentTime += 10;
        } else if (deltaX < -30) {
          // Swipe left -> Seek backward
          videoRef.current.currentTime -= 10;
        }
      } else {
        // Vertical swipe
        if (deltaY > 30) {
          // Swipe down -> Decrease volume
          videoRef.current.volume = Math.max(videoRef.current.volume - 0.1, 0);
        } else if (deltaY < -30) {
          // Swipe up -> Increase volume
          videoRef.current.volume = Math.min(videoRef.current.volume + 0.1, 1);
        }
      }
    };
  
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      const resolutions = {
        '144p': url,
        '240p': url,
        '320p': url,
        '480p': url,
        '720p': url,
        '1080p': url,
      };
      setResolutions(resolutions);
      setCurrentResolution('720p');
      videoRef.current.src = resolutions['720p'];
    };
  
    return (
      <div className="video-player">
        <input type="file" accept="video/*" onChange={handleFileUpload} />
        <video
          ref={videoRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          controls={false}
        ></video>
        <div className="controls">
          <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
          <button onClick={handleFullScreen}>Full Screen</button>
          <input type="range" min="0" max="1" step="0.01" onChange={handleVolumeChange} />
          <select value={currentResolution} onChange={handleResolutionChange}>
            {Object.keys(resolutions).map((res) => (
              <option key={res} value={res}>
                {res}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
}

export default Videoplayer