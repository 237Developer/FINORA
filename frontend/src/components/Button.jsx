import { Icon } from "@iconify/react";
import styles from "../styles/button.module.css";

export default function Button({
  loading = false,
  children,
  className = "",
  type = "submit",
  onClick,
  icon = "mdi:plus",
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`.trim()}
      disabled={loading}
      onClick={onClick}
    >
      {loading ? (
        <>
          <span className={styles.loader} aria-label="Ajout en cours" />
          <span>Ajout en cours ...</span>
        </>
      ) : (
        <>
          {icon && <Icon icon={icon} />}
          {children}
        </>
      )}
    </button>
  );
}
