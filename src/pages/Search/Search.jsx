import styles from './Search.module.scss';
import SideBar from '../../components/SideBar/SideBar';
import VideoSearch from '../../components/VideoSearch/VideoSearch';

function Search({ sidebar, setSideBar, category, setCategory }) {
  return (
    <>
      <SideBar
        sidebar={sidebar}
        category={category}
        setCategory={setCategory}
        setSideBar={setSideBar}
      />
      <div className={styles.container}>
        <VideoSearch />
      </div>
    </>
  );
}

export default Search;
