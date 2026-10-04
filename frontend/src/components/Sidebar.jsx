import { Icon } from "@iconify/react";
import { useState } from "react";
import styles from "../styles/sidebar.module.css";
import Logo from "./Logo";

const categories = [
  { value: "alimentation", label: "Alimentation", icon: "mdi:silverware-fork-knife" },
  { value: "transport", label: "Transport", icon: "mdi:car" },
  { value: "logement", label: "Logement", icon: "mdi:home-outline" },
  { value: "loisirs", label: "Loisirs", icon: "mdi:party-popper" },
  { value: "autre", label: "Autre", icon: "mdi:shape-outline" },
];

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

function Sidebar({ isOpen, onClose, onOpenForm, email }) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const handleNavigation = (itemId) => {
    if (itemId === "categories") {
      setIsCategoriesOpen((prev) => !prev);
    } else if (itemId === "add-expense") {
      if (onClose) onClose();
      if (onOpenForm) onOpenForm();
    } else if (itemId === "logout") {
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
          {navigationItems.map((item) => {
            const isCategories = item.id === "categories";
            return (
              <div key={item.id} className={styles.navGroup}>
                <button
                  type="button"
                  className={styles.navItem}
                  onClick={() => handleNavigation(item.id)}
                >
                  <span className={styles.navIconWrap}>
                    <Icon icon={item.icon} className={styles.navIcon} />
                  </span>
                  <span className={styles.navLabel}>{item.label}</span>
                  <Icon
                    icon={isCategories ? "mdi:chevron-down" : "mdi:chevron-right"}
                    className={`${styles.navArrow} ${isCategories && isCategoriesOpen ? styles.rotateChevron : ""}`}
                  />
                </button>

                {isCategories && (
                  <div className={`${styles.subDropdown} ${isCategoriesOpen ? styles.subDropdownOpen : ""}`}>
                    {categories.map((cat) => (
                      <div
                        key={cat.value}
                        className={styles.subItem}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className={styles.subItemIconWrap}>
                          <Icon icon={cat.icon} className={styles.subItemIcon} />
                        </span>
                        <span className={styles.subItemLabel}>{cat.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <hr className={styles.divider} />

        <div className={styles.userInfo}>
          <span className={styles.userIconWrap}>
            <Icon icon="mdi:account-circle" className={styles.userIcon} />
          </span>
          <span className={styles.userEmail}>{email || "Utilisateur"}</span>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
