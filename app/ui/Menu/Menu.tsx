"use client";
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import BG from "@/assets/bg.jpg";
import Link from 'next/link';

const Menu: React.FC = () => {
  const links: Array<{ id: number, path: string, title: string }> = [
    { id: 1, path: "/dashboard/level-one", title: "Start" },
    { id: 2, path: "/settings", title: "Settings" },
    { id: 3, path: "/quit", title: "Quit" },
  ];
  const audioRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log('Autoplay blocked by browser:', error);
      });
    }
  };
  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };
  
  return (
    <div className='w-[100%] h-[100vh] relative flex justify-center items-center'>
      <Image src={BG} alt='bg' width={10000} height={10000} className='w-[100%] h-[100%] object-cover absolute z-[-1] brightness-75' />
      <audio controls ref={audioRef} className='absolute top-0 opacity-0'>
        <source src="/audio/music.mp3" type="audio/mpeg" />
      </audio>
      <div className='max-w-[400px] w-[100%] shadow-md'>
        <ul className='flex flex-col w-[100%] gap-[10px] items-center'>
          {
            links?.map((item, index) => {
              return (
                <li onMouseEnter={handlePlay} onMouseLeave={handlePause} onClick={handlePlay} key={index} className='bg-[#ffffff3e] w-[100%] h-[100%] py-[10px] px-[20px] rounded-md cursor-pointer duration-75 text-center ease-linear hover:border-[#ffffff57] backdrop-blur-md hover:bg-[#ffffff57] border-transparent border'>
                  <Link href={item?.path} className='text-white text-[24px] text-center'>{item?.title}</Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default Menu;
