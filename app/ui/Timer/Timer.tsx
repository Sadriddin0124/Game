import React, { useState, useEffect, Dispatch, SetStateAction, MutableRefObject } from 'react';
import { PlayMusic } from '../Play/Play';

const Timer = ({gameCompleted, setGameCompleted, GameOver, timerStatus, setTimerStatus, setDuration, setStart}: {gameCompleted: boolean; setDuration: number; setGameCompleted: Dispatch<SetStateAction<boolean>>; setStart: Dispatch<SetStateAction<boolean>>; setTimerStatus: Dispatch<SetStateAction<boolean>>; GameOver: MutableRefObject<HTMLAudioElement | null>; timerStatus: boolean}) => {
    const [minutes, setMinutes] = useState<string>('00');
    const [seconds, setSeconds] = useState<string>('00');

    useEffect(() => {
        const duration = 60 * setDuration; // 5 minutes in seconds
        let timer = duration;

        const TimerFn = () => {
            const interval = setInterval(() => {
                const min = Math.floor(timer / 60).toString().padStart(2, '0');
                const sec = (timer % 60).toString().padStart(2, '0');
    
                setMinutes(min);
                setSeconds(sec);
    
                if (--timer < 0) {
                    clearInterval(interval);
                    setGameCompleted(true)
                    setTimerStatus(true)
                    setStart(false)
                    if (gameCompleted == false) {
                        PlayMusic(GameOver)
                        setTimerStatus(true)
                    }
                }
            }, 1000);
            return () => clearInterval(interval); // Cleanup interval on component unmount
        }
        if (!timerStatus) {
            TimerFn()
        }
    }, [timerStatus, gameCompleted]);

    return (
        <div>
            <h1 className='text-white text-[20px]'>{minutes}:{seconds}</h1>
        </div>
    );
}

export default Timer;
