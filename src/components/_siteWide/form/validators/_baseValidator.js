import { getRequiredMessage } from '../util'

export const validateProperty = (
  validator,
  formData,
  property,
  nestedProperty = null,
  required = false,
  section = null
) => {
  let value
  let propertyName = property

  if (Array.isArray(property)) {
    propertyName = property[1]
    value = formData[nestedProperty][property[0]][propertyName]
  } else {
    value = formData[property]
  }

  formData.errors = formData.errors.filter((e) => e.property !== propertyName)
  let error

  if (nestedProperty) {
    const values = formData[nestedProperty]
    if (values) {
      values.map((v, i) => {
        error = null
        if (required && !v[propertyName]) error = getRequiredMessage(propertyName)
        else if (validator) error = validator(v[propertyName], formData, property)

        if (!error) return
        addError(formData, propertyName, error, section, nestedProperty, i)
      })
    }
  } else {
    if (validator) error = validator(value, formData, property)
    if (!value && !error && required) error = getRequiredMessage(propertyName)
  }
}

export const addError = (formData, property, error, section = null, nestedProperty = null, index = null) => {
  formData.errors.push({
    property: property,
    nestedProperty: nestedProperty,
    message: error,
    section: section,
    index: index
  })
}
