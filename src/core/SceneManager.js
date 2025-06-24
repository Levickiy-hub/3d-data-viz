import * as THREE from 'three'
import OrbitControlsLib from './controls/OrbitControls'
import { addDefaultLights } from './lights/DefaultLights'
import { createCube } from './objects/Cube'

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

    this.clock = new THREE.Clock()
    this.animationFrameId = null

    this.resize = this.resize.bind(this)

    this.resize()
    window.addEventListener('resize', this.resize)
    this.animate()

    this.controls = new OrbitControlsLib(this.camera, this.renderer.domElement)
    addDefaultLights(this.scene)
    this.scene.add(createCube())

    this.animate = this.animate.bind(this)
    requestAnimationFrame(this.animate)
  }

  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate)

    const delta = this.clock.getDelta()

    // future updates, e.g. this.update(delta)
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    cancelAnimationFrame(this.animationFrameId)

    window.removeEventListener('resize', this.resize)

    this.scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose?.()
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((m) => m.dispose?.())
        } else {
          object.material.dispose?.()
        }
      }
    })

    this.renderer.dispose()
  }
}
