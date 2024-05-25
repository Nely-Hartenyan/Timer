// Timer.tsx создала над одним уровнем с App.tsx, так как только один компонент здесь будем использовать, но если бы было много компонентов то уже надо отдельную папку создать для всех компонентов
import React, { useState, useEffect, useRef } from 'react';

const Timer: React.FC = () => {
  // Можно было еще в parent component создать state для timer, и внутри его массив объектов такого типа {id: number, time: number, isRunning: boolean}, и потом это передавать сюда

  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime(prevTime => prevTime + 100);
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const startPauseTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

// Так как маленький проект функция написала здесь, но по идеальному бует создовать folder для всех utilit functions, и там написать таки функции.
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
  };

  return (
    // Стили написала инлайн так как мало, но если много стилей то надо отдельный файл создать для стилей
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
      <div>{formatTime(time)}</div>
      <button onClick={startPauseTimer}>{isRunning ? 'Pause' : 'Start'}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Timer;
