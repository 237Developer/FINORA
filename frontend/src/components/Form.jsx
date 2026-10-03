import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";
import styles from "../styles/form.module.css";
import Button from "./Button";
import { getDefaultDateTime } from "../utils/getDefaultDateTime";
import { handleFormSubmit } from "../utils/expenseFormHandlers";

const categories = [
  { value: "alimentation", label: "Alimentation", icon: "mdi:silverware-fork-knife" },
  { value: "transport", label: "Transport", icon: "mdi:car" },
  { value: "logement", label: "Logement", icon: "mdi:home-outline" },
  { value: "loisirs", label: "Loisirs", icon: "mdi:party-popper" },
  { value: "autre", label: "Autre", icon: "mdi:shape-outline" },
];

export default function Form({ setDepense }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [category, setCategory] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [dateValue, setDateValue] = useState(getDefaultDateTime());

  const dropdownRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setCategory("");
    setDateValue(getDefaultDateTime());
    setErrorMessage("");
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const onSubmit = (e) => handleFormSubmit({
    e,
    setIsSubmitting,
    setErrorMessage,
    setDepense,
    handleClose,
  });

  if (!isOpen) {
    return (
      <Button 
        type="button" 
        loading={false} 
        onClick={() => setIsOpen(true)}
        icon="mdi:plus-circle-outline"
      >
        Ajouter une dépense
      </Button>
    );
  }

  const selectedCatObj = categories.find((c) => c.value === category);
  const timeOnly = dateValue ? dateValue.split('T')[1] : '';

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
      <div className={styles.formHeader}>
        <h3>Nouvelle Dépense</h3>
        <button 
          type="button" 
          className={styles.closeBtn} 
          onClick={handleClose}
          aria-label="Fermer"
        >
          <Icon icon="mdi:close" />
        </button>
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Description</label>
        <div className={styles.inputContainer}>
          <Icon icon="mdi:file-document-outline" className={styles.fieldIcon} />
          <input
            id="description"
            type="text"
            placeholder="Ex. : Courses au supermarché"
            name="description"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="montant">Montant</label>
        <div className={styles.inputContainer}>
          <Icon icon="mdi:cash" className={styles.fieldIcon} />
          <input 
            id="montant" 
            type="number" 
            placeholder="0" 
            name="montant" 
            step="any"
          />
          <span className={styles.currencyBadge}>FCFA</span>
        </div>
      </div>

      <div className={styles.field} ref={dropdownRef}>
        <label htmlFor="category">Catégorie</label>
        <div className={styles.selectWrapper}>
          <div 
            className={`${styles.inputContainer} ${styles.selectTrigger} ${isCategoryOpen ? styles.active : ""}`}
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            tabIndex={0}
            role="button"
          >
            <Icon icon={selectedCatObj ? selectedCatObj.icon : "mdi:tag-outline"} className={styles.fieldIcon} />
            <span className={selectedCatObj ? styles.selectedText : styles.placeholderText}>
              {selectedCatObj ? selectedCatObj.label : "Sélectionner une catégorie"}
            </span>
            <Icon icon="mdi:chevron-down" className={`${styles.chevron} ${isCategoryOpen ? styles.rotate : ""}`} />
          </div>

          <input type="hidden" name="category" value={category} />

          <div className={`${styles.dropdownMenu} ${isCategoryOpen ? styles.dropdownOpen : ""}`}>
            {categories.map((cat) => (
              <div
                key={cat.value}
                className={`${styles.dropdownItem} ${category === cat.value ? styles.selectedItem : ""}`}
                onClick={() => {
                  setCategory(cat.value);
                  setIsCategoryOpen(false);
                }}
              >
                <Icon icon={cat.icon} />
                <span>{cat.label}</span>
                {category === cat.value && <Icon icon="mdi:check" className={styles.checkIcon} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="date">Date & Heure <span className={styles.todayLabel}>(Aujourd'hui à {timeOnly})</span></label>
        <div className={styles.inputContainer}>
          <Icon icon="mdi:calendar-clock-outline" className={styles.fieldIcon} />
          <input 
            id="date" 
            type="datetime-local" 
            name="date" 
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
          />
        </div>
      </div>

      {errorMessage && (
        <div className={styles.error}>
          <Icon icon="mdi:alert-circle-outline" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className={styles.formActions}>
        <Button 
          type="button" 
          className={styles.cancelBtn} 
          onClick={handleClose}
          icon="mdi:close"
        >
          Annuler
        </Button>
        <Button 
          loading={isSubmitting} 
          className={styles.submitBtn}
          icon="mdi:check"
        >
          Enregistrer
        </Button>
      </div>
    </form>
  );
}
