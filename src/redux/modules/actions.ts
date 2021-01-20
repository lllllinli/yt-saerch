import { SEARCH_YOUTUBE_VIDEOS, CHANGE_PAGE, SEARCH_NEXT_YOUTUBE_VIDEOS } from './actionTypes';

export const searchYouTubeVideos = (keyword: string) => {
    return {
        type: SEARCH_YOUTUBE_VIDEOS,
        keyword
    };
}

export const searchNextYouTubeVideos = (videoState: any) => {
    console.log('> searchNextYouTubeVideos');
    return {
        type: SEARCH_NEXT_YOUTUBE_VIDEOS,
        videoState,
    }
}

export const changePage = (page: number) => {
    return {
        type: CHANGE_PAGE,
        page,
    }
};