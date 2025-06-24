import React, { useEffect, useRef } from 'react'
import { SceneManager } from './core/SceneManager'

const App = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current) {
      const manager = new SceneManager(canvasRef.current)

      return () => {
        manager.dispose?.()
      }
    }
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
}

export default App
