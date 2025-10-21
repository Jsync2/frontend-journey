// PomodoroTimer.jsx
import { useState, useEffect, useRef } from "react";

const PomodoroTimer = ({
  minutes = 25,         // Set default Pomodoro duration
  size = 220,           // Diameter of the SVG circle
  strokeWidth = 10,     // Stroke width of the progress
  trackColor = "#232342",
  progressColor = "#c084fc",
  textColor = "#14172E"
}) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const totalDuration = minutes * 60;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => {
    if (timeLeft > 0) setIsRunning(true);
  };
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(totalDuration);
  };

  // Calculate stroke-dashoffset for the progress ring
  const dashOffset = circumference * (1 - timeLeft / totalDuration);

  const formatTime = s =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        margin: "2rem auto"
      }}
    >
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress indicator */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.8s linear"
          }}
        />
      </svg>
      {/* Timer and controls overlay */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          textAlign: "center",
          transform: "translate(-50%, -50%)",
          color: textColor
        }}
      >
        <div style={{ fontSize: "2.8rem", fontWeight: 600 }}>
          {formatTime(timeLeft)}
        </div>
        <div style={{ fontSize: "1rem", letterSpacing: 5, margin: "0.1em 0" }}>
          {isRunning ? "RUNNING" : timeLeft === 0 ? "END" : "PAUSE"}
        </div>
        <div style={{ marginTop: "1.3em", display: "flex", justifyContent: "center", gap: "0.5em" }}>
          <button
            style={{ padding: "0.4em 1em", fontWeight: 500 }}
            onClick={handleStart}
            disabled={isRunning || timeLeft === 0}
          >
            Start
          </button>
          <button
            style={{ padding: "0.4em 1em", fontWeight: 500 }}
            onClick={handlePause}
            disabled={!isRunning}
          >
            Pause
          </button>
          <button
            style={{ padding: "0.4em 1em", fontWeight: 500 }}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
