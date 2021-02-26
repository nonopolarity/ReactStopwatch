import { useEffect, useState } from "react";
import "./Stopwatch.css";

// Design goal: so that the displayed duration is not
// affected by the asychronous update (render) behavior and setData()
// of ReactJS, but can reflect the most accurate time
// between the time that the user presses Start and Pause
// (and repeatedly doing so).

let startTime = null;

export default function Stopwatch() {
    // console.log("HERE", fooBar);
    const [isStopwatchRunning, setIsStopWatchRunning] = useState(false);
    // const [isStopwatchAtReset, setIsStopwatchAtReset] = useState(true);
    const [cumulativeDuration, setCumulativeDuration] = useState(0);

    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (isStopwatchRunning) {
            const timerID = setInterval(() => {
                setCurrentTime(Date.now());  // currentTime is not used for display, but just to trigger a re-render
            }, 10);
            return () => {
                clearInterval(timerID);
            }
        }
    }, [isStopwatchRunning]);


    function handleStart(ev) {
        if (!isStopwatchRunning) {  // Starting it
            startTime = Date.now();
            // setIsStopwatchAtReset(false);
        } else {    // Pausing it
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
  if (!isStopwatchRunning) {
        displayedDuration = cumulativeDuration;
    } else {
        displayedDuration = cumulativeDuration + Date.now() - startTime;
    }

    return (
        <div className="stopwatch">
            <div className="duration-display">{ (displayedDuration / 1000).toFixed(2)}</div>
            <button onClick={handleStart}>{isStopwatchRunning ? "Pause" : "Start"}</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );

}