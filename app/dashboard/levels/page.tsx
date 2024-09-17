"use client"
import Image from 'next/image'
import React, { useRef } from 'react'
import BG from "@/assets/levels.jpg"
import Link from 'next/link'
import { PlayMusic } from '@/app/ui/Play/Play'
const Levels = () => {
    const levels = [
        {id: 1, title: "Level 1", path: "/dashboard/levels/one", available: true},
        {id: 2, title: "Level 2", path: "/dashboard/levels/two", available: true},
        {id: 3, title: "Level 3", path: "/dashboard/levels/three", available: true},
        {id: 4, title: "Level 4", path: "/dashboard/levels/four", available: true},
        {id: 5, title: "Level 5", path: "/dashboard/levels/five", available: true},
        {id: 6, title: "Level 6", path: "/dashboard/levels/six", available: true},
        {id: 7, title: "Level 7", path: "/dashboard/levels/seven", available: true},
        {id: 8, title: "Level 8", path: "/dashboard/levels/eight", available: false},
    ]
    const audioRef = useRef<HTMLVideoElement | null>(null);
    const playM = () => {
        PlayMusic(audioRef)
    }
  return (
    <div className='relative w-[100%] h-[100vh] flex flex-col justify-center items-center'>
        <Image src={BG} alt='bg' width={10000} height={10000} className='w-[100%] h-[100%] object-cover absolute z-[-1] brightness-75' />
        <audio controls ref={audioRef} className='absolute top-0 opacity-0'>
            <source src="/audio/music.mp3" type="audio/mpeg" />
        </audio>
        <div className='max-w-[300px] w-[100%] gap-[10px] md:gap-[20px] bg-[#ffffff1f] rounded-md p-[10px] md:p-[20px] backdrop-blur-sm'>
            <ul className='flex flex-col gap-[10px] w-[100%]'>
                {
                    levels?.map((item,index)=> {
                        return <li onMouseEnter={playM} key={index} className={`${item?.available ? "hover:border-[#ffffff57] hover:bg-[#ffffff57]" : "opacity-40"} bg-[#ffffff3e] w-[100%] rounded-md cursor-pointer duration-75 ease-linear backdrop-blur-md border-transparent border`}>
                            <Link href={item?.path} className='text-white w-[100%] inline-block px-[20px] py-[10px] rounded-md'>{item?.title}</Link>
                        </li>
                    })
                }
            </ul>
        </div>
    </div>
  )
}

export default Levels
