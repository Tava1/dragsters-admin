import Link from 'next/link';
import styles from "./styles.module.scss"

const PageSectionTitle = ({ title, count, description, buttonTitle, buttonPath }) => (
  <section className={styles.container}>
    <div>
      <h2>{title} <strong>{count}</strong></h2>
      <p>{description}</p>
    </div>
  </section>
);

export default PageSectionTitle