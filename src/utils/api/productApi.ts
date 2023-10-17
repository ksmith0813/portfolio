import { get } from 'utils/api/api'

const url = 'https://fakestoreapi.com/'

export const getProductCategories = () => get(url, 'products/categories', 'product')

export const getAllProducts = () => get(url, `products`, 'product')

export const getProductsByCategory = (category: string) => get(url, `products/category/${category}`, 'product')
