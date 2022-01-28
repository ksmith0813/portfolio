import React from 'react'
import { InputNumber } from 'antd'
import { validateProperty } from './validators/_baseValidator'
import { getError, handleFormChange } from './util'

export const FormNumber = ({
  name,
  element,
  setElement,
  initialValue,
  validator,
  customHandler,
  disabled,
  label = null,
  property = null,
  section = null,
  noFloat = false,
  required = false,
  isCurrency = false,
  width = '100%',
}) => {
  const error = element && getError(name, element)

  const onChange = (value) => {
    let updated = handleFormChange(name, property, value, element, true)
    customHandler && customHandler(value, updated)
    validateProperty(validator, updated, name, property, required, section)
    setElement(updated)
  }

  let input = (
    <InputNumber
      value={initialValue}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      precision={2}
      formatter={(value) => `${isCurrency ? '$' : ''}${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
      autoComplete='off'
      className={`${noFloat ? 'no-float' : ''}`}
      style={{ width: width }}
      {...others}
    />
  )

  input = <FormFloat control={input} name={name} label={label} noFloat={noFloat} inputValue={initialValue} />
  return <FormItem control={input} name={name} error={error} />
}
