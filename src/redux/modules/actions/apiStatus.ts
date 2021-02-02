import { FETCH_FAIL } from '../actionTypes';

export const apiFetchError = (error: any) => ({ type: FETCH_FAIL, error });