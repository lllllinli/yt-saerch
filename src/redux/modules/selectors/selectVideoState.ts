import { IRootState } from '../root';
import { PayloadInterface } from '../types';

export const selectVideoState = (state: IRootState): null | PayloadInterface => {
  return (state.videoState);
}
