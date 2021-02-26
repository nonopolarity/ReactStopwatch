import { useEffect, useState } from "react";

// Design goal: so that the displayed duration is not
// affected by the asychronous update (render) behavior
// of ReactJS, but can reflect the most accurate time
// between the time that the user presses Start and Pause
// (and repeatedly doing so).

let startTime = null;

export default function Stopwatch() {
    const [isStopwatchRunning, setIsStopWatchRunning] = useState(false);
    // const [isStopwatchAtReset, setIsStopwatchAtReset] = useState(true);
    const [cumulativeDuration, setCumulativeDuration] = useState(0);

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
        if (!isStopwatchRunning) {  // Starting
            startTime = Date.now();
            // setIsStopwatchAtReset(false);
        } else {    // Pausing
            // setIsStopWatchRunning(false);
            setCumulativeDuration(cumulativeDuration + Date.now() - startTime);
        }
        setIsStopWatchRunning(!isStopwatchRunning);
    }

    function handleReset() {
        setIsStopWatchRunning(false);
        setCumulativeDuration(0);
    }

    let displayedDuration;
    if (startTime === null) {
        displayedDuration = 0;
    } else if (!isStopwatchRunning) {
        displayedDuration = cumulativeDuration;
    } else {
        displayedDuration = cumulativeDuration + Date.now() - startTime;
    }

    return (
        <>
            <div>{ (displayedDuration / 1000).toFixed(2)}</div>
            <button onClick={handleStart}>{isStopwatchRunning ? "Pause" : "Start"}</button>
            <button onClick={handleReset}>Reset</button>
        </>
    );

}