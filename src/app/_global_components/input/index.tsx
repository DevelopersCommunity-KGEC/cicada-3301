import React from 'react';

import styles from './styles.module.scss';

function CustomInput({
  ...defaultInputProps
}: {} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={styles.inputContainer}>
      <input
        {...defaultInputProps}
        placeholder={''}
        type={defaultInputProps.type ?? 'text'}
        name={defaultInputProps.name ?? ''}
        required={defaultInputProps.required ?? true}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
      />
      <label>{defaultInputProps.placeholder ?? 'Label'}</label>
    </div>
  );
}

export default CustomInput;
