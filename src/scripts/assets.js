import {getEnvMap} from './envMap';
import {getDogeCoinMeta} from './getDogeCoinMeta';

export const init = async () => {
  const environmentMapTexture = await getEnvMap();
  const dogeMeta = await getDogeCoinMeta(environmentMapTexture);

  return {
    environmentMapTexture,
    dogeMeta,
  }
}
