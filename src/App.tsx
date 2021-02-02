import React, { useCallback } from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import InputSearch from './components/input-search';
import SearchResult from './components/search-result';
import Pagination from './components/pagination';
import { searchNextYouTubeVideos } from './redux/modules/actions/searchNextYouTubeVideos';
import { searchYouTubeVideos } from './redux/modules/actions/searchYouTubeVideos';
import { changePage } from './redux/modules/actions/changePage';
import { selectVideoState } from './redux/modules/selectors/selectVideoState';
import { PayloadInterface } from './redux/modules/types';


function App() {
  const videoState: null | PayloadInterface = useSelector(selectVideoState);
  const dispatch = useDispatch();
  const items = videoState?.items.filter((item: any, idx: number) => {
    return idx < 10 * videoState.currentPage
      && idx >= (10 * (videoState.currentPage - 1));
  });
  if (items?.length === 0) {
      dispatch(searchNextYouTubeVideos(videoState));
  }
  const pageInfo = videoState ? videoState?.pageInfo : null;
  const pageCounts = pageInfo ? Math.floor(pageInfo?.totalResults / 10) : 0;
  const totalCounts = pageInfo ? pageInfo?.totalResults : 0;

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
              totalCounts={totalCounts}
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
          <main role="main" className="container-sm pt-5 yt-main" >
              <SearchResult items={items} />
          </main>
          <footer className="yt-footer mt-5">
              <div className="mb-lg-5">
                  {renderPagination()}
              </div>
          </footer>
      </>
  );
}

export default App;
