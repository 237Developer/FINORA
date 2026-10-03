import { Icon } from "@iconify/react";
import styles from "../styles/header.module.css";
import { getEmailInitials } from "../utils/getEmailInitials";
import Logo from "./Logo";

export default function Header({ onToggleSidebar, email }) {
  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.menuButton}
        onClick={onToggleSidebar}
        aria-label="Ouvrir le menu"
      >
        <Icon icon="mdi:menu" className={styles.menuIcon} />
      </button>

      <div className={styles.brand}>
        <Logo className={styles.headerLogo} />
      </div>

      <button
        type="button"
        className={styles.profileBadge}
        aria-label={`Utilisateur connecté : ${email || "inconnu"}`}
      >
        {getEmailInitials(email)}
      </button>
    </header>
  );
}
