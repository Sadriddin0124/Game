"use client"
import React, { useEffect, useRef, useState } from 'react'
import Menu from '../ui/Menu/Menu'
import Welcome from '../ui/Welcome/Welcome';

const Dashboard = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [switchPage, setSwitchPage] = useState<boolean>(false)
  const handlePlayVideo = () => {
    if (videoRef.current && !hasStarted) {
      videoRef.current.play().catch((error) => {
        console.log('Autoplay blocked by browser:', error);
      });
      setHasStarted(true);
    }
  };
  const Play = () => {
    handlePlayVideo();
  };
  return (
    <div>
      <video 
      className='absolute opacity-0'
        ref={videoRef} 
        width="600" 
        controls 
      >
        <source src="/audio/music.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {
        switchPage ?
        <Menu/> :
        <Welcome Play={Play} setSwitchPage={setSwitchPage}/> 
      }
    </div>
  )
}

export default Dashboard
