export class Coin {
  constructor({
                THREE,
                geometry,
                material,
                Cannon,
                position,
                scale = 0.5,
              }) {
    this.id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    this.createdOn = performance.now();
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.scale.set(scale, scale, scale);
    this.mesh.position.copy(position);

    this.shouldBeRemoved = false;
    const shape = new Cannon.Cylinder(scale, scale, scale / 5, 16);

    this.body = new Cannon.Body({
      mass: scale,
      position: position,
      shape: shape,
    });

    this.body.sleepSpeedLimit = .5;
    const randomVector1 = new Cannon.Vec3((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40);
    const randomVector2 = new Cannon.Vec3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);
    this.body.applyLocalForce(randomVector1, randomVector2);
    this.body.addEventListener('collide', this.onColide);
  }

  onColide(collision) {
    const strength = collision.contact.getImpactVelocityAlongNormal();
    if (window.navigator.vibrate && strength > 3) {
      const length = strength - 3 * 100;
      window.navigator.vibrate(length);
    }
  }

  update() {
    this.mesh.position.copy(this.body.position);
    this.mesh.quaternion.copy(this.body.quaternion);

    if (performance.now() - 15000 > this.createdOn) {
      this.body.collisionFilterMask = 10;
      this.body.wakeUp();
    }

    if (performance.now() - 20000 > this.createdOn) {
      this.shouldBeRemoved = true;
    }
  }
}
