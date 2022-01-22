import moment from 'moment'
import { message } from 'antd'

export const arrayRemove = (arr, value) => {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      arr.splice(i, 1)
      return
    }
  }
}

export const arrayMove = (array, from, to) => {
  array = [...array]
  const start = from < 0 ? array.length + from : from

  if (start >= 0 && start < array.length) {
    const end = to < 0 ? array.length + to : to
    const item = array.splice(from, 1)[0]
    array.splice(end, 0, item)
  }

  return array
}

export const getAbbreviation = (value, length = 20) => {
  return `${value.substring(0, length)}${value.length > length ? "..." : ""}`
}

export const hasProperties = (obj) => {
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return true
    }
  }
  return false
}

export const sortAlphebetically = (a, b, property) => {
  if (a[property] < b[property]) {
    return -1
  }
  if (a[property] > b[property]) {
    return 1
  }
  return 0
}

export const addCommasToNumber = (value) => {
  return value && value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const spacesToProperty = (property) => {
  let propertyName = property
  if (Array.isArray(property)) propertyName = property[1]
  if (property.includes("_")) propertyName = propertyName.replace("_", " ")
  return propertyName.replace(/([a-z])([A-Z])/g, "$1 $2")
}

export const getDateRanges = () => {
  return {
    Today: [moment(), moment()],
    "7 Days": [moment().subtract(7, "d"), moment()],
    "15 Days": [moment().subtract(15, "d"), moment()],
    "30 Days": [moment().subtract(30, "d"), moment()],
    "60 Days": [moment().subtract(60, "d"), moment()],
    "90 Days": [moment().subtract(90, "d"), moment()],
  }
}

export const showMessage = (description, type = "error") => {
  message.destroy()
  switch (type) {
    case "success":
      message.success(description)
      break
    case "info":
      message.info(description)
      break
    case "warning":
      message.warning(description)
      break
    default:
      message.error(description)
      break
  }
}
