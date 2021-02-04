import {
  ActionInterface,
  PayloadInterface,
} from '../types';
import { createReducer } from 'typesafe-actions';
import { fetchVideoFulfilled } from '../actions/actions';

const videosInitState: PayloadInterface = {
  page: 0,
  currentPage: 0,
  searchKeyword: '',
  etag: '',
  items: null,
  kind: '',
  nextPageToken: '',
  pageInfo: {
    totalResults: 0,
    resultsPerPage: 0,
  },
  regionCode: '',
};

const getVideos = (action: ActionInterface) => action.payload;

export const videosReducer = createReducer(videosInitState)
  .handleAction(fetchVideoFulfilled, (
    state: PayloadInterface,
    action: ActionInterface,
  ) => getVideos(action));
