"use client";
import Image, { StaticImageData } from "next/image";
import React, { useRef, useState, useEffect } from "react";
import BG from "@/assets/level-6.webp";
import Img1 from "@/assets/level6/img1.jpg";
import Img2 from "@/assets/level6/img2.jpg";
import Img3 from "@/assets/level6/img3.jpg";
import Img4 from "@/assets/level6/img4.webp";
import Img5 from "@/assets/level6/img5.webp";
import Img6 from "@/assets/level6/img6.jpg";
import Img7 from "@/assets/level6/img7.webp";
import Img8 from "@/assets/level6/img8.jpg";
import Img9 from "@/assets/level6/img9.webp";
import Img10 from "@/assets/level6/img10.webp";
import Img11 from "@/assets/level6/img11.webp";
import Img12 from "@/assets/level6/img12.webp";
import Img13 from "@/assets/level6/img13.jpeg";
import Img14 from "@/assets/level6/img14.jpeg";
import Img15 from "@/assets/level6/img15.png";
import Bleach from "@/assets/level6/bleach.jpg";
import { IoVolumeHighSharp } from "react-icons/io5";
import { MdHomeFilled, MdVolumeOff } from "react-icons/md";
import { IoReload } from "react-icons/io5";
import { PauseMusic, PlayMusic } from "@/app/ui/Play/Play";
import Link from "next/link";
import PlayButton from "@/components/PlayButton/PlayButton";
import Audios from "@/app/ui/Audios/Audios";
import GameSuccess from "@/app/ui/GameSuccess/GameSuccess";
import GameFail from "@/app/ui/GameFail/GameFail";

type LevelType = {
  id: number;
  img: StaticImageData;
  cat: string;
  status: boolean;
  visible: boolean;
};

