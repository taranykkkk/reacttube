import styles from './SpinerLoader.module.scss';

function SpinerLoader() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50px',
      }}>
      <div className={styles.spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default SpinerLoader;
