import * as THREE from 'three';

export const init = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#222222');
  scene.fog = new THREE.Fog(new THREE.Color('#222222'), 10, 20);

  return scene;
}
