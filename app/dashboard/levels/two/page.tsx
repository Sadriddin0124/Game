"use client";
import Image, { StaticImageData } from "next/image";
import React, { useRef, useState, useEffect } from "react";
import BG from "@/assets/level2.jpg";
import Img1 from "@/assets/level2/img1.jpg";
import Img2 from "@/assets/level2/img2.jpg";
import Img3 from "@/assets/level2/img3.webp";
import Img4 from "@/assets/level2/img4.jpg";
import Img5 from "@/assets/level2/img5.jpg";
import Img6 from "@/assets/level2/img6.webp";
import Img7 from "@/assets/level2/img7.webp";
import Img8 from "@/assets/level2/img8.jpg";
import Phoenix from "@/assets/phoenix.jpg";
import { IoVolumeHighSharp } from "react-icons/io5";
import { MdHomeFilled, MdVolumeOff } from "react-icons/md";
import { IoReload } from "react-icons/io5";
import { PlayMusic } from "@/app/ui/Play/Play";
import Link from "next/link";
import Timer from "@/app/ui/Timer/Timer";

type LevelType = {
  id: number;
  img: StaticImageData;
  cat: string;
  status: boolean;
  visible: boolean; // New property for controlling visibility
};

const LevelOne = () => {
  const Data: LevelType[] = [
    { id: 1, img: Img7, cat: "elephant", status: false, visible: false },
    { id: 2, img: Img5, cat: "leopard", status: false, visible: false },
    { id: 3, img: Img6, cat: "lion", status: false, visible: false },
    { id: 4, img: Img7, cat: "elephant", status: false, visible: false },
    { id: 5, img: Img3, cat: "panda", status: false, visible: false },
    { id: 6, img: Img2, cat: "wolf", status: false, visible: false },
    { id: 7, img: Img5, cat: "leopard", status: false, visible: false },
    { id: 8, img: Img8, cat: "hippopotamus", status: false, visible: false },
    { id: 9, img: Img1, cat: "tiger", status: false, visible: false },
    { id: 10, img: Img4, cat: "fox", status: false, visible: false },
    { id: 11, img: Img8, cat: "hippopotamus", status: false, visible: false },
    { id: 12, img: Img3, cat: "panda", status: false, visible: false },
    { id: 13, img: Img1, cat: "tiger", status: false, visible: false },
    { id: 14, img: Img2, cat: "wolf", status: false, visible: false },
    { id: 15, img: Img4, cat: "fox", status: false, visible: false },
    { id: 16, img: Img6, cat: "lion", status: false, visible: false },
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
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("Autoplay blocked by browser:", error);
      });
    }
  };

  const handlePlayBg = () => {
    if (audioRef2.current) {
      audioRef2.current.play().catch((error) => {
        console.log("Autoplay blocked by browser:", error);
      });
    }
  };

  const handlePauseBg = () => {
    if (audioRef2.current) {
      audioRef2.current.pause();
    }
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
    if (audioRef3.current) {
      audioRef3.current.play().catch((error) => {
        console.log("Autoplay blocked by browser:", error);
      });
    }
  };
  const handlePlaySuccess = () => {
    if (audioRef4.current) {
      audioRef4.current.play().catch((error) => {
        console.log("Autoplay blocked by browser:", error);
      });
    }
  };
  const resetGame = () => {
    setItems(Data.map((item) => ({ ...item, status: false, visible: false }))); // Reset all item statuses and visibility
    setCat("");
    setActiveItem(null);
    setAttempts(0);
    setMatchedPairs(0);
    setGameCompleted(false);
  };

  return (
    <div className="relative w-[100%] h-[100vh] flex flex-col justify-center items-center">
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
        <source src="/audio/music3.mp3" type="audio/mpeg" />
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
      <div className="max-w-[330px] mt-[35px] md:max-w-[500px] bg-[#ffffff1f] backdrop-blur-sm mb-[20px] w-[100%] rounded-md justify-between items-center flex gap-[10px] px-[10px] md:px-[20px] py-[10px]">
        <div className="flex gap-[10px]">
          <button className="text-[30px] text-white" onClick={handlePlayBg}>
            <IoVolumeHighSharp />
          </button>
          <button className="text-[30px] text-white" onClick={handlePauseBg}>
            <MdVolumeOff />
          </button>
        </div>
        <Timer setGameCompleted={setGameCompleted} />
        <div className="flex items-center gap-[10px]">
            <button className="text-[30px] text-white" onClick={resetGame}>
                <IoReload />
            </button>
            <Link href={"/dashboard/levels"} className="text-[30px] text-white">
                <MdHomeFilled />
            </Link>
        </div>
      </div>
      {gameCompleted &&
        (matchedPairs === Data.length / 2 ? (
          <div className="fixed w-[100%] px-[20px] h-[100vh] left-0 top-0 flex justify-center items-center z-40 bg-[#00000074] text-white p-5 rounded-md mx-[20px]">
            <div className="max-w-[400px] w-[100%] p-[20px] flex flex-col gap-[20px] bg-white">
              <h2 className="text-green-500 text-[20px] text-center">
                Congratulations! You've completed the game in {attempts}{" "}
                attempts!
              </h2>
              <div className="w-[100%] flex justify-center gap-[10px]">
                <Link
                  href={"/dashboard/levels"}
                  className="text-[30px] text-green-400 px-[20px] py-[10px] border rounded-md"
                >
                  <MdHomeFilled />
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
          <div className="fixed w-[100%] px-[20px] h-[100vh] left-0 top-0 flex justify-center items-center z-40 bg-[#00000074] text-white p-5 rounded-md mx-[20px]">
            <div className="max-w-[400px] w-[100%] p-[20px] flex flex-col gap-[20px] bg-white">
              <h2 className="text-red-500 text-[20px] text-center">
                Game Over
              </h2>
              <div className="w-[100%] flex justify-center gap-[10px]">
                <Link
                  href={"/dashboard/levels"}
                  className="text-[30px] text-red-500 px-[20px] py-[10px] border rounded-md"
                >
                  <MdHomeFilled />
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
      <div className="gap-[10px] md:gap-[20px] bg-[#ffffff1f] rounded-md p-[10px] md:p-[20px] backdrop-blur-sm grid grid-cols-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item)}
            className={`${
              item.visible ? "rotateY" : ""
            } shadow_green ease-linear duration-500 w-[70px] md:w-[100px] h-[70px] md:h-[100px] relative rounded-md overflow-hidden cursor-pointer ${
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
                src={Phoenix}
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
