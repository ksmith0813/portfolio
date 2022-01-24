export const validateEmail = (value) => {
    if (!value) return
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    return !isValid && 'name@gmail.com'
}