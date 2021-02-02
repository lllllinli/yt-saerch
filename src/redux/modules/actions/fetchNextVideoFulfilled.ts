import { FETCH_NEXT_VIDEO_FULFILLED } from '../actionTypes';

export const fetchNextVideoFulfilled = (payload: any) => {
    return { type: FETCH_NEXT_VIDEO_FULFILLED, payload };
};