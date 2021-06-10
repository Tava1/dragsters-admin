import { TextareaHTMLAttributes } from 'react';
import { UseFormRegister } from "react-hook-form";
import styles from './styles.module.scss';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id: string;
  name: string;
  register: UseFormRegister<any>;
  required: boolean;
  error?: string;
}

const TextArea = ({ id, register, required, name, label, error, ...rest }: TextAreaProps) => (
  <div className={styles.container}>
    <label htmlFor={id}>{label}</label>
    <textarea
      id={id}
      name={name}
      {...rest}
      {...register(name, { required })}
    >
    </textarea>
    {error && (
      <span>{error}</span>
    )}
  </div>
)

export default TextArea;