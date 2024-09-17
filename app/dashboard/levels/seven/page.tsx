"use client";
import Image, { StaticImageData } from "next/image";
import React, { useRef, useState, useEffect } from "react";
import BG from "@/assets/level-7.webp";
import Img1 from "@/assets/level7/img1.webp";
import Img2 from "@/assets/level7/img2.png";
import Img3 from "@/assets/level7/img3.webp";
import Img4 from "@/assets/level7/img4.webp";
import Img5 from "@/assets/level7/img5.webp";
import Img6 from "@/assets/level7/img6.webp";
import Img7 from "@/assets/level7/img7.jpg";
import Img8 from "@/assets/level7/img8.webp";
import Img9 from "@/assets/level7/img9.jpg";
import Img10 from "@/assets/level7/img10.webp";
import Img11 from "@/assets/level7/img11.jpg";
import Img12 from "@/assets/level7/img12.png";
import Img13 from "@/assets/level7/img13.jpg";
import Img14 from "@/assets/level7/img14.png";
import Img15 from "@/assets/level7/img15.webp";
import Img16 from "@/assets/level7/img16.jpg";
import Img17 from "@/assets/level7/img17.webp";
import Img18 from "@/assets/level7/img18.jpg";
import Akatsuki from "@/assets/level7/akatsuki.jpg";
import { IoVolumeHighSharp } from "react-icons/io5";
import { MdHomeFilled, MdVolumeOff } from "react-icons/md";
import { IoReload } from "react-icons/io5";
import { PauseMusic, PlayMusic } from "@/app/ui/Play/Play";
import Link from "next/link";
import Timer from "@/app/ui/Timer/Timer";
import { HiMiniBars3 } from "react-icons/hi2";

type LevelType = {
  id: number;
  img: StaticImageData;
  cat: string;
  status: boolean;
  visible: boolean;
};

