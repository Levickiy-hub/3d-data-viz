import * as THREE from 'three';

export function createBackground(scene, renderer) {
  // Туман
  scene.fog = new THREE.FogExp2(0x0a0a2a, 0.0015);
  renderer.setClearColor(scene.fog.color);

  // Частицы
  const particleCount = 10000;
  const particlesGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const speeds = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    speeds[i] = 0.001 + Math.random() * 0.004;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    color: 0x0077ff,
    size: 0.3,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
  });

  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  return {
    particles,
    particlesGeometry,
    speeds,
    particleCount,
  };
}

export function animateBackground(data) {
  const { particlesGeometry, speeds, particleCount } = data;
  const positions = particlesGeometry.attributes.position.array;
  const time = Date.now() * 0.001;

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3 + 1] += Math.sin(time + i) * speeds[i];
    positions[i * 3] += speeds[i] * 0.1 * Math.sin(time + i * 0.1);
    positions[i * 3 + 2] += speeds[i] * 0.1 * Math.cos(time + i * 0.1);

    if (positions[i * 3] > 50) positions[i * 3] = -50;
    if (positions[i * 3] < -50) positions[i * 3] = 50;
    if (positions[i * 3 + 2] > 50) positions[i * 3 + 2] = -50;
    if (positions[i * 3 + 2] < -50) positions[i * 3 + 2] = 50;
  }

  particlesGeometry.attributes.position.needsUpdate = true;
}
