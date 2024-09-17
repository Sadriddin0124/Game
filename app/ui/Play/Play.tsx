export const PlayMusic = (audioRef: any) => {
    if (audioRef.current) {
      audioRef.current.play().catch((error: any) => {
        console.log('Autoplay blocked by browser:', error);
      });
    }
  };
export const PauseMusic = (audioRef: any) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };