import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { searchYouTubEpic } from './epics/searchYouTubEpic';
import { videosReducer } from './reducers/videosReducer';
import { PayloadInterface } from './types';

export interface IRootState {
  videoState: null | PayloadInterface,
  apiState: any,
}

export const rootEpic = combineEpics(
  searchYouTubEpic,
);

export const rootReducer = combineReducers({
  videoState: videosReducer,
});