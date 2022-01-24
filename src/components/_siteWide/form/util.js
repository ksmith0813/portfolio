import { addCommasToNumber, spacesToProperty } from 'utils/general'

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
    error = element.errors.filter((e) => e.property === propertyName)[0]
  }

  return error
}

export const validateRequiredFields = (form, optionalFields = []) => {
  Object.keys(form).forEach((k) => {
    if (optionalFields.includes(k) || k === 'errors') return
    const value = form[k]
    if ((Array.isArray(value) && !value.length) || !value) {
      form.errors.push({ property: k, message: getRequiredMessage(k) })
    }
  })

  return form
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

  return copy
}

export const getRequiredMessage = (property) => `${spacesToProperty(property)} is required`
