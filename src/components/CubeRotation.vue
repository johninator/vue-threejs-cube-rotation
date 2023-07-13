<template>
  <div id="scene-container">
    <div class="button-container">
      <button class="button" @click="increaseRotationVelocity">Increase Rotation Velocity</button>
      <button class="button" @click="decreaseRotationVelocity">Decrease Rotation Velocity</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { BoxGeometry, Color, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

let cube: Mesh | null = null;
let scene: Scene | null = null;
let camera: PerspectiveCamera | null = null;
let renderer: WebGLRenderer | null = null;
const rotationVelocity = ref(0.01); // Initial rotation velocity

onMounted(() => {
  const container = document.querySelector<HTMLElement>('#scene-container');
  if (container) {
    scene = createScene();
    camera = createCamera(container);
    renderer = createRenderer(container);
    renderer.render(scene, camera);
    animate();
  }
});

const createScene = (): Scene => {
  const scene = new Scene();
  scene.background = new Color('skyblue');
  cube = createCube();
  scene.add(cube);
  return scene;
};

const createCamera = (container: HTMLElement): PerspectiveCamera => {
  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 100;
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 10);
  return camera;
};

const createCube = (): Mesh => {
  const geometry = new BoxGeometry(2, 2, 2);
  const material = new MeshBasicMaterial({
    color: 'green',
    wireframe: true,
    wireframeLinewidth: 1,
  });
  return new Mesh(geometry, material);
};

const createRenderer = (container: HTMLElement): WebGLRenderer => {
  const renderer = new WebGLRenderer();
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.append(renderer.domElement);
  return renderer;
};

const animate = (): void => {
  if (scene && cube && renderer && camera) {
    cube.rotation.x += rotationVelocity.value;
    cube.rotation.y += rotationVelocity.value;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
};

const increaseRotationVelocity = (): void => {
  rotationVelocity.value += 0.01;
};

const decreaseRotationVelocity = (): void => {
  rotationVelocity.value -= 0.01;
};
</script>

<style>
#scene-container {
  width: 800px;
  height: 600px;
  display: relative;
  border: 1px solid black;
}

.button-container {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
}

.button {
  height: 50px;
  width: 150px;
  margin: 5px;
}

</style>
