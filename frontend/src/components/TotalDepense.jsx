import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";
import styles from "../styles/totalDepense.module.css";
import Loader from "./Loader";

const filterOptions = [
  { id: "aujourdhui", label: "Aujourd'hui" },
  { id: "cettesemaine", label: "Cette semaine" },
  { id: "cemoici", label: "Ce mois-ci" },
  { id: "toutes", label: "Toutes les dépenses" },
  { id: "personnalise", label: "Personnalisé" },
];

export default function TotalDepense({
  totalDepense,
  filter,
  setFilter,
  isLoading,
}) {
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
    <section className={styles.totalDepense}>
      <div>
        <p className={styles.title}>Total des dépenses</p>
        {isLoading ? (
          <Loader />
        ) : (
          <p className={styles.amount}>
            {totalDepense}
            <span>FCFA</span>
          </p>
        )}

        <div className={styles.filterContainer} ref={dropdownRef}>
          <div
            className={`${styles.filterTrigger} ${isDropdownOpen ? styles.active : ""}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            role="button"
            tabIndex={0}
          >
            <span>{selectedOption.label}</span>
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
                  if (opt.id === "personnalise") return;
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
      <Icon icon="mdi:trending-up" className={styles.icon} />
    </section>
  );
}
