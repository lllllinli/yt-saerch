import { CHANGE_PAGE } from '../actionTypes';

export const changePage = (page: number) => {
    return {
        type: CHANGE_PAGE,
        payload: { page },
    }
};