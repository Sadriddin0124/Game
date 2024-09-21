import Img1 from "@/assets/level1/bmw.png";
import Img2 from "@/assets/level1/bugatti.jpg";
import Img3 from "@/assets/level1/chevrolet.jpg";
import Img4 from "@/assets/level1/dodge.webp";
import Img5 from "@/assets/level1/mers.jpg";
import Img6 from "@/assets/level1/mclaren.svg";
import Img7 from "@/assets/level1/toyota.jpg";
import Img8 from "@/assets/level1/lambo.jpg";
import { StaticImageData } from "next/image";

export interface LevelType  {
    id: number;
    img: StaticImageData;
    cat: string;
    status: boolean;
    visible: boolean;  // New property for controlling visibility
  };

export const Items: LevelType[] = [
    { id: 1, img: Img1, cat: "bmw", status: false, visible: false },
    { id: 2, img: Img7, cat: "toyota", status: false, visible: false },
    { id: 3, img: Img6, cat: "mclaren", status: false, visible: false },
    { id: 4, img: Img5, cat: "mers", status: false, visible: false },
    { id: 5, img: Img3, cat: "chevrolet", status: false, visible: false },
    { id: 6, img: Img5, cat: "mers", status: false, visible: false },
    { id: 7, img: Img7, cat: "toyota", status: false, visible: false },
    { id: 8, img: Img2, cat: "bugatti", status: false, visible: false },
    { id: 9, img: Img3, cat: "chevrolet", status: false, visible: false },
    { id: 10, img: Img8, cat: "lambo", status: false, visible: false },
    { id: 11, img: Img4, cat: "dodge", status: false, visible: false },
    { id: 12, img: Img2, cat: "bugatti", status: false, visible: false },
    { id: 13, img: Img6, cat: "mclaren", status: false, visible: false },
    { id: 14, img: Img4, cat: "dodge", status: false, visible: false },
    { id: 15, img: Img8, cat: "lambo", status: false, visible: false },
    { id: 16, img: Img1, cat: "bmw", status: false, visible: false },
  ];