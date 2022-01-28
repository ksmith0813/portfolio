import React, { useRef, useEffect, forwardRef } from 'react'
import { Input } from 'antd'
import { validateProperty } from './validators/_baseValidator'
import { getError, handleFormChange } from './util'
import { FormItem } from './formItem'
import { FormFloat } from './formItem'

export const FormInput = ({
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
  isNumber = false,
  isPassword,
  focus,
  width = '100%',
  ...others
}) => {
  const inputRef = useRef(null)

  useEffect(() => {
    focus && inputRef.current?.focus()
  }, [focus])

  const error = element && getError(name, element)

  const onChange = (value) => {
    let updated = handleFormChange(name, property, value, element, isNumber)
    customHandler && customHandler(value, updated)
    validateProperty(validator, updated, name, property, required, section)
    setElement(updated)
  }

  let input = (
    <ControlInput
      ref={inputRef}
      value={initialValue}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      noFloat={noFloat}
      width={width}
      {...others}
    />
  )

  input = <FormFloat control={input} name={name} label={label} noFloat={noFloat} inputValue={initialValue} />
  return <FormItem control={input} name={name} error={error} />
}

const ControlInput = forwardRef((props, ref) => {
  return props.isPassword ? (
    <Input.Password
      ref={ref}
      value={props.value}
      disabled={props.disabled}
      onChange={props.onChange}
      autoComplete='off'
      className={`${props.noFloat ? 'no-float' : ''}`}
      style={{ width: props.width }}
      {...props.others}
    />
  ) : (
    <Input
      ref={ref}
      value={props.value}
      disabled={props.disabled}
      onChange={props.onChange}
      autoComplete='off'
      className={`${props.noFloat ? 'no-float' : ''}`}
      style={{ width: props.width }}
      {...props.others}
    />
  )
})
