import React, { useEffect, useRef } from 'react';
import { SceneManager } from './core/SceneManager';
import { generateData } from './data/generateData';

const App = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current) {
      const data = generateData(3);
      console.log(data)
      const manager = new SceneManager(canvasRef.current, data)

      return () => {
        manager.dispose?.()
      }
    }
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
}

export default App
