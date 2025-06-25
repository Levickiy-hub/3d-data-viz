import * as THREE from 'three';
import { createCrystal } from '../objects/Crystal.js';

export function generateCrystals(serverData) {
  const crystals = [];

  const total = serverData.ids.length;
  const center = new THREE.Vector3(0, 0, 0);

  // 1. Сначала вычислим "средний центр"
  for (let i = 0; i < total; i++) {
    center.x += serverData.positions.x[i];
    center.y += serverData.positions.y[i];
    center.z += serverData.positions.z[i];
  }
  center.divideScalar(total);

  // 2. Создадим кристаллы со смещением к центру
  for (let i = 0; i < total; i++) {
    const position = {
      x: serverData.positions.x[i] - center.x,
      y: serverData.positions.y[i] - center.y,
      z: serverData.positions.z[i] - center.z + (Math.random() * 20 - 4)
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
  const distance = 20;   // Расстояние от центра
  const offsetY = 0.6;   // Вертикальный угол (0 — горизонтально, 1 — строго сверху)
  const offsetZ = 0.8;   // Горизонтальный угол (0 — строго спереди, 1 — строго сверху)

  const center = new THREE.Vector3();

  if (crystals.length === 0) {
    camera.position.set(0, distance * offsetY, distance * offsetZ);
    camera.lookAt(center);
    controls.target.copy(center);
    controls.update();
    return;
  }

  crystals.forEach(crystal => center.add(crystal.position));
  center.divideScalar(crystals.length);

  // Направление взгляда сверху и немного сзади (по Z)
  const direction = new THREE.Vector3(0, offsetY, offsetZ).normalize();

  // Располагаем камеру на нужном расстоянии от центра по направлению direction
  const cameraPosition = center.clone().add(direction.multiplyScalar(distance));
  camera.position.copy(cameraPosition);

  camera.lookAt(center);
  controls.target.copy(center);
  controls.update();
}

