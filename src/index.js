import * as THREE from 'three';
import * as Cannon from 'cannon-es';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { MotionBlurPass } from './scripts/vendor/MotionBlurPass/MotionBlurPass.js';

import {init as initApi} from './scripts/api.mjs';
import {CoinFactory} from './scripts/classes/CoinFactory.mjs';
import {init as initWorld} from './scripts/world';
import {init as initScene} from './scripts/scene';
import {init as initRenderer} from './scripts/renderer';
import {init as initAssets} from './scripts/assets';

import {getFloor} from './scripts/objects/floor';
import {getWalls} from './scripts/objects/walls';
import {getCamera} from './scripts/camera';
import {getLight} from './scripts/light';

(async () => {
  const loader = document.getElementById('loader');
  const canvas = document.getElementById('scene');
  const wrapper = document.getElementById('wrapper');

  const sizes = {
    width: wrapper.scrollWidth,
    height: wrapper.scrollHeight
  }

  const world = initWorld();
  const scene = initScene();
  const renderer = initRenderer(canvas, sizes);

  const {dogeMeta} = await initAssets();

  const floor = getFloor();
  world.addBody(floor.body);

  const walls = getWalls();
  walls.forEach(wall => world.addBody(wall.body));

  const coinFactory = new CoinFactory(THREE, Cannon, dogeMeta);
  const coins = [];

  const addCoin = (scale = 0.5) => {
    const position = {
      x: (Math.random() - 0.5) * 2,
      y: Math.random() * 5 + 15,
      z: (Math.random() - 0.5) * 2,
    };
    const coin = coinFactory.getCoin(position, scale);

    world.addBody(coin.body);
    scene.add(coin.mesh);

    coins.push(coin)
  }
  initApi(addCoin);

  const light = getLight();
  scene.add(light);

  const camera = getCamera(sizes);
  scene.add(camera);

  const params = {
    enabled: true,
    cameraBlur: false,
    animate: true,
    samples: 7,
    expandGeometry: 0,
    interpolateGeometry: 1,
    smearIntensity: 1,
    speed: 20,
    renderTargetScale: 1,
    jitter: 1,
    jitterStrategy: 2,
  };

  var renderScene = new RenderPass( scene, camera );
  var motionBlurPass = new MotionBlurPass( scene, camera );

  var composer = new EffectComposer( renderer );
  composer.setSize( sizes.width, sizes.height );
  composer.addPass( renderScene );
  composer.addPass( motionBlurPass );
  motionBlurPass.renderToScreen = true;

  loader.style.display = 'none';

  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = wrapper.scrollWidth
    sizes.height = wrapper.scrollHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    composer.setSize( sizes.width, sizes.height );
    composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  })

  const clock = new THREE.Clock();
  let oldElapsedTime = 0;

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - oldElapsedTime;
    oldElapsedTime = elapsedTime;

    world.step(1 / 60, deltaTime, 3);

    for (let i = coins.length - 1; i >= 0; i--) {
      const coin = coins[i];

      coin.update();

      if (coin.shouldBeRemoved) {
        scene.remove(coin.mesh);
        world.removeBody(coin.body);
        coins.splice(i, 1);
      }
    }

    // renderer.render(scene, camera);
    composer.render();
    window.requestAnimationFrame(tick)
  }

  tick();
})();

