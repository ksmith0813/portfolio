import React from 'react'
import { validateProperty } from './validators/_baseValidator'
import { getError, handleFormChange } from './util'

export const FormTextArea = ({
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
  width = '100%',
  height = '200px',
}) => {
  const error = element && getError(name, element)

  const onChange = (value) => {
    let updated = handleFormChange(name, property, value, element)
    customHandler && customHandler(value, updated)
    validateProperty(validator, updated, name, property, required, section)
    setElement(updated)
  }

  let input = (
    <textarea
      value={initialValue}
      disabled={disabled}
      onChange={(value) => onChange(value)}
      className={`${noFloat ? 'no-float' : ''}`}
      style={{ width: width, height: height }}
      {...others}
    />
  )

  input = <FormFloat control={input} name={name} label={label} noFloat={noFloat} inputValue={initialValue} />
  return <FormItem control={input} name={name} error={error} style={{ height: height }} />
}
