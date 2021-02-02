export interface ThumbnailInterface {
    url: string;
    width: number;
    height: number;
}

export interface ThumbnailsInterface {
    default: ThumbnailInterface;
    high: ThumbnailInterface;
    medium: ThumbnailInterface;
}

export interface SnippetInterface {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: 'none' | 'upcoming' | 'live';
    publishTime: string;
    publishedAt: string;
    thumbnails: ThumbnailsInterface;
}

export interface IdInterface {
    kind: string;
    videoId: string;
}

export interface VideoItem {
    etag: string;
    id: IdInterface;
    kind: string;
    snippet: SnippetInterface;
    title: string
}

export interface PageInfoInterface {
    totalResults: number;
    resultsPerPage: number;
}

export interface SearchResponseInterface {
    etag: string;
    items: Array<VideoItem>;
    kind: string;
    nextPageToken: string;
    pageInfo: PageInfoInterface;
    regionCode: string;
}

export interface PayloadInterface extends SearchResponseInterface {
    page: 0;
    currentPage: number;
    searchKeyword: string
}

export interface ActionInterface {
    type: string;
    payload: PayloadInterface;
}