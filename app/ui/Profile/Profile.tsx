"use client"
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { LuLogOut } from "react-icons/lu";

const Profile = () => {
    const { data: session } = useSession()
    const name = String(session?.user?.name)
    const image = String(session?.user?.image)
  return (
    <>
    { name !== "undefined" ? <div>
                <div className='fixed top-1 cursor-pointer right-1 flex gap-[10px] px-3 py-1 duration-75 text-center ease-linear rounded-md items-center hover:border-[#ffffff57] backdrop-blur-md hover:bg-[#ffffff57] border-transparent border bg-[#ffffff3e]'>
                    <Image src={image} alt='Profile Image' width={100} height={100} className='w-[30px] h-[30px] rounded-full'/>
                    <span className='text-white'>{name}</span>
                </div>
                <button onClick={()=>signOut()} className='text-[22px] text-white fixed top-1 cursor-pointer left-1 flex gap-[10px] px-3 py-2 duration-75 text-center ease-linear rounded-md items-center hover:border-[#ffffff57] backdrop-blur-md hover:bg-[#ffffff57] border-transparent border bg-[#ffffff3e]'><LuLogOut/></button>
            </div> : ""}
    </>
  )
}

export default Profile
