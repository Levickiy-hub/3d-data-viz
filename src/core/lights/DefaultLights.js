import * as THREE from 'three';

export function addDefaultLights(scene) {
  // 1. AmbientLight — равномерное базовое освещение сцены
  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);

  // 2. DirectionalLight — простой солнечный свет без теней
  const directional = new THREE.DirectionalLight(0xffffff, 0.5);
  directional.position.set(5, 10, 7.5);
  scene.add(directional);

  const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.3);
  scene.add(hemisphereLight);
}
