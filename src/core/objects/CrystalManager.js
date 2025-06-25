import { generateCrystals } from '../utils/crystalUtils';

export class CrystalManager {
    constructor(data) {
        this.crystals = generateCrystals(data);
    }

    addToScene(scene) {
        this.crystals.forEach(crystal => scene.add(crystal));
    }

    animate(delta) {
        this.crystals.forEach(crystal => {
            crystal.rotation.y += delta * 0.1;
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
}