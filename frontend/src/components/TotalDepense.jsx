import { Icon } from "@iconify/react";
import styles from "../styles/totalDepense.module.css";

export default function TotalDepense({ totalDepense }) {
  return (
    <section className={styles.totalDepense}>
      <div>
        <p className={styles.title}>Total des dépenses</p>
        <p className={styles.amount}>
          {totalDepense}
          <span>FCFA</span>
        </p>
      </div>
      <Icon icon="mdi:trending-up" className={styles.icon} />
    </section>
  );
}
