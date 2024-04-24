import {
  Bell,
  Menu,
  Search,
  Upload,
  Video,
  CircleUserRound,
  ArrowLeft,
} from 'lucide-react';
import styles from './NavBar.module.scss';
import logo from '../../assets/react.svg';
import { Link } from 'react-router-dom';
import { useResizeWidth } from '../../hooks/useResizeWidth';
import { useEffect, useLayoutEffect, useState } from 'react';
import InputSearch from '../InputSearch/InputSearch';

function NavBar({ sidebar, setSideBar }) {
  const [clickSearch, setClickSearch] = useState(false);
  const viewportWidth = useResizeWidth();

  const lockScroll = () => {
    if (sidebar) {
      document.body.style.marginRight = '17px';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.marginRight = '0';
      document.body.style.overflow = 'auto';
    }
  };

  useLayoutEffect(() => {
    lockScroll();
  }, [sidebar]);

  useEffect(() => {
    if (viewportWidth > 500) {
      setClickSearch(false);
    }
  }, [viewportWidth]);
  return (
    <nav className="flex_div">
      {clickSearch ? (
        <>
          <ArrowLeft
            size={30}
            color="#00d8ff"
            onClick={() => setClickSearch(false)}
          />{' '}
          <InputSearch visibility={clickSearch} />
        </>
      ) : (
        <div className={`${styles.nav_left} flex_div`}>
          {!sidebar ? (
            <Menu
              onClick={() => setSideBar(!sidebar)}
              className={styles.menu_icon}
              size={25}
              color="#00d8ff"
            />
          ) : (
            <ArrowLeft size={25} color="#00d8ff" className={styles.menu_icon} />
          )}
          <Link to={'/'}>
            <div className={styles.logo}>
              <img width={25} src={logo} alt="Logo" />
              <h2>ReactTube</h2>
            </div>
          </Link>
        </div>
      )}
      {viewportWidth > 500 && (
        <div className={`${styles.nav_middle} flex_div`}>
          <InputSearch />
        </div>
      )}

      <div className={`${styles.nav_right} flex_div`}>
        <Video size={25} color="#00d8ff" />
        <Upload size={25} color="#00d8ff" />
        <Bell size={25} color="#00d8ff" />
        {viewportWidth <= 500 && (
          <Search
            size={20}
            color="#00d8ff"
            className={clickSearch ? styles.visibility : styles.search_icon}
            onClick={() => setClickSearch(true)}
          />
        )}

        <CircleUserRound
          size={25}
          color="#00d8ff"
          className={styles.user_icon}
        />
      </div>
    </nav>
  );
}

export default NavBar;
