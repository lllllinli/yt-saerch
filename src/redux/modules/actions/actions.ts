import _ from 'lodash';
import { createCustomAction } from 'typesafe-actions';
import { FETCH_VIDEO_FULFILLED, SEARCH_YOUTUBE_VIDEOS } from '../actionTypes';
import { PayloadInterface, SearchResponseInterface } from '../types';

export const searchYouTubeVideos = createCustomAction(SEARCH_YOUTUBE_VIDEOS, (keyword: string) => ({  keyword,  }));

export const fetchVideoFulfilled = createCustomAction(
  FETCH_VIDEO_FULFILLED,
  (response: SearchResponseInterface, searchKeyword: string) => {
    const payload: PayloadInterface = {
      ..._.cloneDeep(response),
      page: 0,
      currentPage: 1,
      searchKeyword,
    };
    
    return { payload };
  });