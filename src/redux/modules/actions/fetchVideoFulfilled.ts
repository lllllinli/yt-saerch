import _ from 'lodash';
import { FETCH_VIDEO_FULFILLED } from '../actionTypes';
import { PayloadInterface, SearchResponseInterface } from '../types';

export const fetchVideoFulfilled = (response: SearchResponseInterface, searchKeyword: string) => {
    const payload: PayloadInterface = {
        ..._.cloneDeep(response),
        page: 0,
        currentPage: 1,
        searchKeyword,
    };

    return { type: FETCH_VIDEO_FULFILLED, payload };
};