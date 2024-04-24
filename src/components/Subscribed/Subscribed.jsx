import styles from './Subscribed.module.scss';
import { CircleUserRound } from 'lucide-react';

const SubscribedData = ['PewDiePie', 'MDN', 'Discovery', 'MrBeast', 'TopGear'];

function Subscribed() {
  return (
    <div className={styles.subscribed_list}>
      <h3>Subscribed</h3>
      {SubscribedData.map((sub) => (
        <div key={sub} className={styles.side_link}>
          <CircleUserRound color="#00d8ff" /> <p>{sub}</p>
        </div>
      ))}
    </div>
  );
}

export default Subscribed;