const LevelOne = () => {
    const Data: LevelType[] = [
    { id: 1, img: Img7, cat: "Bleach7", status: false, visible: false },
    { id: 2, img: Img5, cat: "Bleach5", status: false, visible: false },
    { id: 3, img: Img12, cat: "Bleach12", status: false, visible: false },
    { id: 4, img: Img14, cat: "Bleach14", status: false, visible: false },
    { id: 5, img: Img11, cat: "Bleach11", status: false, visible: false },
    { id: 6, img: Img10, cat: "Bleach10", status: false, visible: false },
    { id: 7, img: Img6, cat: "Bleach6", status: false, visible: false },
    { id: 8, img: Img7, cat: "Bleach7", status: false, visible: false },
    { id: 9, img: Img11, cat: "Bleach11", status: false, visible: false },
    { id: 10, img: Img3, cat: "Bleach3", status: false, visible: false },
    { id: 11, img: Img15, cat: "Bleach15", status: false, visible: false },
    { id: 12, img: Img13, cat: "Bleach13", status: false, visible: false },
    { id: 13, img: Img8, cat: "Bleach8", status: false, visible: false },
    { id: 14, img: Img9, cat: "Bleach9", status: false, visible: false },
    { id: 15, img: Img2, cat: "Bleach2", status: false, visible: false },
    { id: 16, img: Img8, cat: "Bleach8", status: false, visible: false },
    { id: 17, img: Img14, cat: "Bleach14", status: false, visible: false },
    { id: 18, img: Img5, cat: "Bleach5", status: false, visible: false },
    { id: 19, img: Img1, cat: "Bleach1", status: false, visible: false },
    { id: 20, img: Img13, cat: "Bleach13", status: false, visible: false },
    { id: 21, img: Img4, cat: "Bleach4", status: false, visible: false },
    { id: 22, img: Img3, cat: "Bleach3", status: false, visible: false },
    { id: 23, img: Img15, cat: "Bleach15", status: false, visible: false },
    { id: 24, img: Img10, cat: "Bleach10", status: false, visible: false },
    { id: 25, img: Img12, cat: "Bleach12", status: false, visible: false },
    { id: 26, img: Img4, cat: "Bleach4", status: false, visible: false },
    { id: 27, img: Img1, cat: "Bleach1", status: false, visible: false },
    { id: 28, img: Img9, cat: "Bleach9", status: false, visible: false },
    { id: 29, img: Img2, cat: "Bleach2", status: false, visible: false },
    { id: 30, img: Img6, cat: "Bleach6", status: false, visible: false },
  ];
  const [items, setItems] = useState<LevelType[]>(Data);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [cat, setCat] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(0);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false); // Prevent double-clicking during checking
  const SelectSound = useRef<HTMLAudioElement | null>(null);
  const BackgroundMusic = useRef<HTMLAudioElement | null>(null);
  const ErrorSound = useRef<HTMLAudioElement | null>(null);
  const Success = useRef<HTMLAudioElement | null>(null);
  const Completed = useRef<HTMLAudioElement | null>(null);
  const GameOver = useRef<HTMLAudioElement | null>(null);
  const refs = [SelectSound, ErrorSound, Success, Completed, GameOver]
  useEffect(() => {
    if (matchedPairs === Data.length / 2) {
      setGameCompleted(true);
      PlayMusic(Completed);
      stopTimer()
    }
  }, [matchedPairs]);

  const handlePlay = () => {
    PlayMusic(SelectSound)
  };

  const handlePlayBg = () => {
    PlayMusic(BackgroundMusic)
  };

  const handlePauseBg = () => {
    PauseMusic(BackgroundMusic)
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
    PlayMusic(ErrorSound)
  };
  const handlePlaySuccess = () => {
    PlayMusic(Success)
  };
  const resetGame = () => {
    stopTimer()
    setItems(Data.map((item) => ({ ...item, status: false, visible: false }))); // Reset all item statuses and visibility
    setCat("");
    setActiveItem(null);
    setAttempts(0);
    setMatchedPairs(0);
    setGameCompleted(false);
    TimerFn()
  };
  const [start, setStart] = useState(true)
  const StartGame = () => {
    setStart(!start)
    TimerFn()
  }
  const [minutes, setMinutes] = useState<string>('00');
  const [seconds, setSeconds] = useState<string>('00');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);  // Interval ID saqlash uchun
    let timer = 60 * 1.5; // Timerning boshlang'ich qiymati
    const TimerFn = () => {
        intervalRef.current = setInterval(() => {
            const min = Math.floor(timer / 60).toString().padStart(2, '0');
            const sec = (timer % 60).toString().padStart(2, '0');
            setMinutes(min);
            setSeconds(sec);
            
            if (--timer < 0) {
                clearInterval(intervalRef.current!);  // Intervalni to'xtatish
                setGameCompleted(true);
                setStart(false);
                PlayMusic(GameOver)
            }
        }, 1000);
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current); // Komponent o'chirilganda tozalash
            }
        };
    }
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Intervalni to'xtatish
    }
  };
  return (
    <div className="relative w-[100%] min-h-[100vh] flex flex-col justify-center items-center">
      <Image
        src={BG}
        alt="bg"
        width={10000}
        height={10000}
        className="w-[100%] h-[100%] object-cover absolute z-[-1] brightness-75"
      />
      {start && <PlayButton StartGame={StartGame}/>}
      <audio controls ref={BackgroundMusic} className="absolute top-0 opacity-0">
        <source src="/audio/Bleach.m4a" type="audio/mpeg" />
      </audio>
      <Audios refs={refs}/>
      <div className="max-w-[310px] mt-[35px] md:max-w-[620px] bg-[#ffffff1f] backdrop-blur-sm mb-[20px] w-[100%] rounded-md justify-between items-center flex gap-[10px] px-[10px] md:px-[20px] py-[10px]">
        <div className="flex gap-[10px]">
          <button className="text-[30px] text-white" onClick={handlePlayBg}>
            <IoVolumeHighSharp />
          </button>
          <button className="text-[30px] text-white" onClick={handlePauseBg}>
            <MdVolumeOff />
          </button>
        </div>
        <h1 className='text-white text-[20px]'>{minutes}:{seconds}</h1>
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
          <GameSuccess attempts={attempts} resetGame={resetGame} path="seven"/>
        ) : (
          <GameFail attempts={attempts} resetGame={resetGame}/>
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
                src={Bleach}
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
