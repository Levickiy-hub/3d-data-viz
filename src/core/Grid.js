import * as THREE from 'three';

export function createFloorGrid(size = 50, divisions = 50, colorCenterLine = 0x444444, colorGrid = 0x888888) {
  const gridHelper = new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid);
  
  // Повернем сетку, чтобы она лежала «наклонно»
  gridHelper.rotation.x = -Math.PI / 4; // наклон около 45 градусов
  
  // Немного опустим сетку вниз по Y
  gridHelper.position.y = -5;
  
  return gridHelper;
}
