import React, { useEffect, useState } from 'react';
import styles from './style.module.css';

export default function({counting}) {
  const [timeLeft, setTimeLeft] = useState(counting); // Initial countdown time in seconds (2 minutes)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          return counting; // Reset to 2 minutes
        }
        return prevTime - 1;
      });
    }, 1000); // Decrement by 1 second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className={styles.countdownContainer} >
      
      <div className={styles.countdownNumber}
      >
        {formatTime(timeLeft)}
      </div>
    </div>
  );
}
