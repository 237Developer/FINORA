import { Icon } from "@iconify/react";
import styles from "../styles/sidebar.module.css";
import Logo from "./Logo";

const navigationItems = [
  {
    id: "categories",
    label: "Catégories",
    icon: "mdi:shape-outline",
  },
  {
    id: "add-expense",
    label: "Ajouter une dépense",
    icon: "mdi:plus-circle",
  },
  {
    id: "logout",
    label: "Déconnexion",
    icon: "mdi:logout",
  },
];

function Sidebar({ isOpen, onClose }) {
  const handleNavigation = (itemId) => {
    if (itemId === "logout") {
      window.location.assign("/auth/log-out");
    }
  };

  return (
    <div
      className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`.trim()}
      onClick={isOpen ? onClose : undefined}
    >
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`.trim()}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <Logo className={styles.sidebarLogo} />

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fermer le menu"
          >
            <Icon icon="mdi:close" />
          </button>
        </div>

        <nav className={styles.nav} aria-label="Navigation principale">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={styles.navItem}
              onClick={() => handleNavigation(item.id)}
            >
              <span className={styles.navIconWrap}>
                <Icon icon={item.icon} className={styles.navIcon} />
              </span>
              <span className={styles.navLabel}>{item.label}</span>
              <Icon icon="mdi:chevron-right" className={styles.navArrow} />
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
