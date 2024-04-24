import { Link } from 'react-router-dom';
import styles from './Category.module.scss';
import {
  Aperture,
  Car,
  Cpu,
  Gamepad2,
  Home,
  Music,
  Newspaper,
  Trophy,
  Tv,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../store/categorySlice';
import { handlerUpPage } from '../../utils/HandleUpPage';

const ShortcutLink = [
  { name: 'Home', component: <Home color="#00d8ff" />, id: 0 },
  { name: 'Gaming', component: <Gamepad2 color="#00d8ff" />, id: 20 },
  { name: 'Automobiles', component: <Car color="#00d8ff" />, id: 2 },
  { name: 'Sports', component: <Trophy color="#00d8ff" />, id: 17 },
  { name: 'Entertainment', component: <Tv color="#00d8ff" />, id: 24 },
  { name: 'Technology', component: <Cpu color="#00d8ff" />, id: 28 },
  { name: 'Music', component: <Music color="#00d8ff" />, id: 10 },
  { name: 'Blogs', component: <Aperture color="#00d8ff" />, id: 22 },
  { name: 'News', component: <Newspaper color="#00d8ff" />, id: 25 },
];

function Category() {
  const category = useSelector((state) => state.category.category);
  const dispatch = useDispatch();

  return (
    <div className={styles.shortcut_links}>
      {ShortcutLink.map((link) => (
        <Link to="/" key={link.name} onClick={handlerUpPage}>
          <div
            className={`${styles.side_link} ${
              category === link.id ? styles.active : ''
            }`}
            onClick={() => dispatch(setCategory(link.id))}>
            {link.component}
            <p>{link.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Category;
