import * as THREE from 'three';
import OrbitControlsLib from './controls/OrbitControls'; // локальный импорт OrbitControls
import { addDefaultLights } from './lights/DefaultLights';
import { generateCrystals, centerCameraOnCrystals } from './utils/crystalUtils';
import { FPSCounter } from './utils/fpsUtils';
import { createBackground, animateBackground } from './background';
import { createFloorGrid } from './Grid'; // или где ты положишь

export class SceneManager {
  constructor(canvas, data) {
    this.canvas = canvas;

    // Инициализация сцены и рендерера
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
    this.renderer.shadowMap.enabled = false;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Камера
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Таймер для анимации
    this.clock = new THREE.Clock();

    // Счётчик FPS
    this.fpsCounter = new FPSCounter();

    // Привязка методов к this
    this.resize = this.resize.bind(this);
    this.animate = this.animate.bind(this);

    // Размер канваса и камера
    this.resize();
    window.addEventListener('resize', this.resize);

    // Контролы камеры
    this.controls = new OrbitControlsLib(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    // Освещение сцены
    addDefaultLights(this.scene);

    this.floorGrid = createFloorGrid();
    this.scene.add(this.floorGrid);
    
    // Кристаллы — массив мешей
    this.crystals = generateCrystals(data);
    this.crystals.forEach(crystal => this.scene.add(crystal));

    // Центрируем камеру на кристаллах
    centerCameraOnCrystals(this.camera, this.controls, this.crystals);

    this.bgData = createBackground(this.scene, this.renderer);

    // Запуск анимации
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate);

    const delta = this.clock.getDelta();

    // Плавное вращение каждого кристалла вокруг своей оси Y
    this.crystals.forEach(crystal => {
      crystal.rotation.y += delta * 0.1;
    });

    animateBackground(this.bgData);

    this.controls.update();
    this.renderer.render(this.scene, this.camera);

    this.fpsCounter.update();
  }

  dispose() {
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.resize);

    this.scene.traverse(obj => {
      if (obj.isMesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });

    this.controls.dispose();
    this.renderer.dispose();
  }
}
