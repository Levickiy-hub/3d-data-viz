import { createBackground, animateBackground } from './background';

export class BackgroundManager {
  constructor(scene, renderer) {
    this.bgData = createBackground(scene, renderer);
  }

  animate() {
    animateBackground(this.bgData);
  }

  dispose() {

  }
}
