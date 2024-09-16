"use client"
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import BG from "@/assets/bg2.jpg"
import { FaArrowRightLong } from "react-icons/fa6";

const Welcome = ({Play, setSwitchPage}: {Play: ()=> void, setSwitchPage: Dispatch<SetStateAction<boolean>>}) => {
    const [welcome, setWelcome] = useState<boolean>(false)
    useEffect(()=> {
      setTimeout(() => {
        setWelcome(true)
      }, 500);
    }),[]
    const Click = () => {
      setSwitchPage(true)
      Play()
    }
  return (
    <div className='relative w-[100%] h-[100vh] flex justify-center items-center flex-col'>
        <Image src={BG} alt='bg' width={10000} height={10000} className='w-[100%] h-[100%] object-cover absolute z-[-1] brightness-75' />
        <h1 className={`${welcome ? "hidden" : ""} welcome text-[50px] font-[700] text-white flex flex-col items-center`}><span>Welcome!</span> Let's play a game</h1>
        <button onClick={Click} className={`${welcome ? "" : "hidden"} start bg-[#ffffff3e] w-[200px] text-white py-[10px] px-[20px] rounded-md cursor-pointer duration-75 text-center ease-linear hover:border-[#ffffff57] backdrop-blur-md hover:bg-[#ffffff57] border-transparent border flex items-center justify-center gap-[10px]`}>Start <FaArrowRightLong/></button>
    </div>
  )
}

export default Welcome
