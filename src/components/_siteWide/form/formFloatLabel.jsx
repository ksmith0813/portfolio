import React, { useState } from 'react'
import './form.scss'

export const FormFloatLabel = ({ children, label, inputValue }) => {
  const [focus, setFocus] = useState(false)
  inputValue = Array.isArray(inputValue) ? inputValue.length : inputValue 
  const labelClass = `label ${focus || inputValue ? 'float' : 'default'}`

  return (
    <div onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
      {children}
      <label className={labelClass}>{label}</label>
    </div>
  )
}
