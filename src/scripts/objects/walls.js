import * as Cannon from 'cannon-es';

const wallPositions = [
  [[0, 0, -3], null],
  [[0, 0, 3], [[0, -1, 0], Math.PI]],
  [[-3, 0, 0], [[0, 1, 0], Math.PI * 0.5]],
  [[3, 0, 0], [[0, -1, 0], Math.PI * 0.5]],
];
export const getWalls = () => {
  const planeShape = new Cannon.Plane();
  const walls = [];

  for (const [position, quaternion] of wallPositions) {
    const wallBody = new Cannon.Body();
    wallBody.mass = 0;
    wallBody.position = new Cannon.Vec3(...position);
    wallBody.addShape(planeShape);

    if (quaternion) {
      wallBody.quaternion.setFromAxisAngle(new Cannon.Vec3(...quaternion[0]), quaternion[1]);
    }

    walls.push({
      body: wallBody,
    })
  }

  return walls;
}
