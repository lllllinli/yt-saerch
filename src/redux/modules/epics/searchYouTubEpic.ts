import { from, interval, Observable, of } from 'rxjs';
import { catchError, debounce, filter, map, mergeMap, startWith } from 'rxjs/operators';
import queryString from 'querystring';
import { SearchResponseInterface } from '../types';
import { isActionOf } from 'typesafe-actions';
import { Epic } from 'redux-observable';
import { fetchVideoFulfilled, searchYouTubeVideos } from '../actions/actions';

const loadSuggestionsInProgress = () => {
  return {
    type: 'LOADING_IN_PROGRESS',
    status: 'InProgress',
  }
}

const getRequest = (url: string) => {
  const request = fetch(url)
    .then(response => response.json())
  return from(request)
}

const getUrl = (searchKeyword: string) => {
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const maxResults = 50;
  const youtubeSearchParams = {
    key: apiKey,
    q: searchKeyword,
    maxResults,
    part: 'id,snippet',
    type: 'video'
  };
  return `https://www.googleapis.com/youtube/v3/search?${queryString.stringify(youtubeSearchParams)}`;
}


export const searchYouTubEpic: Epic<any> = (action$: Observable<any>, state$: any) => {
  return action$.pipe(
    filter(isActionOf(searchYouTubeVideos)),
    debounce(() => interval(1000)),
    mergeMap((action) => {
      const searchKeyword = action.keyword;
      const url = getUrl(searchKeyword);
      
      return getRequest(url)
        .pipe(
          map((response: SearchResponseInterface) => fetchVideoFulfilled(response, searchKeyword)),
          catchError(error => of(error)),
        );
    }),
    startWith(loadSuggestionsInProgress()),
  );
};