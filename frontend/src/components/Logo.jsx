import styles from "../styles/logo.module.css";

export default function Logo({ className = "" }) {
  return (
    <h1 className={`${styles.logoText} ${className}`.trim()}>
      FINORA
    </h1>
  );
}
