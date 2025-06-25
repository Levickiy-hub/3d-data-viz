export class FPSCounter {
    constructor() {
      this.fps = 0;
      this.frameCount = 0;
      this.lastTime = performance.now();
    }
  
    update() {
      const now = performance.now();
      this.frameCount++;
  
      if (now - this.lastTime >= 1000) {
        this.fps = this.frameCount;
        this.frameCount = 0;
        this.lastTime = now;
        console.log(`FPS: ${this.fps}`);
      }
    }
  }
  