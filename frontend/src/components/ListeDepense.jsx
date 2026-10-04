import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";
import ElementListe from "./ElementListe";
import Loader from "./Loader";
import styles from "../styles/listeDepense.module.css";

const filterOptions = [
  { id: "aujourdhui", label: "Aujourd'hui" },
  { id: "cettesemaine", label: "Cette semaine" },
  { id: "cemoici", label: "Ce mois-ci" },
  { id: "toutes", label: "Toutes les dépenses" },
  { id: "personnalise", label: "Personnalisé" },
];

function ListeDepense({ depenses, setDepenses, filter, setFilter, isLoading }) {
  const depensesInverses = [...depenses].reverse();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption =
    filterOptions.find((o) => o.id === filter) || filterOptions[1];

  return (
    <div className={styles.conteneur}>
      <div className={styles.titreRow}>
        <div className={styles.filterContainer} ref={dropdownRef}>
          <div
            className={`${styles.filterTrigger} ${isDropdownOpen ? styles.active : ""}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            role="button"
            tabIndex={0}
          >
            <Icon icon="mdi:calendar-outline" className={styles.calendarIcon} />
            <span className={styles.filterText}>{selectedOption.label}</span>
            <Icon
              icon="mdi:chevron-down"
              className={`${styles.chevron} ${isDropdownOpen ? styles.rotate : ""}`}
            />
          </div>

          <div
            className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.dropdownOpen : ""}`}
          >
            {filterOptions.map((opt) => (
              <div
                key={opt.id}
                className={`${styles.dropdownItem} ${filter === opt.id ? styles.selectedItem : ""}`}
                onClick={() => {
                  if (opt.id === "personnalise") {
                    return;
                  }
                  setFilter(opt.id);
                  setIsDropdownOpen(false);
                }}
              >
                <span>{opt.label}</span>
                {filter === opt.id && (
                  <Icon icon="mdi:check" className={styles.checkIcon} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.liste}>
        {isLoading ? (
          <Loader />
        ) : depensesInverses.length ? (
          depensesInverses.map((depense) => (
            <ElementListe
              key={depense.id}
              id={depense.id}
              description={depense.description}
              categorie={depense.category}
              montant={depense.montant}
              date={depense.date}
              filter={filter}
              setDepenses={setDepenses}
            />
          ))
        ) : (
          <div className={styles.aucuneDepense}>
            <div className={styles.aucuneIconWrapper}>
              <Icon
                icon="mdi:receipt-text-outline"
                className={styles.aucuneIcon}
              />
            </div>
            <p className={styles.aucuneTitre}>Aucune dépense à afficher</p>
            <p className={styles.aucuneSousTitre}>
              Ajoutez votre première dépense pour commencer le suivi.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListeDepense;
