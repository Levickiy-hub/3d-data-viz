import * as THREE from 'three';
import { gsap } from 'gsap';

export class ConnectionManager {
  constructor(scene, crystals) {
    this.scene = scene;
    this.crystals = crystals;
    this.lines = [];
    this.animations = [];
  }

  createConnections(data) {
    this.clear();

    if (!data || !data.connections || !Array.isArray(data.connections)) {
      console.warn('Invalid connection data');
      return;
    }

    data.connections.forEach(connection => {
      if (!connection.fromId || !connection.toId) {
        console.warn('Skipping invalid connection:', connection);
        return;
      }

      const from = this.crystals.find(c => c.userData.id === connection.fromId);
      const to = this.crystals.find(c => c.userData.id === connection.toId);

      if (!from || !to) return;

      const points = [from.position.clone(), to.position.clone()];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const color = this.getColorByAmount(connection.amount);
      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.5
      });

      const line = new THREE.Line(geometry, material);
      this.lines.push(line);
      this.scene.add(line);

      // Создаем бегущую точку — маленький шарик
      const sphereGeom = new THREE.SphereGeometry(0.1, 16, 16);
      const sphereMat = new THREE.MeshBasicMaterial({ color });
      const sphere = new THREE.Mesh(sphereGeom, sphereMat);
      this.scene.add(sphere);

      // Анимация движения шарика по линии
      const animation = { t: 0 };
      const duration = 2 + Math.random() * 2; // длительность анимации от 2 до 4 секунд

      const anim = gsap.to(animation, {
        t: 1,
        duration,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        onUpdate: () => {
          // Интерполируем позицию по линии
          sphere.position.lerpVectors(points[0], points[1], animation.t);
        }
      });

      this.animations.push({ anim, sphere });
    });
  }

  getColorByAmount(amount) {
    if (amount > 80) return 0xff0000;
    if (amount > 40) return 0xffff00;
    return 0x00ffff;
  }

  clear() {
    this.animations.forEach(({ anim, sphere }) => {
      anim.kill();
      this.scene.remove(sphere);
      sphere.geometry.dispose();
      sphere.material.dispose();
    });
    this.animations = [];

    this.lines.forEach(line => {
      this.scene.remove(line);
      line.geometry.dispose();
      line.material.dispose();
    });
    this.lines = [];
  }

  dispose() {
    this.clear();
  }
}
