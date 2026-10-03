import { Icon } from "@iconify/react";
import styles from "../styles/filter.module.css";

const expenseTypes = ["Tous", "Transport", "Loisirs", "Courses", "Autre"];
const periods = [
  "Toutes",
  "Aujourd'hui",
  "7 derniers jours",
  "30 derniers jours",
  "Personnalisée",
];

function FilterDrawer({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <aside
        className={styles.drawer}
        onClick={(event) => event.stopPropagation()}
        aria-label="Filtres des dépenses"
      >
        <div className={styles.handle} />

        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <span className={styles.headerIcon}>
              <Icon icon="mdi:tune-variant" width="28" height="28" />
            </span>
            <h3>Filtres</h3>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fermer les filtres"
          >
            <Icon icon="mdi:close" width="26" height="26" />
          </button>
        </div>

        <section className={styles.section}>
          <div className={styles.sectionLabel}>
            <Icon icon="mdi:tag-outline" width="20" height="20" />
            <span>Type de dépense</span>
          </div>

          <div className={styles.chips}>
            {expenseTypes.map((item, index) => (
              <button
                key={item}
                type="button"
                className={`${styles.chip} ${index === 0 ? styles.chipActive : ""}`.trim()}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}>
            <Icon icon="mdi:calendar-month-outline" width="20" height="20" />
            <span>Période</span>
          </div>

          <div className={styles.chips}>
            {periods.map((item, index) => (
              <button
                key={item}
                type="button"
                className={`${styles.chip} ${index === 0 ? styles.chipActive : ""}`.trim()}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}>
            <Icon icon="mdi:cash-multiple" width="20" height="20" />
            <span>Montant</span>
          </div>

          <div className={styles.amountGrid}>
            <label className={styles.amountField}>
              <span>Min</span>
              <div className={styles.amountInputRow}>
                <input type="text" placeholder="Min" inputMode="numeric" />
                <span>FCFA</span>
              </div>
            </label>

            <label className={styles.amountField}>
              <span>Max</span>
              <div className={styles.amountInputRow}>
                <input type="text" placeholder="Max" inputMode="numeric" />
                <span>FCFA</span>
              </div>
            </label>
          </div>
        </section>

        <div className={styles.actions}>
          <button type="button" className={styles.resetButton}>
            <Icon icon="mdi:restart" width="20" height="20" />
            <span>Réinitialiser</span>
          </button>

          <button
            type="button"
            className={styles.applyButton}
            onClick={onClose}
          >
            <Icon icon="mdi:check" width="20" height="20" />
            <span>Appliquer</span>
          </button>
        </div>
      </aside>
    </div>
  );
}

export default FilterDrawer;
