import _ from 'lodash';
import { CHANGE_PAGE, FETCH_NEXT_VIDEO_FULFILLED, FETCH_VIDEO_FULFILLED } from '../actionTypes';
import { ActionInterface, PayloadInterface } from '../types';

const videoInitState: null | PayloadInterface = null;

const getVideos = (action: ActionInterface) => action.payload;

const getNextAction = (state: null | PayloadInterface, action: ActionInterface) => {
    const newItems = action.payload.items;
    if (state !== null) {
        state.items = state?.items.concat(newItems);
        state.nextPageToken = action.payload.nextPageToken;
    }
    return _.cloneDeep(state);
}

const getChangePageVideos = (state: null | PayloadInterface, action: ActionInterface) => {
    if (state !== null) {
        state.currentPage = action.payload.page;
        return _.cloneDeep(state);
    } else {
        return state;
    }

}

export const videoReducer = (
    state: null | PayloadInterface  = videoInitState,
    action: ActionInterface,
) => {
    
    switch (action.type) {
        case FETCH_VIDEO_FULFILLED:
            console.log('> action:', action);
            return getVideos(action);

        case FETCH_NEXT_VIDEO_FULFILLED:
            return getNextAction(state, action);

        case CHANGE_PAGE:
            return getChangePageVideos(state, action);

        default:
            return state;

    }
}