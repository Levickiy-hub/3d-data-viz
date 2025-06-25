export const generateData = (n = 100) => {
    const ids = new Array(n)
    const names = new Array(n)
    const statuses = new Uint8Array(n)    // 0 = offline, 1 = online
    const loads = new Float32Array(n)
  
    const positionsX = new Float32Array(n)
    const positionsY = new Float32Array(n)
    const positionsZ = new Float32Array(n)
  
    const sizesX = new Float32Array(n)
    const sizesY = new Float32Array(n)
    const sizesZ = new Float32Array(n)
  
    const colors = new Uint32Array(n)
  
    for (let i = 0; i < n; i++) {
      ids[i] = `srv-${String(i + 1).padStart(3, '0')}`
      names[i] = `Server ${i + 1}`
  
      const status = Math.random() > 0.5 ? 1 : 0
      const load = Math.random()
  
      statuses[i] = status
      loads[i] = load
  
      positionsX[i] = (i % 10) * 3 - 15   // 10 в ряд
      positionsY[i] = -Math.floor(i / 10) * 3
      positionsZ[i] = 0
  
      sizesX[i] = 1
      sizesY[i] = 1 + load * 2            // от 1 до 3 по нагрузке
      sizesZ[i] = 1
  
      colors[i] = status === 1 ? 0x00ff00 : 0xff0000  // зелёный или красный
    }
  
    return {
      ids,
      names,
      statuses,
      loads,
      positions: {
        x: positionsX,
        y: positionsY,
        z: positionsZ
      },
      sizes: {
        x: sizesX,
        y: sizesY,
        z: sizesZ
      },
      colors
    }
  }
  