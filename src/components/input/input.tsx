import { ShowIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import inputStyles from './input.module.css'
import React from 'react';

const Input = () => {

  const type = 'name';
  const [isFocused, setFocused] = React.useState(false);
  const [value, setValue] = React.useState('');

  const handleFocus = () => {
    setFocused(true);
  }

  const handleBlur = () => {
    setFocused(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className={`${inputStyles.container} ${isFocused ? inputStyles.container_focus : ''}`}>
      <div className={inputStyles.info}>
        <label className={inputStyles.label} htmlFor={type} onClick={handleFocus}>Email</label>
        {
          isFocused || value.length > 0 ?
          <input
            id={type}
            className={inputStyles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleInputChange}
            value={value}
          />
          : <></>
        }
      </div>
      <ShowIcon type='primary' />
    </div>
  )
}

export default Input;