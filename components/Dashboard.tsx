"use client";
import Welcome from "@/app/ui/Welcome/Welcome";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import AuthImage from "@/assets/auth.jpg"
import Google from "@/assets/google.webp"
import Github from "@/assets/github.png"
const Dashboard = ({Play, setSwitchPage}: {Play: ()=> void, setSwitchPage: Dispatch<SetStateAction<boolean>>}) => {
  const { data: session } = useSession();
  const LogIn = (item: string) => {
    signIn(item)
  }
  return (
    <div className="w-full h-[100vh] relative flex justify-center items-center">
      {session ? (
          <>
          <Welcome Play={Play} setSwitchPage={setSwitchPage}/> 
        </>
      ) : (
          <>
          <Image src={AuthImage} alt="AuthImage" width={1000} height={1000} className="w-full h-full absolute object-cover top-0 left-0"/>
          <div className="flex flex-col py-14 px-12 gap-10 items-center duration-75 text-center ease-linear rounded-md hover:border-[#ffffff57] backdrop-blur-md hover:bg-[#ffffff57] border-transparent border bg-[#ffffff3e]">
            <h1 className="text-3xl text-white font-bold">
                You are not logged in
            </h1>
            <div className="flex flex-col gap-[20px]">
                <button
                    onClick={() => LogIn("google")}
                    className="border border-white flex gap-3 bg-white text-black rounded-lg px-3 py-1"
                >
                    <Image src={Google} alt="Google" width={100} height={100} className="w-[24px] h-[24px]"/>
                    Sign In with google
                </button>
                <button
                    onClick={() => LogIn("github")}
                    className="border border-white flex gap-3 rounded-lg px-3 py-1 bg-white text-black"
                >
                    <Image src={Github} alt="Github" width={100} height={100} className="w-[24px] h-[24px]"/>
                    Sign In with github
                </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
