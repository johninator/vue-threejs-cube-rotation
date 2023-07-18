<template>
    <div id="scene-container" @keydown="onKeyDown" @keyup="onKeyUp" tabindex="0" @mousemove="onMouseMove" @mousedown="onMouseDown" @mouseup="onMouseUp">
    <div class="button-container">
      <button class="button" @click="increaseRotationVelocity">Increase Rotation Velocity</button>
      <button class="button" @click="decreaseRotationVelocity">Decrease Rotation Velocity</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Mesh, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { createScene } from './Scene';

let cube: Mesh | null = null;
let scene: Scene | null = null;
let camera: PerspectiveCamera | null = null;
let renderer: WebGLRenderer | null = null;
const rotationVelocity = ref(0.01); // Initial rotation velocity
const moveSpeed = ref(1.0); // Camera movement speed

let isMouseDown = false;
let previousMouseX = 0;

onMounted(() => {
  const container = document.querySelector<HTMLElement>('#scene-container');
  if (container) {
    [scene, cube] = createScene();
    camera = createCamera(container);
    renderer = createRenderer(container);
    renderer.render(scene, camera);
    animate();
  }
});

const createCamera = (container: HTMLElement): PerspectiveCamera => {
  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 100;
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 20);
  return camera;
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

const onKeyDown = (event: KeyboardEvent): void => {
  switch (event.key) {
    case 'ArrowUp':
      moveCameraForward();
      break;
    case 'ArrowDown':
      moveCameraBackward();
      break;
    default:
      break;
  }
};

const onKeyUp = (event: KeyboardEvent): void => {
  // You can handle key release events if needed
};

const moveCameraForward = (): void => {
  if (camera) {
    const forward = new Vector3(0, 0, -1);
    forward.applyQuaternion(camera.quaternion);
    camera.position.add(forward.multiplyScalar(moveSpeed.value));
  }
};

const moveCameraBackward = (): void => {
  if (camera) {
    const backward = new Vector3(0, 0, 1);
    backward.applyQuaternion(camera.quaternion);
    camera.position.add(backward.multiplyScalar(moveSpeed.value));
  }
};

const onMouseMove = (event: MouseEvent): void => {
  if (!isMouseDown || !camera) return;

  const mouseX = event.clientX;
  const movementX = mouseX - previousMouseX;
  previousMouseX = mouseX;

  const rotationSpeed = 0.002;
  camera.rotation.y += movementX * rotationSpeed;
};

const onMouseDown = (event: MouseEvent): void => {
  isMouseDown = true;
  previousMouseX = event.clientX;
};

const onMouseUp = (): void => {
  isMouseDown = false;
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
./Scene