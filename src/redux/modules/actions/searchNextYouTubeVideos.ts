import { SEARCH_NEXT_YOUTUBE_VIDEOS } from '../actionTypes';

export const searchNextYouTubeVideos = (videoState: any) => {
    console.log('', videoState);
    return {
        type: SEARCH_NEXT_YOUTUBE_VIDEOS,
        videoState,
    }
}