import * as THREE from 'three';

export const getEnvMap = async () => {
  const cubeTextureLoader = new THREE.CubeTextureLoader();

  const environmentMapTexture = await cubeTextureLoader.loadAsync([
    './static/textures/envMap/px.png',
    './static/textures/envMap/nx.png',
    './static/textures/envMap/py.png',
    './static/textures/envMap/ny.png',
    './static/textures/envMap/pz.png',
    './static/textures/envMap/nz.png'
  ]);
  environmentMapTexture.encoding = THREE.sRGBEncoding;

  return environmentMapTexture;
}
