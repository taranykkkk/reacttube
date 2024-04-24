import { useDispatch, useSelector } from 'react-redux';
import { converterValue } from '../../utils/ConverterValue';
import Comment from '../Comment/Comment';
import styles from './CommentBlock.module.scss';
import { fetchCommentData } from '../../store/commentSlice';

function CommentBlock({ viewWidth, videoId }) {
  const apiData = useSelector((state) => state.video);
  const commentData = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  const handleViewMore = () => {
    dispatch(fetchCommentData(videoId));
  };
  return (
    <>
      <div className={styles.comment_container}>
        <h4>
          {apiData.data[0]
            ? converterValue(apiData.data[0].statistics.commentCount)
            : ''}{' '}
          comments
        </h4>
        <Comment commentData={commentData} />
      </div>
      {viewWidth < 1101 && (
        <button className={styles.viewMoreComment} onClick={handleViewMore}>
          View more
        </button>
      )}

      <hr />
    </>
  );
}

export default CommentBlock;
