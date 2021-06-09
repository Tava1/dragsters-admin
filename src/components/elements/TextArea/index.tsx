import styles from './styles.module.scss';

const TextArea = ({ id, register, required, name, label, ...rest }) => (
  <div className={styles.container}>
    <label htmlFor={id}>{label}</label>
    <textarea
      id={id}
      name={name}
      {...rest}
      {...register(name, { required })}
    >
    </textarea>
    {/* {error && (
        <span>{error}</span>
      )} */}
  </div>
)

export default TextArea