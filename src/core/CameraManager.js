import * as THREE from 'three';

export class CameraManager {
  constructor(width, height, fov = 60, near = 0.1, far = 1000) {
    this.camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
  }

  resize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  getCamera() {
    return this.camera;
  }
}
