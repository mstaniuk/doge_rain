import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

export const getDogeCoinMeta = async (envMap) => {
  const gltfLoader = new GLTFLoader();
  const dogeMeta = {
    material: {},
    geometry: {}
  }

  const dogeGltfObject = await gltfLoader.loadAsync('./static/models/doge/doge.gltf');

  dogeGltfObject.scene.traverse(function (child) {
    if (child.isMesh) {
      dogeMeta.material = child.material;
      dogeMeta.material.envMap = envMap;
      dogeMeta.material.envMapIntensity = 1.5;
      dogeMeta.material.metalness = 0.97;
      dogeMeta.geometry = child.geometry;
    }
  });

  return dogeMeta;
}
