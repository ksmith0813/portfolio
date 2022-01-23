import { addCommasToNumber, spacesToProperty } from 'utils/general'

export const getRules = (property, required) => {
  let propertyName = property
  if (Array.isArray(property)) propertyName = property[1]
  return { required: required, message: required && getRequiredMessage(propertyName) }
}

export const getError = (property, element) => {
  if (!element) return null
  if (!element.errors) element.errors = []

  let error
  let propertyName = property
  if (Array.isArray(property)) {
    const index = property[0]
    propertyName = property[1]
    error = element.errors.filter((e) => e.property === propertyName && e.index === index)[0]
  } else {
    element.errors.filter((e) => e.property === propertyName)[0]
  }

  return error
}

export const validateRequiredFields = (formData, optionalFields = []) => {
  Object.keys(formData).forEach((k) => {
    if (optionalFields.includes(k)) return
    if (!formData[k]) formData.errors.push({ property: k, message: getRequiredMessage(k) })
  })
}

export const handleFormChange = (property, nestedProperty, value, element, isNumber = false) => {
  const copy = { ...element }
  if (isNumber) value = addCommasToNumber(value)
  if (Array.isArray(property)) {
    const index = property[0]
    const arrayProperty = property[1]
    copy[nestedProperty][index][arrayProperty] = value
  } else {
    copy[property] = value
  }
}

export const getRequiredMessage = (property) => `${spacesToProperty(property)} is required`
