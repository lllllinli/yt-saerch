import React, {useCallback} from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import {changePage, searchNextYouTubeVideos, searchYouTubeVideos} from './redux/modules/actions';
import InputSearch from './components/input-search';
import { selectVideoState } from './redux/modules/selectors';
import SearchResult from './components/search-result';
import Pagination from './components/pagination';


function App() {
  const videoState: any = useSelector(selectVideoState);
  const dispatch = useDispatch();
  const items = videoState?.items.filter((item: any, idx: number) => {
      return idx < 10 * videoState.currentPage
          && idx >= (10 * (videoState.currentPage - 1));
  });
  if (items?.length === 0) {
      dispatch(searchNextYouTubeVideos(videoState));
  }
  const pageInfo = videoState?.pageInfo;
  const pageCounts = Math.floor(pageInfo?.totalResults / 10);

  const searchHandle = useCallback((value: string) => {
      dispatch(searchYouTubeVideos(value));
  }, [dispatch]);

  const pageChangeHandle = useCallback((page: number) => {
      dispatch(changePage(page));
  }, [dispatch]);

  const renderPagination = () => {
      if (videoState !== null) {
          return (<Pagination
              totalPage={pageCounts}
              totalCounts={pageInfo?.totalResults}
              onPageChange={pageChangeHandle}
          />);
      } else { return null; }
  };

  return (
      <>
          <header className="yt-header">
              <div className="container-sm mt-3">
                <InputSearch onSearch={searchHandle}/>
              </div>
          </header>
          <main role="main" className="container-sm pt-5" >
            <SearchResult items={items} />
              {renderPagination()}
          </main>
      </>
  );
}

export default App;
