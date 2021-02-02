import { Observable, of } from "rxjs";
import { catchError, debounceTime, map, mergeMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import {SEARCH_NEXT_YOUTUBE_VIDEOS} from "../actionTypes";
import queryString from "querystring";
import {ajax} from "rxjs/ajax";
import {fetchNextVideoFulfilled} from "../actions/fetchNextVideoFulfilled";
import {apiFetchError} from "../actions/apiStatus";

const API_KEY = 'AIzaSyAMgk-hV-duSQMwM6s68141-3NF8lPNueg';

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
                        apiFetchError(error);
                        return of(error);
                    }),
                )
        })
    );
}
