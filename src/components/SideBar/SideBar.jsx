import styles from './SideBar.module.scss';
import Category from '../Category/Category';
import Subscribed from '../Subscribed/Subscribed';
import { useRef } from 'react';
import { useClickOutSide } from '../../hooks/useClickOutSide';

function SideBar({ sidebar, setSideBar }) {
  const sideRef = useRef(null);
  useClickOutSide(sideRef, () => setSideBar(false));
  return (
    <>
      <div className={`${sidebar ? styles.overlay : ''}`}></div>
      <div
        ref={sideRef}
        className={`${styles.sidebar} ${sidebar ? styles.small_sidebar : ''}`}>
        <Category />
        <hr />
        <Subscribed />
      </div>
    </>
  );
}

export default SideBar;
