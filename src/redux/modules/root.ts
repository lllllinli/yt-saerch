import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { searchYouTubEpic } from './epics/searchYouTubEpic';
import { searchNextYouTubEpic } from './epics/searchNextYouTubEpic';
import { videoReducer } from './reducers/videoReducer';
import { PayloadInterface } from './types';
import { apiReducer } from './reducers/apiReducer';

export interface IRootState {
    videoState: null | PayloadInterface,
    apiState: any,
}

export const rootEpic = combineEpics(
    searchYouTubEpic,
    searchNextYouTubEpic,
);

export const rootReducer = combineReducers({
    videoState: videoReducer,
    apiState: apiReducer,
});