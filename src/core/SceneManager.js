import * as THREE from 'three';
import { ControlsManager } from './controls/OrbitControls';
import { addDefaultLights } from './lights/DefaultLights';
import { centerCameraOnCrystals } from './utils/crystalUtils';
import { FPSCounter } from './utils/fpsUtils';
import { createFloorGrid } from './Grid';
import { CrystalManager } from './objects/CrystalManager';
import { CameraManager } from './CameraManager';
import { BackgroundManager } from './background/BackgroundManager';
import { RendererManager } from './renderer/RendererManager';

export class SceneManager {
  constructor(canvas, data, target, setTarget) {
    this.canvas = canvas;
    //Обработчик нажатия
    this.setTarget = setTarget;
    this.target = target;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.canvas.addEventListener('pointerdown', this.onClick.bind(this));
    // Инициализация сцены и рендерера
    this.scene = new THREE.Scene();

    this.rendererManager = new RendererManager(canvas);
    this.renderer = this.rendererManager.getRenderer();

    // Инициализация CameraManager
    this.cameraManager = new CameraManager(window.innerWidth, window.innerHeight);
    this.camera = this.cameraManager.getCamera();
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
    this.controlsManager = new ControlsManager(this.camera, this.renderer.domElement);

    // Освещение сцены
    addDefaultLights(this.scene);

    this.floorGrid = createFloorGrid();
    this.scene.add(this.floorGrid);

    // Используем CrystalManager
    this.crystalManager = new CrystalManager(data);
    this.crystalManager.addToScene(this.scene);

    // Центрируем камеру на кристаллах
    centerCameraOnCrystals(this.camera, this.controlsManager.getControls(), this.crystalManager.crystals);

    this.backgroundManager = new BackgroundManager(this.scene, this.renderer);

    // Запуск анимации
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.rendererManager.resize();
    this.cameraManager.resize(width, height);
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate);

    const delta = this.clock.getDelta();

    // Плавное вращение кристаллов через CrystalManager
    this.crystalManager.animate(delta, this.target?.id);

    this.backgroundManager.animate();

    this.controlsManager.update();
    this.renderer.render(this.scene, this.camera);

    this.fpsCounter.update();
  }

  onClick(event) {
    const rect = this.canvas.getBoundingClientRect();

    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(this.crystalManager.getCrystalMeshes());

    if (intersects.length > 0) {
      const mesh = intersects[0].object;
      const crystalData = mesh.userData;

      this.setTarget(crystalData); // Установить выбранный объект
    }
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

    this.controlsManager.dispose();
    this.rendererManager.dispose();
    this.backgroundManager.dispose();
  }

  updateTarget(target) {
    this.target = target;
  }
}
