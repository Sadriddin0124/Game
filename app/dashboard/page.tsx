"use client"
import React, { useEffect, useRef, useState } from 'react'
import Menu from '../ui/Menu/Menu'
import Welcome from '../ui/Welcome/Welcome';
import Dashboard from '@/components/Dashboard';

const Home = () => {
  const audioRef = useRef<HTMLVideoElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [switchPage, setSwitchPage] = useState<boolean>(false)
  const handlePlayVideo = () => {
    if (audioRef.current && !hasStarted) {
      audioRef.current.play().catch((error) => {
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
      <audio 
        className='absolute opacity-0'
        ref={audioRef} 
        controls 
      >
        <source src="/audio/music.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </audio>
      {
        switchPage ?
        <Menu/> :
        <Dashboard Play={Play} setSwitchPage={setSwitchPage}/> 
      }
    </div>
  )
}

export default Home
