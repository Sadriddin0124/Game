import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

const Timer = ({setGameCompleted}: {setGameCompleted: Dispatch<SetStateAction<boolean>>}) => {
    const [minutes, setMinutes] = useState<string>('00');
    const [seconds, setSeconds] = useState<string>('00');

    useEffect(() => {
        const duration = 60 * .5; // 5 minutes in seconds
        let timer = duration;

        const interval = setInterval(() => {
            const min = Math.floor(timer / 60).toString().padStart(2, '0');
            const sec = (timer % 60).toString().padStart(2, '0');

            setMinutes(min);
            setSeconds(sec);

            if (--timer < 0) {
                clearInterval(interval);
                console.log("Timer ended");
                setGameCompleted(true)
            }
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div>
            <h1 className='text-white text-[20px]'>{minutes}:{seconds}</h1>
        </div>
    );
}

export default Timer;