const LevelSeven = () => {
    const Data: LevelType[] = [
    { id: 1, img: Img7, cat: "Akatsuki7", status: false, visible: false },
    { id: 2, img: Img5, cat: "Akatsuki5", status: false, visible: false },
    { id: 3, img: Img12, cat: "Akatsuki12", status: false, visible: false },
    { id: 4, img: Img14, cat: "Akatsuki14", status: false, visible: false },
    { id: 5, img: Img11, cat: "Akatsuki11", status: false, visible: false },
    { id: 6, img: Img10, cat: "Akatsuki10", status: false, visible: false },
    { id: 7, img: Img6, cat: "Akatsuki6", status: false, visible: false },
    { id: 8, img: Img7, cat: "Akatsuki7", status: false, visible: false },
    { id: 9, img: Img18, cat: "Akatsuki18", status: false, visible: false },
    { id: 10, img: Img11, cat: "Akatsuki11", status: false, visible: false },
    { id: 11, img: Img3, cat: "Akatsuki3", status: false, visible: false },
    { id: 12, img: Img15, cat: "Akatsuki15", status: false, visible: false },
    { id: 13, img: Img13, cat: "Akatsuki13", status: false, visible: false },
    { id: 14, img: Img8, cat: "Akatsuki8", status: false, visible: false },
    { id: 15, img: Img9, cat: "Akatsuki9", status: false, visible: false },
    { id: 16, img: Img2, cat: "Akatsuki2", status: false, visible: false },
    { id: 17, img: Img18, cat: "Akatsuki18", status: false, visible: false },
    { id: 18, img: Img17, cat: "Akatsuki17", status: false, visible: false },
    { id: 19, img: Img8, cat: "Akatsuki8", status: false, visible: false },
    { id: 20, img: Img14, cat: "Akatsuki14", status: false, visible: false },
    { id: 21, img: Img17, cat: "Akatsuki17", status: false, visible: false },
    { id: 22, img: Img5, cat: "Akatsuki5", status: false, visible: false },
    { id: 23, img: Img1, cat: "Akatsuki1", status: false, visible: false },
    { id: 24, img: Img16, cat: "Akatsuki16", status: false, visible: false },
    { id: 25, img: Img13, cat: "Akatsuki13", status: false, visible: false },
    { id: 26, img: Img4, cat: "Akatsuki4", status: false, visible: false },
    { id: 27, img: Img3, cat: "Akatsuki3", status: false, visible: false },
    { id: 28, img: Img15, cat: "Akatsuki15", status: false, visible: false },
    { id: 29, img: Img10, cat: "Akatsuki10", status: false, visible: false },
    { id: 30, img: Img12, cat: "Akatsuki12", status: false, visible: false },
    { id: 31, img: Img4, cat: "Akatsuki4", status: false, visible: false },
    { id: 32, img: Img1, cat: "Akatsuki1", status: false, visible: false },
    { id: 33, img: Img9, cat: "Akatsuki9", status: false, visible: false },
    { id: 34, img: Img2, cat: "Akatsuki2", status: false, visible: false },
    { id: 35, img: Img6, cat: "Akatsuki6", status: false, visible: false },
    { id: 36, img: Img16, cat: "Akatsuki16", status: false, visible: false },
  ];

  const [items, setItems] = useState<LevelType[]>(Data);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [cat, setCat] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(0);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false); // Prevent double-clicking during checking
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioRef2 = useRef<HTMLAudioElement | null>(null);
  const audioRef3 = useRef<HTMLAudioElement | null>(null);
  const audioRef4 = useRef<HTMLAudioElement | null>(null);
  const audioRef5 = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (matchedPairs === Data.length / 2) {
      setGameCompleted(true);
    }
  }, [matchedPairs]);

  const handlePlay = () => {
    PlayMusic(audioRef)
  };

  const handlePlayBg = () => {
    PlayMusic(audioRef2)
  };

  const handlePauseBg = () => {
    PauseMusic(audioRef2)
  };

  const handleClick = (item: LevelType) => {
    if (isChecking || item.status || item.visible) return; // Block click if in checking phase or item is already matched

    setAttempts(attempts + 1);
    setItems((prevItems) =>
      prevItems.map((el) => (el.id === item.id ? { ...el, visible: true } : el))
    );

    if (cat === "") {
      // First selection
      setCat(item.cat);
      setActiveItem(item.id);
    } else {
      // Second selection
      setIsChecking(true); // Block further clicks during checking
      setTimeout(() => {
        if (item.cat === cat) {
          // Match found
          handlePlaySuccess();
          setItems((prevItems) =>
            prevItems.map((el) =>
              el.cat === cat ? { ...el, status: true, visible: true } : el
            )
          );
          setMatchedPairs(matchedPairs + 1);
          if (matchedPairs === Data.length / 2) {
            PlayMusic(audioRef5);
          }
        } else {
          // Mismatch, hide both items after a short delay
          handlePlayDisMatch();
          setItems((prevItems) =>
            prevItems.map((el) =>
              el.id === activeItem || el.id === item.id
                ? { ...el, visible: false }
                : el
            )
          );
        }
        setCat(""); // Reset category
        setActiveItem(null); // Reset active item
        setIsChecking(false); // Allow clicks again
      }, 1000); // Delay before flipping the mismatched items
    }

    handlePlay();
  };
  const handlePlayDisMatch = () => {
    PlayMusic(audioRef3)
  };
  const handlePlaySuccess = () => {
    PlayMusic(audioRef4)
  };
  const resetGame = () => {
    setItems(Data.map((item) => ({ ...item, status: false, visible: false }))); // Reset all item statuses and visibility
    setCat("");
    setActiveItem(null);
    setAttempts(0);
    setMatchedPairs(0);
    setGameCompleted(false);
    setTimerStatus(true)
  };
  const [timerStatus, setTimerStatus] = useState(true)
  const GameOver = useRef<HTMLAudioElement | null>(null);
  return (
    <div className="relative w-[100%] min-h-[100vh] flex flex-col justify-center items-center">
      <Image
        src={BG}
        alt="bg"
        width={10000}
        height={10000}
        className="w-[100%] h-[100%] object-cover absolute z-[-1] brightness-75"
      />
      <audio controls ref={audioRef} className="absolute top-0 opacity-0">
        <source src="/audio/music2.mp3" type="audio/mpeg" />
      </audio>
      <audio controls ref={audioRef2} className="absolute top-0 opacity-0">
        <source src="/audio/Akatsuki.m4a" type="audio/mpeg" />
      </audio>
      <audio controls ref={audioRef3} className="absolute top-0 opacity-0">
        <source src="/audio/music4.mp3" type="audio/mpeg" />
      </audio>
      <audio controls ref={audioRef4} className="absolute top-0 opacity-0">
        <source src="/audio/success.mp3" type="audio/mpeg" />
      </audio>
      <audio controls ref={audioRef5} className="absolute top-0 opacity-0">
        <source src="/audio/completed.mp3" type="audio/mpeg" />
      </audio>
      <audio controls ref={GameOver} className="absolute top-0 opacity-0">
        <source src="/audio/gameover.mp3" type="audio/mpeg" />
      </audio>
      <div className="max-w-[310px] mt-[35px] md:max-w-[560px] bg-[#ffffff1f] backdrop-blur-sm mb-[20px] w-[100%] rounded-md justify-between items-center flex gap-[10px] px-[10px] md:px-[20px] py-[10px]">
        <div className="flex gap-[10px]">
          <button className="text-[30px] text-white" onClick={handlePlayBg}>
            <IoVolumeHighSharp />
          </button>
          <button className="text-[30px] text-white" onClick={handlePauseBg}>
            <MdVolumeOff />
          </button>
        </div>
        <Timer setGameCompleted={setGameCompleted} GameOver={GameOver} timerStatus={timerStatus} setTimerStatus={setTimerStatus} setDuration={1.5}/>
        <div className="flex items-center gap-[10px]">
            <button className="text-[30px] text-white" onClick={resetGame}>
                <IoReload />
            </button>
            <Link href={"/"} className="text-[30px] text-white">
                <MdHomeFilled />
            </Link>
        </div>
      </div>
      {gameCompleted &&
        (matchedPairs === Data.length / 2 ? (
          <div className="fixed w-[100%] px-[20px] h-[100vh] left-0 top-0 flex justify-center items-center z-40 bg-[#00000074] text-white">
            <div className="max-w-[400px] w-[100%] p-[20px] flex flex-col gap-[20px] bg-white">
              <h2 className="text-green-500 text-[20px] text-center">
                Congratulations! You've completed the game in {attempts}{" "}
                attempts!
              </h2>
              <div className="w-[100%] flex justify-center gap-[10px]">
                <Link
                  href={"/"}
                  className="text-[30px] text-green-400 px-[20px] py-[10px] border rounded-md"
                >
                  <MdHomeFilled />
                </Link>
                <Link
                  href={"/dashboard/levels"}
                  className="text-[30px] text-green-400 px-[20px] py-[10px] border rounded-md"
                >
                  <HiMiniBars3 />
                </Link>
                <button
                  className="text-[30px] text-green-400 px-[20px] py-[10px] border rounded-md"
                  onClick={resetGame}
                >
                  <IoReload />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="fixed w-[100%] px-[20px] h-[100vh] left-0 top-0 flex justify-center items-center z-40 bg-[#00000074] text-white">
            <div className="max-w-[400px] w-[100%] p-[20px] flex flex-col gap-[20px] bg-white">
              <h2 className="text-red-500 text-[20px] text-center">
                Game Over
              </h2>
              <div className="w-[100%] flex justify-center gap-[10px]">
                <Link
                  href={"/"}
                  className="text-[30px] text-red-500 px-[20px] py-[10px] border rounded-md"
                >
                  <MdHomeFilled />
                </Link>
                <Link
                  href={"/dashboard/levels"}
                  className="text-[30px] text-red-500 px-[20px] py-[10px] border rounded-md"
                >
                  <HiMiniBars3 />
                </Link>
                <button
                  className="text-[30px] text-red-500 px-[20px] py-[10px] border rounded-md"
                  onClick={resetGame}
                >
                  <IoReload />
                </button>
              </div>
            </div>
          </div>
        ))}
      <div className="gap-[10px] md:gap-[20px] bg-[#ffffff1f] rounded-md p-[10px] md:p-[20px] backdrop-blur-sm grid grid-cols-6">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item)}
            className={`${
              item.visible ? "rotateY" : ""
            } shadow_orange ease-linear duration-500 w-[40px] md:w-[70px] h-[40px] md:h-[70px] relative rounded-md overflow-hidden cursor-pointer ${
              item.status ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <Image
              src={item.img}
              alt={item.cat}
              width={1000}
              height={1000}
              className={`absolute rotateY rounded-md left-0 top-0 w-[100%] h-[100%] object-cover`}
            />
            <div
              className={`absolute top-0 z-20 left-0 w-[100%] h-[100%] bg-white flex justify-center items-center text-gray-500 rounded-md ${
                item.visible || item?.status ? "opacity-0" : "opacity-100"
              }`}
            >
              <Image
                src={Akatsuki}
                alt={"Phoenix"}
                width={1000}
                height={1000}
                className={`absolute rounded-md left-0 top-0 w-[100%] h-[100%] object-cover`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelSeven;
