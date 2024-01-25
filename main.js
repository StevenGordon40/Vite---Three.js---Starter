import * as THREE from 'three'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry(.7, .2, 16, 100)

// Materials
const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0xFFAA00)

// Mesh
const torus = new THREE.Mesh(geometry, material)
scene.add(torus)

// Lights
const pointLight = new THREE.PointLight(0xFFFFFF, 0.1)
pointLight.position.set(2, 3, 4)
scene.add(pointLight)


// Initial sizing
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera Setup
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 2)
scene.add(camera)

// Renderer Setup
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Handling Resizing
window.addEventListener('resize', () => {
    
    //Update Sizing
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update Renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Animation
const clock = new THREE.Clock()
const tick = () => {

    const elapsedTIme = clock.getElapsedTime()

    // Update Objects
    torus.rotation.y = .5 * elapsedTIme

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()