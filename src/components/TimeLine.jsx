import React, { useState } from 'react';
import style from '../styles/timeLine.module.css';

const TimeLine = ({ data, setData }) => {
  const [currentTime, setCurrentTime] = useState(0);

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setCurrentTime(value);
    // Тут можно обработать выбор времени (фильтрация data по timestamp и т.д.)
  };

  return (
    <div className={style.timelineWrapper}>
      <input
        type="range"
        min={0}
        max={100}
        value={currentTime}
        onChange={handleChange}
        className={style.slider}
      />
      <div className={style.timestamp}>Time: {currentTime}</div>
    </div>
  );
};

export default TimeLine;
