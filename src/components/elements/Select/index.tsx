import React, { SelectHTMLAttributes } from 'react';

import styles from './styles.module.scss';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<string>
  name: string;
  id: string;
}

const Select: React.FC<SelectProps> = ({ title, name, id, required, options, ...rest }) => {
  return (
    <div className={styles.container}>
      <label htmlFor={title}>{title}</label>
      <select
        id={id}
        name={name}
        {...rest}
      >
        <option value="">Selecione</option>
        {options && options.map(option => (
          <option key={options.indexOf(option)} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
export default Select;