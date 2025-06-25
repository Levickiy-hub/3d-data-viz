import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class ControlsManager {
    constructor(camera, domElement) {
        this.controls = new OrbitControls(camera, domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
    }

    update() {
        this.controls.update();
    }

    dispose() {
        this.controls.dispose();
    }

    setTarget(x, y, z) {
        this.controls.target.set(x, y, z);
    }

    getControls() {
        return this.controls;
    }
}
