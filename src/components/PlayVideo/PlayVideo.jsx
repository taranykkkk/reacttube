import styles from './PlayVideo.module.scss';
import PlayVideoInfo from '../PlayVideoInfo/PlayVideoInfo';
import Publisher from '../Publisher/Publisher';
import VideoDescription from '../VideoDescription/VideoDescription';
import CommentBlock from '../CommentBlock/CommentBlock';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVideoData } from '../../store/videoSlice';
import { fetchChannelData } from '../../store/channelSlice';
import {
  clearComment,
  fetchCommentData,
  setFetchingComment,
} from '../../store/commentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useResizeWidth } from '../../hooks/useResizeWidth';

function PlayVideo() {
  const { videoId } = useParams();

  const dispatch = useDispatch();
  const videoState = useSelector((state) => state.video);
  const fetchingComment = useSelector((state) => state.comment.fetching);
  const viewWidth = useResizeWidth();

  const test = useSelector((state) => state.comment.data);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      dispatch(setFetchingComment(true));
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return () => document.removeEventListener('scroll', scrollHandler);
  }, []);

  useEffect(() => {
    dispatch(fetchVideoData(videoId));
    if (fetchingComment && viewWidth > 1100) {
      dispatch(fetchCommentData(videoId));
    }
  }, [videoId, fetchingComment, viewWidth]);

  useEffect(() => {
    dispatch(clearComment());
    dispatch(fetchCommentData(videoId));
  }, [videoId]);

  useEffect(() => {
    if (!!videoState.data.length) {
      dispatch(fetchChannelData());
    }
  }, [videoId, videoState.data[0]]);

  return (
    <div className={styles.play_video}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen></iframe>
      <h3>{videoState?.data[0] ? videoState.data[0].snippet.title : ''}</h3>
      <PlayVideoInfo />
      <hr />
      <Publisher />
      <VideoDescription />
      <CommentBlock viewWidth={viewWidth} videoId={videoId} />
    </div>
  );
}

export default PlayVideo;
