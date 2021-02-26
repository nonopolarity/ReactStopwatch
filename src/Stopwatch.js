import { useEffect, useState } from "react";
import "./Stopwatch.css";

// Design goal: the displayed duration is not
// affected by the asychronous update (render) behavior and any setData()
// of ReactJS, but can reflect the most accurate time
// between the time that the user presses Start and Pause
// (and user repeatedly doing so).

let startTime = null;

export default function Stopwatch() {
    const [isStopwatchRunning, setIsStopWatchRunning] = useState(false);
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

    function handleStartAndPause() {
        if (!isStopwatchRunning) {    // Starting it
            startTime = Date.now();
        } else {                      // Pausing it
            setCumulativeDuration(cumulativeDuration + Date.now() - startTime);
        }
        setIsStopWatchRunning(!isStopwatchRunning);
    }

    function handleReset() {
        setIsStopWatchRunning(false);
        setCumulativeDuration(0);
    }

    let duration;
    if (!isStopwatchRunning) {
        duration = cumulativeDuration;
    } else {
        duration = cumulativeDuration + Date.now() - startTime;
    }

    function pad(n) {
        return (n >= 10) ? `${n}` : `0${n}`;
    }
    const nDays = Math.floor(duration / 24 / 60 / 60 / 1000),
        days = (nDays === 0) ? "" : `${nDays} days`,
        hours = pad(Math.floor(duration / 60 / 60 / 1000) % 24),
        minutes = pad(Math.floor(duration / 60 / 1000) % 60),
        seconds = pad(Math.floor(duration / 1000) % 60),
        hundredth = pad(Math.floor((duration % 1000) / 10));

    return (
        <div className="stopwatch">
            <div className="duration-display">{`${days} ${hours}:${minutes}:${seconds}`}<div>{hundredth} / 100</div></div>
            {/* <div className="duration-display">{(duration / 1000).toFixed(2)}</div> */}
            <button onClick={handleStartAndPause}>{isStopwatchRunning ? "Pause" : "Start"}</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );

}