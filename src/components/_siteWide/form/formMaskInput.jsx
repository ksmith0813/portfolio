import React from 'react'
import MaskedInput from 'react-text-mask'
import { validateProperty } from './validators/_baseValidator'
import { getError, handleFormChange } from './util'

export const FormMaskInput = ({
  name,
  element,
  setElement,
  initialValue,
  validator,
  customHandler,
  disabled,
  mask,
  label = null,
  property = null,
  section = null,
  noFloat = false,
  required = false,
  isNumber = false,
  width = '100%',
  extraClasses = '',
}) => {
  const error = element && getError(name, element)

  const onChange = (value) => {
    let updated = handleFormChange(name, property, value, element, isNumber)
    customHandler && customHandler(value, updated)
    validateProperty(validator, updated, name, property, required, section)
    setElement(updated)
  }

  let input = (
    <MaskedInput
      value={initialValue}
      mask={mask}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      autoComplete='off'
      className={`ant-input ${extraClasses} ${noFloat ? 'no-float' : ''}`}
      width={width}
    />
  )

  input = <FormFloat control={input} name={name} label={label} noFloat={noFloat} inputValue={initialValue} />
  return <FormItem control={input} name={name} error={error} />
}
