import styles from "../styles/loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.dots}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
}
