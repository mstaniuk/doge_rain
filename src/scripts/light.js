import * as THREE from 'three';

export const getLight = () => {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
  directionalLight.position.set(3, 15, -2);

  return directionalLight;
}
