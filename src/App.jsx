import React, { useEffect, useRef, useState } from 'react';
import { SceneManager } from './core/SceneManager';
import { generateData } from './data/generateData';
import Tabel from './components/Tabel';
import ToggleButton from './components/ToggleButton';
import TimeLine from './components/TimeLine';
import style from './styles/App.module.css';
import { workerManager } from './workers/workerManager';

const App = () => {
  const [data, setData] = useState(null);
  const [target, setTarget] = useState(null);
  const [is3d, setIs3d] = useState(true);

  const canvasRef = useRef(null);
  const managerRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const dataMock = generateData(new Date(), 1, 3);
      if (dataMock) {
        workerManager.processIncoming(dataMock);
      }
      // console.log(JSON.stringify(dataMock, null, 2));
      setData(dataMock);
      // const manager = new SceneManager(canvasRef.current, dataMock, target, setTarget)
      // managerRef.current = manager;

      // return () => {
      //   manager.dispose?.()
      //   managerRef.current = null;
      // }
    }
  }, []);

  useEffect(() => {
    if (managerRef.current) {
      managerRef.current.updateTarget(target);
    }
  }, [target]);

  return (
    <>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      <div className="ui">
        {/* <Tabel data={data} target={target} setTarget={setTarget} /> */}
        <div className={style.bottomControlsWrapper}>
          <ToggleButton is3d={is3d} setIs3d={setIs3d} />
          <TimeLine data={data} setData={setData} />
        </div>
      </div>
    </>
  )
}

export default App
