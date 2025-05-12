// components/LevelGame.tsx
import { LevelType } from "@/app/data/level1"; // Accept data format
import GameSuccess from "@/app/ui/GameSuccess/GameSuccess";
import GameFail from "@/app/ui/GameFail/GameFail";
import Audios from "@/app/ui/Audios/Audios";
import PlayButton from "@/components/PlayButton/PlayButton";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { IoVolumeHighSharp, IoReload } from "react-icons/io5";
import { MdHomeFilled, MdVolumeOff } from "react-icons/md";
import { PauseMusic, PlayMusic } from "@/app/ui/Play/Play";

interface LevelGameProps {
  data: LevelType[];
  bgImage: any;
  audioPath: string;
  phoenixImage: any;
  successRedirect: string;
}

const LevelGame = ({ data, bgImage, audioPath, phoenixImage, successRedirect }: LevelGameProps) => {
  const [items, setItems] = useState<LevelType[]>(data);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [cat, setCat] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(0);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  const [minutes, setMinutes] = useState<string>('00');
  const [seconds, setSeconds] = useState<string>('00');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  let timer = 60 * 0.6;

  const SelectSound = useRef<HTMLAudioElement | null>(null);
  const BackgroundMusic = useRef<HTMLAudioElement | null>(null);
  const ErrorSound = useRef<HTMLAudioElement | null>(null);
  const Success = useRef<HTMLAudioElement | null>(null);
  const Completed = useRef<HTMLAudioElement | null>(null);
  const GameOver = useRef<HTMLAudioElement | null>(null);

  const refs = [SelectSound, ErrorSound, Success, Completed, GameOver];

  useEffect(() => {
    if (matchedPairs === data.length / 2) {
      setGameCompleted(true);
      PlayMusic(Completed);
      stopTimer();
    }
  }, [matchedPairs]);

  const handleClick = (item: LevelType) => {
    if (isChecking || item.status || item.visible) return;
    setAttempts(attempts + 1);
    setItems((prev) =>
      prev.map((el) => (el.id === item.id ? { ...el, visible: true } : el))
    );
    if (cat === "") {
      setCat(item.cat);
      setActiveItem(item.id);
    } else {
      setIsChecking(true);
      setTimeout(() => {
        if (item.cat === cat) {
          PlayMusic(Success);
          setItems((prev) =>
            prev.map((el) =>
              el.cat === cat ? { ...el, status: true, visible: true } : el
            )
          );
          setMatchedPairs(matchedPairs + 1);
        } else {
          PlayMusic(ErrorSound);
          setItems((prev) =>
            prev.map((el) =>
              el.id === activeItem || el.id === item.id
                ? { ...el, visible: false }
                : el
            )
          );
        }
        setCat("");
        setActiveItem(null);
        setIsChecking(false);
      }, 1000);
    }
    PlayMusic(SelectSound);
  };

  const resetGame = () => {
    stopTimer();
    setItems(data.map((item) => ({ ...item, status: false, visible: false })));
    setCat("");
    setActiveItem(null);
    setAttempts(0);
    setMatchedPairs(0);
    setGameCompleted(false);
    TimerFn();
  };

  const [start, setStart] = useState(true);
  const StartGame = () => {
    setStart(false);
    TimerFn();
  };

  const TimerFn = () => {
    intervalRef.current = setInterval(() => {
      const min = Math.floor(timer / 60).toString().padStart(2, '0');
      const sec = (timer % 60).toString().padStart(2, '0');
      setMinutes(min);
      setSeconds(sec);
      if (--timer < 0) {
        clearInterval(intervalRef.current!);
        setGameCompleted(true);
        setStart(false);
        PlayMusic(GameOver);
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div className="relative w-full h-[100vh] flex flex-col justify-center items-center">
      <Image src={bgImage} alt="bg" fill className="object-cover z-[-1] brightness-75" />
      {start && <PlayButton StartGame={StartGame} />}
      <audio controls ref={BackgroundMusic} className="absolute top-0 opacity-0">
        <source src={audioPath} type="audio/mpeg" />
      </audio>
      <Audios refs={refs} />
      <div className="max-w-[330px] mt-[35px] md:max-w-[500px] bg-[#ffffff1f] backdrop-blur-sm mb-[20px] w-full rounded-md justify-between items-center flex gap-2 px-4 py-2">
        <div className="flex gap-2 text-white text-[28px]">
          <button onClick={() => PlayMusic(BackgroundMusic)}><IoVolumeHighSharp /></button>
          <button onClick={() => PauseMusic(BackgroundMusic)}><MdVolumeOff /></button>
        </div>
        <h1 className='text-white text-xl'>{minutes}:{seconds}</h1>
        <div className="flex gap-2 text-white text-[28px]">
          <button onClick={resetGame}><IoReload /></button>
          <Link href="/"><MdHomeFilled /></Link>
        </div>
      </div>
      {gameCompleted &&
        (matchedPairs === data.length / 2 ? (
          <GameSuccess attempts={attempts} resetGame={resetGame} path={successRedirect} />
        ) : (
          <GameFail attempts={attempts} resetGame={resetGame} />
        ))}
      <div className="grid grid-cols-4 gap-3 bg-[#ffffff1f] rounded-md p-4 backdrop-blur-sm">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item)}
            className={`w-[70px] md:w-[100px] h-[70px] md:h-[100px] relative rounded-md overflow-hidden cursor-pointer ease-linear duration-500 ${item.visible ? "rotateY" : ""} ${item.status ? "opacity-50 pointer-events-none" : ""}`}
          >
            <Image src={item.img} alt={item.cat} fill className="absolute rotateY rounded-md object-cover" />
            <div className={`absolute inset-0 z-20 flex items-center justify-center rounded-md bg-white ${item.visible || item.status ? "opacity-0" : "opacity-100"}`}>
              <Image src={phoenixImage} alt="Phoenix" fill className="rounded-md object-cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelGame;
