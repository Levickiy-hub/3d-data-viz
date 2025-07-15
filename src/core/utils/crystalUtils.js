import * as THREE from 'three';
import { createCrystal } from '../objects/Crystal.js';

export function generateCrystals(serverData) {
  if (!serverData) {
    return [];
  }
  const crystals = [];

  console.log(serverData)
  const total = serverData.length;
  const center = new THREE.Vector3(0, 0, 0);

  // 1. Сначала вычислим "средний центр"
  for (let i = 0; i < total; i++) {
    center.x += serverData[i].position.x;
    center.y += serverData[i].position.y;
    center.z += serverData[i].position.z;
  }
  center.divideScalar(total);

  // 2. Создадим кристаллы со смещением к центру
  for (let i = 0; i < total; i++) {
    const position = {
      x: serverData[i].position.x - center.x,
      y: serverData[i].position.y - center.y,
      z: serverData[i].position.z - center.z + (Math.random() * 20 - 4)
    };

    const size = {
      x: serverData[i].size.width,
      y: serverData[i].size.height,
      z: serverData[i].size.depth
    };

    const color = serverData[i].color;
    const metaData = {
      id: serverData[i].id,
      name: serverData[i].name || `Crystal ${i}`,
      type: serverData[i].type || 'crystal',
      metrics:serverData[i].metrics,
      animations: serverData[i].animations
    };

    const crystal = createCrystal(color, position, size, metaData);
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

