import {CHANGE_PAGE, FETCH_NEXT_VIDEO_FULFILLED, FETCH_VIDEO_FULFILLED} from './actionTypes';
import _ from 'lodash';

export const videoReducer = (state: any = null, action: any) => {
    switch (action.type) {
        case FETCH_VIDEO_FULFILLED:
            return action.payload;

        case FETCH_NEXT_VIDEO_FULFILLED:
            const newItems = action.payload.items;
            state.items = state.items.concat(newItems);
            state.nextPageToken = action.payload.nextPageToken

            return _.cloneDeep(state);

        case CHANGE_PAGE:
            state.currentPage = action.page;
            return _.cloneDeep(state);

        default:
            return state
    }
}