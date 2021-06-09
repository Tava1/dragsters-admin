import styles from './styles.module.scss';

const Button = ({ title, ...rest }) => (
  <div className={styles.container}>
    <button
      {...rest}
    >
      {title}
    </button>
  </div>
)

export default Button;