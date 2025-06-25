import * as THREE from 'three';

export function createFloorGrid(size = 50, divisions = 50, colorCenterLine = 0x444444, colorGrid = 0x888888) {
  const gridHelper = new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid);
  
  // Немного опустим сетку вниз по Y
  gridHelper.position.y = -5;
  
  return gridHelper;
}
