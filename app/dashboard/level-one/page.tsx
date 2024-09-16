"use client";
import Menu from '@/app/ui/Menu/Menu';
import Image, { StaticImageData } from 'next/image';
import React, { useRef, useState } from 'react';
import BG from "@/assets/level1.jpg";
import Img1 from "@/assets/level1/bmw.png";
import Img2 from "@/assets/level1/bugatti.jpg";
import Img3 from "@/assets/level1/chevrolet.jpg";
import Img4 from "@/assets/level1/dodge.webp";
import Img5 from "@/assets/level1/mers.jpg";
import Img6 from "@/assets/level1/mclaren.svg";
import Img7 from "@/assets/level1/toyota.jpg";
import Img8 from "@/assets/level1/lambo.jpg";
import { FaEyeSlash } from "react-icons/fa6";

type LevelType = {
  id: number;
  img: StaticImageData;
  cat: string;
  status: boolean;
};

const LevelOne = () => {
  const Data: LevelType[] = [
    { id: 1, img: Img1, cat: "bmw", status: false },
    { id: 2, img: Img7, cat: "toyota", status: false },
    { id: 3, img: Img6, cat: "mclaren", status: false },
    { id: 4, img: Img5, cat: "mers", status: false },
    { id: 5, img: Img3, cat: "chevrolet", status: false },
    { id: 6, img: Img5, cat: "mers", status: false },
    { id: 7, img: Img7, cat: "toyota", status: false },
    { id: 8, img: Img2, cat: "bugatti", status: false },
    { id: 9, img: Img3, cat: "chevrolet", status: false },
    { id: 10, img: Img8, cat: "lambo", status: false },
    { id: 11, img: Img4, cat: "dodge", status: false },
    { id: 12, img: Img2, cat: "bugatti", status: false },
    { id: 13, img: Img6, cat: "mclaren", status: false },
    { id: 14, img: Img4, cat: "dodge", status: false },
    { id: 15, img: Img8, cat: "lambo", status: false },
    { id: 16, img: Img1, cat: "bmw", status: false },
  ];

  const [items, setItems] = useState<LevelType[]>(Data);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [cat, setCat] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Function to play audio
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log('Autoplay blocked by browser:', error);
      });
    }
  };

  const handleClick = (item: LevelType) => {
    if (activeItem === item.id) return; // Prevent reselecting the same item

    if (cat === "") {
      // First selection, set category
      setCat(item.cat);
    } else {
      // Second selection, check if categories match
      if (item.cat === cat) {
        setItems((prevItems) =>
          prevItems.map((el) =>
            el.id === item.id || el.cat === cat ? { ...el, status: true } : el
          )
        );
        setCat(""); // Reset category
      } else {
        setCat(item.cat); // Reset category for new attempt
      }
    }

    setActiveItem(item.id); // Set active item for visual feedback
    handlePlay(); // Play audio on selection
  };

  return (
    <div className='relative w-[100%] h-[100vh] flex justify-center items-center'>
      <Image src={BG} alt='bg' width={10000} height={10000} className='w-[100%] h-[100%] object-cover absolute z-[-1] brightness-75' />
      <audio controls ref={audioRef} className='absolute top-0 opacity-0'>
        <source src="/audio/music2.mp3" type="audio/mpeg" />
      </audio>
      <div className='gap-[20px] bg-[#ffffff1f] rounded-md p-[20px] backdrop-blur-sm grid grid-cols-4'>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item)}
            className={`${
              activeItem === item.id ? "rotateY" : ""
            } shadow-md shadow-[red] ease-linear duration-500 w-[100px] h-[100px] relative rounded-md overflow-hidden cursor-pointer ${
              item.status ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <Image
              src={item.img}
              alt={item.cat}
              width={1000}
              height={1000}
              className={`absolute rounded-md w-[100%] h-[100%] object-cover ${
                activeItem === item.id ? "z-[3]" : "z-[2]"
              }`}
            />
            <div
              className={`absolute top-0 z-20 left-0 w-[100%] h-[100%] bg-white flex justify-center items-center text-gray-500 rounded-md ${
                activeItem === item.id || item?.status ? "opacity-0" : "opacity-100"
              }`}
            >
              <FaEyeSlash size={30} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelOne;
