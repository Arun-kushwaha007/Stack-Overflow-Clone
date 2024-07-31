import React, { useRef, useState } from "react";
import "./videoplayer.css";

const resolutions = {
  "144p": { width: 256, height: 144 },
  "240p": { width: 426, height: 240 },
  "320p": { width: 568, height: 320 },
  "480p": { width: 854, height: 480 },
  "720p": { width: 1280, height: 720 },
  "1080p": { width: 1920, height: 1080 },
};

const Videoplayer = () => {
  const mediaRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const skipIntervalRef = useRef(null);
  const fastForwardIntervalRef = useRef(null);
  const [resolution, setResolution] = useState("720p");

  const handlePlayPause = () => {
    if (mediaRef.current.paused) {
      mediaRef.current.play();
      setIsPlaying(true);
    } else {
      mediaRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (event) => {
    mediaRef.current.volume = event.target.value;
  };

  const handleFullScreen = () => {
    if (mediaRef.current.requestFullscreen) {
      mediaRef.current.requestFullscreen();
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    mediaRef.current.src = url;
  };

  const handleResolutionChange = (event) => {
    setResolution(event.target.value);
    const { width, height } = resolutions[event.target.value];
    mediaRef.current.width = width;
    mediaRef.current.height = height;
  };

  const handleDoubleTap = (e) => {
    e.preventDefault(); // Prevent default browser behavior
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0) {
      const touchX = e.nativeEvent.offsetX;
      const videoWidth = mediaRef.current.clientWidth;

      if (touchX < videoWidth / 3) {
        // Double tap on the left side
        mediaRef.current.currentTime -= 5;
      } else if (touchX > (2 * videoWidth) / 3) {
        // Double tap on the right side
        mediaRef.current.currentTime += 10;
      } else {
        // Double tap in the middle
        handlePlayPause();
      }
    }
    setLastTap(currentTime);
  };

  const handleSkip = (e) => {
    const touchX = e.nativeEvent.offsetX;
    const videoWidth = mediaRef.current.clientWidth;

    if (touchX < videoWidth / 3) {
      // Press and hold on the left side
      skipIntervalRef.current = setInterval(() => {
        mediaRef.current.currentTime -= 0.1 * 3;
      }, 100);
    } else if (touchX > (2 * videoWidth) / 3) {
      // Press and hold on the right side
      fastForwardIntervalRef.current = setInterval(() => {
        mediaRef.current.currentTime += 0.1 * 2; // Fast forward at 2x speed
      }, 100);
    }
  };

  const handleMouseUpOrLeave = () => {
    clearInterval(skipIntervalRef.current);
    clearInterval(fastForwardIntervalRef.current);
  };

  return (
    <div className="video-player">
      <input type="file" accept="video/*" onChange={handleFileUpload} />
      <video
        ref={mediaRef}
        controls={false}
        className="video-element"
        onClick={handleDoubleTap}
        onDoubleClick={(e) => e.preventDefault()}
        onMouseDown={handleSkip}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      ></video>
      <div className="controls">
        <button onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={handleFullScreen}>Full Screen</button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          onChange={handleVolumeChange}
        />
        <select value={resolution} onChange={handleResolutionChange}>
          <option value="144p">144p</option>
          <option value="240p">240p</option>
          <option value="320p">320p</option>
          <option value="480p">480p</option>
          <option value="720p">720p</option>
          <option value="1080p">1080p</option>
        </select>
      </div>
    </div>
  );
};

export default Videoplayer;
