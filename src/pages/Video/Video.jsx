import PlayVideo from '../../components/PlayVideo/PlayVideo';
import Recommended from '../../components/Recommended/Recommended';
import styles from './Video.module.scss';
import { useParams } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import CommentBlock from '../../components/CommentBlock/CommentBlock';

function Video({ sidebar, setSideBar }) {
  const { videoId, categoryId } = useParams();
  return (
    <>
      <SideBar sidebar={sidebar} setSideBar={setSideBar} />

      <div className={styles.play_container}>
        <PlayVideo videoId={videoId} />

        <Recommended categoryId={categoryId} videoId={videoId} />
      </div>
    </>
  );
}

export default Video;
