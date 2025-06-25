import * as THREE from 'three';

export function createCrystal(color, position, size) {
  const radius = 1;
  const height = 1;

  const hexBottom = [];
  const hexTop = [];

  // Генерация шестиугольных оснований (нижнего и верхнего)
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    hexBottom.push(new THREE.Vector3(x, -height / 2, z));
    hexTop.push(new THREE.Vector3(x, height / 2, z));
  }

  // Центры пирамид (вершины)
  const bottomApex = new THREE.Vector3(0, -height / 2 - height / 2, 0);
  const topApex = new THREE.Vector3(0, height / 2 + height / 2, 0);

  const vertices = [];

  // Боковые грани призмы
  for (let i = 0; i < 6; i++) {
    const next = (i + 1) % 6;
    // Верх и низ по правильному порядку (против часовой — внешняя сторона)
    vertices.push(
      hexBottom[i], hexBottom[next], hexTop[i],
      hexTop[i], hexBottom[next], hexTop[next]
    );
  }

  // Нижняя пирамида — порядок против часовой (снаружи)
  for (let i = 0; i < 6; i++) {
    const next = (i + 1) % 6;
    vertices.push(hexBottom[next], hexBottom[i], bottomApex);
  }

  // Верхняя пирамида — порядок против часовой (снаружи)
  for (let i = 0; i < 6; i++) {
    const next = (i + 1) % 6;
    vertices.push(hexTop[i], hexTop[next], topApex);
  }

  // Создание BufferGeometry
  const geometry = new THREE.BufferGeometry();
  const positionArray = new Float32Array(vertices.length * 3);
  vertices.forEach((v, i) => {
    positionArray[i * 3 + 0] = v.x * size.x;
    positionArray[i * 3 + 1] = v.y * size.y;
    positionArray[i * 3 + 2] = v.z * size.z;
  });

  geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
  geometry.computeVertexNormals();

  // Материал
  const material = new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.2,
    metalness: 0.0,
    clearcoat: 0.8,
    clearcoatRoughness: 0.05,
    transparent: true,
    opacity: 0.95,
    reflectivity: 0.3,
    transmission: 0.6,
    thickness: 0.5,
    envMapIntensity: 1.0,
    sheen: 0.5,
    ior: 1.3,
    side: THREE.FrontSide // Можно явно указать для надёжности
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(position.x, position.y, position.z);

  return mesh;
}
