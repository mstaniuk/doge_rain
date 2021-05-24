import * as THREE from 'three';

export const init = (canvas, sizes) => {
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
  })

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.physicallyCorrectLights = true;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5;

  return renderer;
};

