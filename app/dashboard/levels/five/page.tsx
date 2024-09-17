"use client";
import Image, { StaticImageData } from "next/image";
import React, { useRef, useState, useEffect } from "react";
import BG from "@/assets/level-5.webp";
import Img1 from "@/assets/level5/img1.webp";
import Img2 from "@/assets/level5/img2.webp";
import Img3 from "@/assets/level5/img3.jpg";
import Img4 from "@/assets/level5/img4.png";
import Img5 from "@/assets/level5/img5.jpg";
import Img6 from "@/assets/level5/img6.webp";
import Img7 from "@/assets/level5/img7.png";
import Img8 from "@/assets/level5/img8.webp";
import Img9 from "@/assets/level5/img9.webp";
import Img10 from "@/assets/level5/img10.webp";
import Img11 from "@/assets/level5/img11.jpg";
import Img12 from "@/assets/level5/img12.jpg";
import Img13 from "@/assets/level5/img13.webp";
import Img14 from "@/assets/level5/img14.webp";
import Img15 from "@/assets/level5/img15.webp";
import OnePiece from "@/assets/level5/onepiece.jpg";
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

const LevelOne = () => {
    const Data: LevelType[] = [
    { id: 1, img: Img7, cat: "OnePiece7", status: false, visible: false },
    { id: 2, img: Img11, cat: "OnePiece11", status: false, visible: false },
    { id: 3, img: Img5, cat: "OnePiece5", status: false, visible: false },
    { id: 4, img: Img12, cat: "OnePiece12", status: false, visible: false },
    { id: 5, img: Img10, cat: "OnePiece10", status: false, visible: false },
    { id: 6, img: Img11, cat: "OnePiece11", status: false, visible: false },
    { id: 7, img: Img6, cat: "OnePiece6", status: false, visible: false },
    { id: 8, img: Img7, cat: "OnePiece7", status: false, visible: false },
    { id: 9, img: Img15, cat: "OnePiece15", status: false, visible: false },
    { id: 10, img: Img3, cat: "OnePiece3", status: false, visible: false },
    { id: 11, img: Img14, cat: "OnePiece14", status: false, visible: false },
    { id: 12, img: Img2, cat: "OnePiece2", status: false, visible: false },
    { id: 13, img: Img13, cat: "OnePiece13", status: false, visible: false },
    { id: 14, img: Img9, cat: "OnePiece9", status: false, visible: false },
    { id: 15, img: Img5, cat: "OnePiece5", status: false, visible: false },
    { id: 16, img: Img8, cat: "OnePiece8", status: false, visible: false },
    { id: 17, img: Img14, cat: "OnePiece14", status: false, visible: false },
    { id: 18, img: Img1, cat: "OnePiece1", status: false, visible: false },
    { id: 19, img: Img13, cat: "OnePiece13", status: false, visible: false },
    { id: 20, img: Img4, cat: "OnePiece4", status: false, visible: false },
    { id: 21, img: Img8, cat: "OnePiece8", status: false, visible: false },
    { id: 22, img: Img15, cat: "OnePiece15", status: false, visible: false },
    { id: 23, img: Img10, cat: "OnePiece10", status: false, visible: false },
    { id: 24, img: Img3, cat: "OnePiece3", status: false, visible: false },
    { id: 25, img: Img12, cat: "OnePiece12", status: false, visible: false },
    { id: 26, img: Img1, cat: "OnePiece1", status: false, visible: false },
    { id: 27, img: Img9, cat: "OnePiece9", status: false, visible: false },
    { id: 28, img: Img2, cat: "OnePiece2", status: false, visible: false },
    { id: 29, img: Img4, cat: "OnePiece4", status: false, visible: false },
    { id: 30, img: Img6, cat: "OnePiece6", status: false, visible: false },
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
        <source src="/audio/OnePiece.m4a" type="audio/mpeg" />
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
      <div className="max-w-[310px] mt-[35px] md:max-w-[620px] bg-[#ffffff1f] backdrop-blur-sm mb-[20px] w-[100%] rounded-md justify-between items-center flex gap-[10px] px-[10px] md:px-[20px] py-[10px]">
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
      <div className="gap-[10px] md:gap-[20px] bg-[#ffffff1f] rounded-md p-[10px] md:p-[20px] backdrop-blur-sm grid grid-cols-5 md:grid-cols-6">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item)}
            className={`${
              item.visible ? "rotateY" : ""
            } shadow_orange ease-linear duration-500 w-[50px] md:w-[80px] h-[50px] md:h-[80px] relative rounded-md overflow-hidden cursor-pointer ${
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
                src={OnePiece}
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

export default LevelOne;
