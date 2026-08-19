import React, { useEffect } from 'react';
import '../styles/Timer.css';

type TimerProps = {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
};

const Timer: React.FC<TimerProps> = ({ timeLeft, setTimeLeft }) => {
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft, setTimeLeft]);

  return (
    <div className="timer">
      <h2>Time Left: {timeLeft}s</h2>
    </div>
  );
};

export default Timer;
