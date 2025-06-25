import React, { useEffect, useRef, useState } from 'react';
import { SceneManager } from './core/SceneManager';
import { generateData } from './data/generateData';
import Tabel from './components/Tabel';

const App = () => {
  const [data, setData] = useState(null);
  const [target, setTarget] = useState(null);

  const canvasRef = useRef(null);
  const managerRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const data = generateData(3);
      setData(data)
      const manager = new SceneManager(canvasRef.current, data, target, setTarget)
      managerRef.current = manager;

      return () => {
        manager.dispose?.()
        managerRef.current = null;
      }
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
      <Tabel data={data} target={target} setTarget={setTarget} />
    </>
  )
}

export default App
