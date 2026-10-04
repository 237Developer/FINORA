import { Icon } from "@iconify/react";
import { useState } from "react";
import styles from "../styles/elementListe.module.css";
import { formatExpenseDate } from "../utils/formatExpenseDate";

// Config des catégories : icône + couleurs
const CATEGORIES = {
  alimentation: {
    icone: "mdi:basket",
    couleurIcone: "#16a34a",
    couleurFond: "#dcfce7",
  },
  transport: {
    icone: "mdi:bus",
    couleurIcone: "#2563eb",
    couleurFond: "#dbeafe",
  },
  logement: {
    icone: "mdi:home",
    couleurIcone: "#9333ea",
    couleurFond: "#f3e8ff",
  },
  loisirs: {
    icone: "mdi:ticket-outline",
    couleurIcone: "#f59e0b",
    couleurFond: "#fef3c7",
  },
  autre: {
    icone: "mdi:dots-horizontal",
    couleurIcone: "#6b7280",
    couleurFond: "#f3f4f6",
  },
};

function ElementListe({
  id,
  description,
  categorie,
  montant,
  date,
  filter,
  setDepenses,
}) {
  // Si la catégorie n'existe pas dans la config, on prend "Autre" par défaut
  const config = CATEGORIES[categorie] || CATEGORIES.autre;
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/data/${id}?frequency=${filter}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.depenses && setDepenses) {
        setDepenses(data.depenses);
      }
    } catch (err) {
      console.error(err);
      setIsDeleting(false);
    }
  };

  return (
    <div className={`${styles.element} ${isDeleting ? styles.deleting : ""}`}>
      <div
        className={styles.iconeWrapper}
        style={{ backgroundColor: config.couleurFond }}
      >
        <Icon
          icon={config.icone}
          color={config.couleurIcone}
          width="22"
          height="22"
        />
      </div>

      <div className={styles.infos}>
        <p className={styles.description}>{description}</p>
        <span
          className={styles.badge}
          style={{
            backgroundColor: config.couleurFond,
            color: config.couleurIcone,
          }}
        >
          {categorie}
        </span>
        <p className={styles.date}>
          <Icon icon="mdi:calendar-outline" width="15" height="15" />
          {formatExpenseDate(date)}
        </p>
      </div>

      <p className={styles.montant}>- {montant} F</p>

      <button
        className={styles.boutonSupprimer}
        onClick={handleDelete}
        disabled={isDeleting}
      >
        <Icon icon="mdi:trash-can-outline" width="20" height="20" />
      </button>
    </div>
  );
}

export default ElementListe;
