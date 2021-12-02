import React from 'react'

import './input.style.scss'

const Input = ({
  type,
  value,
  onInput,
  label,
  placeholder,
  isToggleAll,
  id,
  className,
}) => {
  return (
    <>
      <input
        className={className}
        id={id}
        type={type}
        onChange={onInput}
        placeholder={placeholder}
        value={value}
      />
      {isToggleAll && <label></label>}

      {!isToggleAll && <label>{label}</label>}
    </>
  )
}

export default Input
