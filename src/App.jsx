import React, { useEffect, useRef } from 'react'
import { SceneManager } from './core/SceneManager'

export default App = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current) {
      new SceneManager(canvasRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} />
}
