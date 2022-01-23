import React from 'react'
import { Form } from 'antd'
import MaskedInput from 'react-text-mask'
import { spacesToProperty } from 'utils/general'
import { validateProperty } from './validators/_baseValidator'
import { getError, handleFormChange } from './util'
import { FormFloatLabel } from './formFloatLabel'

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

  let inputContent = (
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

  let input

  if (noFloat) {
    input = inputContent
  } else {
    input = (
      <FormFloatLabel label={label || spacesToProperty(name)} name={name} inputValue={initialValue}>
        {inputContent}
      </FormFloatLabel>
    )
  }

  if (error) {
    return (
      <Form.Item name={name} validateStatus='error' help={error.message}>
        {input}
      </Form.Item>
    )
  }

  return <Form.Item name={name}>{input}</Form.Item>
}
