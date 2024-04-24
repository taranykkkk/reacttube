import { Link } from 'react-router-dom';
import styles from './Feed.module.scss';
import { useEffect } from 'react';
import { converterValue } from '../../utils/ConverterValue.js';
import moment from 'moment';
import {
  fetchData,
  setFetchingFeed,
  clearFeed,
} from '../../store/feedSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { handlerUpPage } from '../../utils/HandleUpPage';
import Skeleton from '../Skeleton/Skeleton.jsx';

function Feed() {
  const data = useSelector((state) => state.feed.data);
  const category = useSelector((state) => state.category.category);
  const fetching = useSelector((state) => state.feed.fetching);
  const status = useSelector((state) => state.feed.status);

  const dispatch = useDispatch();

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      dispatch(setFetchingFeed(true));
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => document.removeEventListener('scroll', scrollHandler);
  }, []);

  useEffect(() => {
    if (fetching) {
      dispatch(fetchData(category));
    }
  }, [fetching, category]);

  useEffect(() => {
    if (data.length) {
      dispatch(clearFeed());
    }
    dispatch(fetchData(category));
  }, [category]);

  const skeleton = [...Array(8)].map((_, i) => <Skeleton key={i} />);
  return (
    <div className={styles.feed}>
      {data?.map((obj, i) => (
        <Link
          to={`video/${obj.snippet.categoryId}/${obj.id}`}
          key={i}
          className={styles.card}
          onClick={handlerUpPage}>
          <img src={obj.snippet.thumbnails.medium.url} alt="" />
          <h2>{obj.snippet.localized.title.slice(0, 90) + '...'}</h2>
          <h3>{obj.snippet.channelTitle}</h3>
          <p>
            {' '}
            {converterValue(obj.statistics.viewCount)} views &bull;{' '}
            {moment(obj.snippet.publishedAt).fromNow()}
          </p>
        </Link>
      ))}
      {status === 'loading' && skeleton}
    </div>
  );
}

export default Feed;
