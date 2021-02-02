import { interval, Observable, of } from 'rxjs';
import { catchError, debounce, map, mergeMap, startWith } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { SEARCH_YOUTUBE_VIDEOS } from '../actionTypes';
import queryString from 'querystring';
import { ajax } from 'rxjs/ajax';
import { fetchVideoFulfilled } from '../actions/fetchVideoFulfilled';
import { apiFetchError } from '../actions/apiStatus';
import { SearchResponseInterface } from '../types';

const loadSuggestionsInProgress = () => {
  return {
    type: 'LOADING_IN_PROGRESS',
    status: 'InProgress',
  }
}

const API_KEY = 'AIzaSyAMgk-hV-duSQMwM6s68141-3NF8lPNueg';

export const searchYouTubEpic = (action$: Observable<any>, state$: any) => {
  return action$.pipe(
    ofType(SEARCH_YOUTUBE_VIDEOS),
    debounce(() => interval(1000)),
    mergeMap((action) => {
      const searchKeyword = action.keyword;
      const maxResults = 50;
      const youtubeSearchParams = {
        key: API_KEY,
        q: searchKeyword,
        maxResults,
        part: 'id,snippet',
        type: 'video'
      };
      const url = `https://www.googleapis.com/youtube/v3/search?${queryString.stringify(youtubeSearchParams)}`;
      return ajax
        .getJSON(url)
        .pipe(
          map((response) => fetchVideoFulfilled(response as SearchResponseInterface, searchKeyword)),
          catchError(error => {
            console.error('error: ', error);
            apiFetchError(error);
            return of(error);
          }),
        );
    }),
    startWith(loadSuggestionsInProgress()),
  );
};