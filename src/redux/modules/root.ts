import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { videoReducer } from './reducers';
import { searchNextYouTubEpic, searchYouTubEpic } from './epics';

export interface IRootState {
    videoState: any,
}

export const rootEpic = combineEpics(
    searchYouTubEpic,
    searchNextYouTubEpic,
);

export const rootReducer = combineReducers({
    videoState: videoReducer,
});