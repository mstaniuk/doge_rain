import * as Cannon from 'cannon-es';

export const getFloor = (position = {x: 0, y: 0, z: 0}) => {
  const planeShape = new Cannon.Plane();
  const floorBody = new Cannon.Body();

  floorBody.mass = 0;
  floorBody.position = new Cannon.Vec3(position.x, position.y, position.z);
  floorBody.addShape(planeShape);
  floorBody.quaternion.setFromAxisAngle(new Cannon.Vec3(-1, 0, 0), Math.PI * 0.5);

  return {
    body: floorBody,
    mesh: null
  };
}
