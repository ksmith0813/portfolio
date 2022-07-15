import React, { useState } from 'react'
import { isArray } from 'underscore'
import './formFloatLabel.scss'

export const FormFloatLabel = ({ children, label, inputValue }) => {
  const [focus, setFocus] = useState(false)
  inputValue = isArray(inputValue) ? inputValue.length : inputValue
  const labelClass = `label ${focus || inputValue ? 'float' : 'default'}`

  return (
    <div onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
      {children}
      <label className={labelClass}>{label}</label>
    </div>
  )
}
