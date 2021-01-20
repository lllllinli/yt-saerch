import * as React from 'react';
import './earchResult.scss';


interface SearchResultProps {
    items: any
}

interface SearchResultInterface extends React.FC<SearchResultProps> {}

const SearchResult:  SearchResultInterface = ({items, ...props}) => {
    let itemsRender: any;
    if (items) {
        itemsRender = items.map((item: any, idx: number) => {
            const title = item.snippet.title;
            const imgSrc = item.snippet.thumbnails.high.url;
            const href = `https://www.youtube.com/watch?v=${item.id.videoId}`;
            return (
                    <a
                        className="yt-search-content-main"
                        key={idx}
                        href={href}
                        target="_blank"
                        rel="noreferrer noopener">
                        <div className="card">
                            <img src={imgSrc} className="rounded float-start" alt="" width="100%"/>
                            <p>{title}</p>
                        </div>
                    </a>

            );
        });
    }

    return (
        <div className="yt-search-container">
            <div className="yt-search-row">
                {itemsRender}
            </div>
        </div>
    );
};

export default SearchResult;