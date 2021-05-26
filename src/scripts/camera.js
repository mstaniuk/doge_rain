import * as THREE from 'three';

export const getCamera = (sizes) => {
  const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 30);
  camera.position.set(0, -5, 0);
  camera.lookAt(0, 0, 0);

  return camera;
}
