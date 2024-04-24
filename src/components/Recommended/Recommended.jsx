import SideVideoList from '../SideVideoList/SideVideoList';
import styles from './Recommended.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearRecommended,
  fetchRecommended,
  setFetchingRecommended,
} from '../../store/recommendedSlice';

function Recommended({ categoryId, videoId }) {
  const apiData = useSelector((state) => state.recommended.recommended);
  const dispatch = useDispatch();
  const fetching = useSelector((state) => state.recommended.fetching);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      dispatch(setFetchingRecommended(true));
    }
  };

  useEffect(() => {
    if (fetching && apiData.length < 20) {
      dispatch(fetchRecommended(categoryId));
    }
  }, [fetching, categoryId, videoId]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return () => document.removeEventListener('scroll', scrollHandler);
  }, []);
  return (
    <div className={styles.recommended}>
      {apiData?.map((item, i) => (
        <SideVideoList
          key={i}
          imageURL={item.snippet.thumbnails.medium.url}
          title={item.snippet.title}
          channel={item.snippet.channelTitle}
          views={item.statistics.viewCount}
          date={item.snippet.publishedAt}
          category={item.snippet.categoryId}
          videoId={item.id}
        />
      ))}
    </div>
  );
}

export default Recommended;
