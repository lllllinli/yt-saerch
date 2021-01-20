import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, debounceTime } from 'rxjs/operators';
import { SEARCH_YOUTUBE_VIDEOS, FETCH_VIDEO_FULFILLED, FETCH_FAIL, SEARCH_NEXT_YOUTUBE_VIDEOS, FETCH_NEXT_VIDEO_FULFILLED } from './actionTypes';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import queryString from 'querystring';
import _ from 'lodash';

const fetchVideoFulfilled = (payload: any, searchKeyword: string) => {

    payload = {
        ..._.cloneDeep(payload),
        currentPage: 1,
        searchKeyword,
    };
    return { type: FETCH_VIDEO_FULFILLED, payload };
};


const fetchError = (error: any) => ({ type: FETCH_FAIL, error });
const API_KEY = 'AIzaSyAMgk-hV-duSQMwM6s68141-3NF8lPNueg';

export const searchYouTubEpic = (action$: Observable<any>) => {
    return action$.pipe(
        debounceTime(1000),
        ofType(SEARCH_YOUTUBE_VIDEOS),
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
                    map(response => fetchVideoFulfilled(response, searchKeyword)),
                    catchError(error => {
                        console.error('error: ', error);
                        fetchError(error);
                        return of(error);
                    }),
                )
        })
 );
}

const fetchNextVideoFulfilled = (payload: any) => {
    return { type: FETCH_NEXT_VIDEO_FULFILLED, payload };
};

export const searchNextYouTubEpic = (action$: Observable<any>) => {
    return action$.pipe(
        debounceTime(1000),
        ofType(SEARCH_NEXT_YOUTUBE_VIDEOS),
        mergeMap((action) => {
            const nextPageToken = action.videoState.nextPageToken;
            const searchKeyword = action.videoState.searchKeyword;

            const maxResults = 50;
            const youtubeSearchParams = {
                key: API_KEY,
                pageToken: nextPageToken,
                q: searchKeyword,
                maxResults,
                part: 'id,snippet',
                type: 'video'
            };
            const url = `https://www.googleapis.com/youtube/v3/search?${queryString.stringify(youtubeSearchParams)}`;
            return ajax
                .getJSON(url)
                .pipe(
                    map(response => fetchNextVideoFulfilled(response)),
                    catchError(error => {
                        console.error('error: ', error);
                        fetchError(error);
                        return of(error);
                    }),
                )
        })
    );
}



