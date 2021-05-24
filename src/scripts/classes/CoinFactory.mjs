import {Coin} from './Coin.mjs';

export class CoinFactory {
  constructor(THREE, Cannon, meta) {
    this.THREE = THREE;
    this.Cannon = Cannon;
    this.meta = meta;
  }

  getCoin(position, scale) {
    return new Coin({
      THREE: this.THREE,
      Cannon: this.Cannon,
      geometry: this.meta.geometry,
      material: this.meta.material,
      scale: scale,
      position: position,
    })
  }
}
