import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class CameraController {
  constructor(rendererDomElement, scene) {
    this.scene = scene;
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera.position.set(0, 0, 100);

    this.controls = new OrbitControls(this.camera, rendererDomElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2; // не дать перевернуть камеру вниз
  }

  centerOnObjects(objects) {
    if (!objects || objects.length === 0) {
      this.camera.position.set(0, 0, 100);
      this.controls.target.set(0, 0, 0);
      this.controls.update();
      return;
    }

    const group = new THREE.Group();
    objects.forEach(obj => group.add(obj.clone()));
    const box = new THREE.Box3().setFromObject(group);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    this.camera.position.set(center.x, center.y, center.z + Math.max(size.x, size.y, size.z) * 1.5);
    this.controls.target.copy(center);
    this.controls.update();
  }

  update() {
    this.controls.update();
  }

  onResize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
