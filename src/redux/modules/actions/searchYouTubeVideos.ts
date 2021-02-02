import { SEARCH_YOUTUBE_VIDEOS } from '../actionTypes';

export const searchYouTubeVideos = (keyword: string) => {
    return {
        type: SEARCH_YOUTUBE_VIDEOS,
        keyword
    };
}