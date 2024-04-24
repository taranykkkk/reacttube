import styles from './PlayVideoInfo.module.scss';
import { ThumbsUp, ThumbsDown, Share2, SquarePlus } from 'lucide-react';
import { converterValue } from '../../utils/ConverterValue';
import moment from 'moment';
import { useSelector } from 'react-redux';

function PlayVideoInfo() {
  const apiData = useSelector((state) => state.video);
  return (
    <div className={styles.play_video_info}>
      <p>
        {apiData.data[0]
          ? converterValue(apiData.data[0].statistics.viewCount)
          : ''}{' '}
        views &bull;{' '}
        {apiData.data[0]
          ? moment(apiData.data[0].snippet.publishedAt).fromNow()
          : ''}
      </p>
      <div>
        <span>
          <ThumbsUp size={20} />
          {apiData.data[0]
            ? converterValue(apiData.data[0].statistics.likeCount)
            : ''}
        </span>
        <span>
          <ThumbsDown size={20} />
        </span>
        <span>
          <Share2 size={20} />
          Share
        </span>
        <span>
          <SquarePlus size={20} />
          Save
        </span>
      </div>
    </div>
  );
}

export default PlayVideoInfo;
