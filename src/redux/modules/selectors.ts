import { IRootState } from './root';

export const selectState = (state: IRootState) => (state);

export const selectVideoState = (state: IRootState) => (state.videoState);