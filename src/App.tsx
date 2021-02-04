import React, { useCallback } from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import InputSearch from './components/input-search';
import SearchResult from './components/search-result';
import { searchYouTubeVideos } from './redux/modules/actions/actions';
import { selectVideoState } from './redux/modules/selectors/selectVideoState';
import { PayloadInterface } from './redux/modules/types';


function App() {
  const videoState: null | PayloadInterface = useSelector(selectVideoState);
  const dispatch = useDispatch();
  const items = videoState?.items;
  
  const searchHandle = useCallback((keyword: string) => {
    dispatch(searchYouTubeVideos(keyword));
  }, [dispatch]);
  
  
  return (
    <>
      <header className="yt-header">
        <div className="container-sm mt-3">
          <InputSearch onSearch={searchHandle}/>
        </div>
      </header>
      <main role="main" className="container-sm pt-5 yt-main">
        <SearchResult items={items}/>
      </main>
      <footer className="yt-footer mt-5">
        <div className="mb-lg-5">
        </div>
      </footer>
    </>
  );
}

export default App;
