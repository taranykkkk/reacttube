import { useSelector } from 'react-redux';
import styles from './VideoDescription.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useResizeWidth } from '../../hooks/useResizeWidth';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function VideoDescription() {
  const apiData = useSelector((state) => state.video);
  const [viewWidthP, setViewWidthP] = useState(null);
  const [showButton, setShowButton] = useState(true);
  const ref = useRef(null);
  const viewportWidth = useResizeWidth();

  useEffect(() => {
    setViewWidthP(ref.current.clientWidth - 55);
  }, [apiData, viewportWidth]);

  const handleShowDesc = () => {
    ref.current.classList.add(styles.showDescription);
    setShowButton(false);
  };
  return (
    <div className={styles.video_description}>
      <div className={styles.desc_wrapper} ref={ref}>
        <ReactMarkdown rehypePlugins={[remarkGfm]}>
          {apiData.data[0] ? apiData.data[0].snippet.description : ''}
        </ReactMarkdown>
        {ref && showButton && (
          <button
            className={styles.descButton}
            style={{ left: `${viewWidthP}px` }}
            onClick={handleShowDesc}>
            ...more
          </button>
        )}
      </div>

      <hr />
    </div>
  );
}

export default VideoDescription;
