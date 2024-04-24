import { converterValue } from '../../utils/ConverterValue';
import styles from './Publisher.module.scss';
import { useSelector } from 'react-redux';

function Publisher() {
  const apiData = useSelector((state) => state.video);
  const channelData = useSelector((state) => state.channel);
  return (
    <div className={styles.publisher}>
      <img
        style={{ marginRight: '5px' }}
        src={
          channelData.data
            ? channelData.data.snippet?.thumbnails.default.url
            : ''
        }
      />
      <div className={styles.user_desc}>
        <p>{apiData.data[0] ? apiData.data[0].snippet.channelTitle : ''}</p>
        <span>
          {channelData.data
            ? converterValue(channelData.data.statistics?.subscriberCount) +
              ' Subscribers'
            : ''}
        </span>
      </div>
      <button>Subscribe</button>
    </div>
  );
}

export default Publisher;
