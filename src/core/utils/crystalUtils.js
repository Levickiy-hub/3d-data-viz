import * as THREE from 'three';
import { createCrystal } from '../objects/Crystal.js';

export function generateCrystals(serverData) {
  const crystals = [];

  for (let i = 0; i < serverData.ids.length; i++) {
    const position = {
      x: serverData.positions.x[i],
      y: serverData.positions.y[i],
      z: serverData.positions.z[i]
    };

    const size = {
      x: serverData.sizes.x[i],
      y: serverData.sizes.y[i],
      z: serverData.sizes.z[i]
    };

    const color = serverData.colors[i];
    const crystal = createCrystal(color, position, size);
    crystals.push(crystal);
  }

  return crystals;
}

export function centerCameraOnCrystals(camera, controls, crystals) {
  if (crystals.length === 0) {
    camera.position.set(0, 10, 20);
    camera.lookAt(0, 0, 0);
    return;
  }

  const center = new THREE.Vector3();
  crystals.forEach(crystal => center.add(crystal.position));
  center.divideScalar(crystals.length);

  camera.position.set(center.x, center.y, 10);
  camera.lookAt(center);

  controls.target.copy(center);
  controls.update();
}
