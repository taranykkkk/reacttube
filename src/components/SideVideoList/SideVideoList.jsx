import styles from './SideVideoList.module.scss';
import { converterValue } from '../../utils/ConverterValue';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { handlerUpPage } from '../../utils/HandleUpPage';
import { useDispatch } from 'react-redux';
import { clearRecommended } from '../../store/recommendedSlice';

function SideVideoList({
  imageURL,
  title,
  channel,
  views,
  date,
  category,
  videoId,
}) {
  const dispatch = useDispatch();
  return (
    <Link
      to={`/video/${category}/${videoId}`}
      className={styles.side_video_list}
      onClick={() => {
        dispatch(clearRecommended());
        handlerUpPage();
      }}>
      <img src={imageURL} />
      <div className={styles.video_info}>
        <h4>{title}</h4>
        <p>{channel}</p>
        <p>
          {converterValue(views) + ' views'} &bull;{' '}
          <span>{moment(date).fromNow()}</span>
        </p>
      </div>
    </Link>
  );
}

export default SideVideoList;
