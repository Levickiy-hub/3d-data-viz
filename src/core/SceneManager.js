import * as THREE from 'three'

export class SceneManager {
  constructor(canvas) {
    this.canvas = canvas
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    this.camera.position.set(0, 0, 10)
    this.resize()
    window.addEventListener('resize', this.resize.bind(this))

    this.animate = this.animate.bind(this)
    requestAnimationFrame(this.animate)
  }

  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  animate() {
    requestAnimationFrame(this.animate)
    this.renderer.render(this.scene, this.camera)
  }
}
