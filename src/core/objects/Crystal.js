import * as THREE from 'three';

export function createCrystal(color, position, size, metadata = {}) {
  const group = new THREE.Group();

  // Оболочка — октаэдр (кристалл)
  const crystalGeometry = new THREE.OctahedronGeometry(1);
  const shellMaterial = new THREE.MeshPhysicalMaterial({
    color: color.base,
    roughness: 0.03,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    transparent: true,
    opacity: 0.35,
    reflectivity: 0.5,
    transmission: 1.0,
    thickness: 1.0,
    envMapIntensity: 1.5,
    sheen: 0.7,
    ior: 1.5,
    side: THREE.DoubleSide,

    emissive: new THREE.Color(color.base).multiplyScalar(0.1), // лёгкое свечение
    emissiveIntensity: 0.6,
  });

  const shell = new THREE.Mesh(crystalGeometry.clone(), shellMaterial);
  shell.scale.set(size.x, size.y, size.z);

  shell.userData = metadata;

  // Ядро — сфера внутри
  const glowColor = new THREE.Color(color.base).multiplyScalar(1.2);
  const coreMaterial = new THREE.MeshStandardMaterial({
    color: glowColor,
    emissive: glowColor,
    emissiveIntensity: 1.5,
    metalness: 0.3,
    roughness: 0.2,
  });

  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32); // более гладкая сфера
  const core = new THREE.Mesh(sphereGeometry, coreMaterial);
  const scaleFactor = 0.5; // сделать ядро меньше оболочки
  const uniformScale = Math.min(size.x, size.y, size.z) * scaleFactor;
  core.scale.set(uniformScale, uniformScale, uniformScale);

  // Собираем группу
  group.add(shell);
  group.add(core);
  group.position.set(position.x, position.y, position.z);
  group.userData.id = metadata.id;
  group.metadata = metadata;
  return group;
}
