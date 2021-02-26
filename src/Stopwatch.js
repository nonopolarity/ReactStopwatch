import { useEffect, useState } from "react";

let startTime = null;

export default function Stopwatch() {
    const [isStopwatchRunning, setIsStopWatchRunning] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (isStopwatchRunning) {
            const timerID = setInterval(() => {
                setCurrentTime(Date.now());
            }, 10);
            return () => {
                clearInterval(timerID);
            }
        }
    }, [isStopwatchRunning]);


    function handleStart(ev) {
        if (!isStopwatchRunning) {
            startTime = Date.now();
            
        } else {
            // setIsStopWatchRunning(false);
        }
        setIsStopWatchRunning(!isStopwatchRunning);
    }

    return (
        <>
            <div>{ startTime === null ? 0 : ((Date.now() - startTime) / 1000).toFixed(2)}</div>
            <button onClick={handleStart}>{isStopwatchRunning ? "Pause" : "Start"}</button>
        </>
    );

}