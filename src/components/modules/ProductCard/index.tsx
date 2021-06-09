import { useRouter } from 'next/router';

import styles from "./styles.module.scss"

const ProductCard = ({ id, title, fullTitle, price, brand, showcase }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push({
        pathname: '/showcase',
        query: { id }
      })}
      className={styles.card}
    >
      <div className={styles.showcase}>
        <img src={showcase} alt={fullTitle} />
      </div>
      <div className={styles.context}>
        <div className={styles.header}>
          <span>{title}</span>
          <h2>{fullTitle}</h2>
        </div>
        <div className={styles.footer}>
          <span><strong>R$ {price}</strong>/CADA</span>
          <h2>{brand}</h2>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;