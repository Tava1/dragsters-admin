import React, { InputHTMLAttributes } from 'react';
import { UseFormRegister } from "react-hook-form";

import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  name: string;
  register: UseFormRegister<any>;
  required: boolean;
  error?: string;
}

const Input = ({ id, label, register, required, name, error, ...rest }: InputProps) => (
  <div className={styles.container}>
    {label && <label htmlFor={id}>{label}</label>}
    <input
      id={id}
      name={name}
      {...register(name, { required })}
      {...rest}
    />
    {error && (
      <span>{error}</span>
    )}
  </div>
);

export default Input;