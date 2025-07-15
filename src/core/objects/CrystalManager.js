import gsap from 'gsap';
import { generateCrystals } from '../utils/crystalUtils';

export class CrystalManager {
    constructor(data) {
        this.crystals = generateCrystals(data);
    }

    addToScene(scene) {
        this.crystals.forEach(crystal => scene.add(crystal));
    }

    animate(delta, targetId = null) {
        this.crystals.forEach(crystalGroup => {
            crystalGroup.rotation.y += delta * crystalGroup.metadata.animations.rotationSpeed;

            const isSelected = targetId && crystalGroup.userData.id === targetId;

            crystalGroup.children.forEach(mesh => {
                if (mesh.isMesh && mesh.material?.emissive) {
                    // Если выбран — запустить пульс света
                    if (isSelected) {
                        // Световой эффект через интенсивность
                        gsap.to(mesh.material, {
                            emissiveIntensity: 1.5,
                            duration: 0.5,
                            yoyo: true,
                            repeat: -1,
                            ease: 'sine.inOut',
                            overwrite: 'auto'
                        });

                        // Цвет может остаться фиксированным
                        mesh.material.emissive.set(0x4444ff);
                    } else {
                        // Сброс
                        gsap.killTweensOf(mesh.material);
                        gsap.to(mesh.material, {
                            emissiveIntensity: 0,
                            duration: 0.4,
                            overwrite: 'auto'
                        });

                        mesh.material.emissive.set(0x000000);
                    }
                }
            });

            if (isSelected) {
                // Пульсация масштаба — бесконечно
                gsap.to(crystalGroup.scale, {
                    x: 1.2,
                    y: 1.2,
                    z: 1.2,
                    duration: 0.5,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut',
                    overwrite: 'auto'
                });
            } else {
                // Сброс пульсации масштаба
                gsap.killTweensOf(crystalGroup.scale);
                gsap.to(crystalGroup.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 0.4,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            }
        });
    }

    dispose() {
        this.crystals.forEach(crystal => {
            crystal.geometry.dispose();
            if (Array.isArray(crystal.material)) {
                crystal.material.forEach(m => m.dispose());
            } else {
                crystal.material.dispose();
            }
        });
    }

    getCrystalMeshes() {
        const meshes = [];
        this.crystals.forEach(group => {
            group.traverse(obj => {
                if (obj.isMesh) {
                    meshes.push(obj);
                }
            });
        });
        return meshes;
    }

}