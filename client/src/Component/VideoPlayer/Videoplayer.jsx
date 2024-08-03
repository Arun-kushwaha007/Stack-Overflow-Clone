import React, { useRef, useState, useEffect } from "react";
import "./videoplayer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeOff } from '@fortawesome/free-regular-svg-icons'


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
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const skipIntervalRef = useRef(null);
  const fastForwardIntervalRef = useRef(null);
  const [resolution, setResolution] = useState("720p");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const hideControlsTimeoutRef = useRef(null);

  useEffect(() => {
    const video = mediaRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext("2d");

      const drawFrame = () => {
        const { width, height } = resolutions[resolution];
        canvas.width = width;
        canvas.height = height;

        if (video && context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(video, 0, 0, width, height);
        }

        if (video && !video.paused && !video.ended) {
          requestAnimationFrame(drawFrame);
        }
      };

      video.addEventListener("play", drawFrame);
      video.addEventListener("timeupdate", () => {
        setCurrentTime(video.currentTime);
        setDuration(video.duration);
      });

      return () => {
        video.removeEventListener("play", drawFrame);
        video.removeEventListener("timeupdate", () => {
          setCurrentTime(video.currentTime);
          setDuration(video.duration);
        });
      };
    }
  }, [resolution]);

  const handlePlayPause = () => {
    if (mediaRef.current) {
      if (mediaRef.current.paused) {
        mediaRef.current.play();
        setIsPlaying(true);
      } else {
        mediaRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVolumeChange = (event) => {
    if (mediaRef.current) {
      mediaRef.current.volume = event.target.value;
    }
  };

  const handleFullScreen = () => {
    if (canvasRef.current && canvasRef.current.requestFullscreen) {
      canvasRef.current.requestFullscreen();
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && mediaRef.current) {
      const url = URL.createObjectURL(file);
      mediaRef.current.src = url;
    }
  };

  const handleResolutionChange = (event) => {
    setResolution(event.target.value);
  };

  const handleDoubleTap = (e) => {
    e.preventDefault();
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0) {
      const touchX = e.nativeEvent.offsetX;
      const canvasWidth = canvasRef.current.clientWidth;

      if (touchX < canvasWidth / 3) {
        mediaRef.current.currentTime -= 5;
      } else if (touchX > (2 * canvasWidth) / 3) {
        mediaRef.current.currentTime += 10;
      } else {
        handlePlayPause();
      }
    }
    setLastTap(currentTime);
  };

  const handleSkip = (e) => {
    const touchX = e.nativeEvent.offsetX;
    const canvasWidth = canvasRef.current.clientWidth;

    if (touchX < canvasWidth / 3) {
      skipIntervalRef.current = setInterval(() => {
        mediaRef.current.currentTime -= 0.1 * 3;
      }, 100);
    } else if (touchX > (2 * canvasWidth) / 3) {
      fastForwardIntervalRef.current = setInterval(() => {
        mediaRef.current.currentTime += 0.1 * 2;
      }, 100);
    }
  };

  const handleMouseUpOrLeave = () => {
    clearInterval(skipIntervalRef.current);
    clearInterval(fastForwardIntervalRef.current);
  };

  const handleTimelineChange = (event) => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = event.target.value;
      setCurrentTime(event.target.value);
    }
  };

  const showAndHideControls = () => {
    setShowControls(true);
    clearTimeout(hideControlsTimeoutRef.current);
    hideControlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000); // Hide controls after 3 seconds of inactivity
  };

  const handleMouseMove = () => {
    showAndHideControls();
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(hideControlsTimeoutRef.current);
    };
  }, []);

  return (
    <div className="video-player" onMouseMove={handleMouseMove}>
      <input type="file" accept="video/*" onChange={handleFileUpload} />
      <video ref={mediaRef} style={{ display: "none" }} />
      <canvas
        ref={canvasRef}
        className="video-element"
        onClick={handleDoubleTap}
        onMouseDown={handleSkip}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      ></canvas>
      {showControls && (
        <div className="controls">
          <button className="play-btn" onClick={handlePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <FontAwesomeIcon icon={faVolumeOff} />
          <input
            className="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            onChange={handleVolumeChange}
          />
          <input
            className="timeline"
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleTimelineChange}
          />
          <button onClick={handleFullScreen}>Full Screen</button>
          <select value={resolution} onChange={handleResolutionChange}>
            <option value="144p">144p</option>
            <option value="240p">240p</option>
            <option value="320p">320p</option>
            <option value="480p">480p</option>
            <option value="720p">720p</option>
            <option value="1080p">1080p</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Videoplayer;
