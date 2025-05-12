// app/levels/LevelOne.tsx
"use client";

import { Items } from "@/app/data/level1";
import BG from "@/assets/level2.jpg";
import Phoenix from "@/assets/phoenix.jpg";
import LevelGame from "@/components/game-page";

export default function LevelOne() {
  return (
    <LevelGame
      data={Items}
      bgImage={BG}
      audioPath="/audio/music3.mp3"
      phoenixImage={Phoenix}
      successRedirect="two"
    />
  );
}
