import { useDispatch, useSelector } from 'react-redux';
import styles from './VideoSearch.module.scss';
import { converterValue } from '../../utils/ConverterValue';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useEffect } from 'react';
import { fetchSearchData } from '../../store/searchSlice';

function VideoSearch() {
  const searchData = useSelector((state) => state.search.data);
  const searchValue = useSelector((state) => state.search.searchValue);
  const dispatch = useDispatch();

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      dispatch(fetchSearchData(searchValue));
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => document.removeEventListener('scroll', scrollHandler);
  }, []);
  return (
    <div className={styles.wrap}>
      {searchData?.map((video, i) => (
        <Link
          to={`/video/${video.categoryId}/${video.id.videoId}`}
          key={i}
          className={styles.videoCard}>
          <img src={video.snippet.thumbnails.medium.url} alt="" />
          <div className={styles.videoDesc}>
            <h2>{video.snippet.title}</h2>
            <h3>{video.snippet.channelTitle}</h3>
            <p>
              {converterValue(video.viewCount)} views &bull;{' '}
              {moment(video.snippet.publishedAt).fromNow()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default VideoSearch;
