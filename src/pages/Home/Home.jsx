import styles from './Home.module.scss';
import SideBar from '../../components/SideBar/SideBar';
import Feed from '../../components/Feed/Feed';
import { useState } from 'react';

function Home({ sidebar, setSideBar, category, setCategory }) {
  return (
    <>
      <SideBar
        sidebar={sidebar}
        category={category}
        setCategory={setCategory}
        setSideBar={setSideBar}
      />
      <div className={styles.container}>
        <Feed category={category} />
      </div>
    </>
  );
}

export default Home;
