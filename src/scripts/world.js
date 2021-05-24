import * as Cannon from 'cannon-es';

export const init = () => {
  const world = new Cannon.World();
  world.gravity.set(0, -9.8, 0);
  world.broadphase = new Cannon.SAPBroadphase(world);
  world.allowSleep = true;
  world.solver.tolerance = 0.1;

  const defaultMaterial = new Cannon.Material('default');

  const defaultContactMaterial = new Cannon.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
      friction: 0.3,
      restitution: 0.4,
    }
  );

  world.addContactMaterial(defaultContactMaterial);
  world.defaultContactMaterial = defaultContactMaterial;

  return world;
}

