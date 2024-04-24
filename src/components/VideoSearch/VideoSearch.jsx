import { useDispatch, useSelector } from 'react-redux';
import styles from './VideoSearch.module.scss';
import { converterValue } from '../../utils/ConverterValue';
import { Link } from 'react-router-dom';
import moment from 'moment';

function VideoSearch() {
  const searchData = useSelector((state) => state.search.data);

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
