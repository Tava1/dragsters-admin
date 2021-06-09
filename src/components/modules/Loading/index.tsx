import styles from "./styles.module.scss"

const Loading = () => (
  <div className={styles.container}>
    <div className={styles.loadIcon}>
      <img src="/assets/images/load-wheel.svg" alt="Loading..." />
    </div>
  </div>
)

export default Loading;