import React, { useState, useEffect, useContext, createContext } from 'react'
import api from 'utils/api'
import _ from 'lodash'

const ShopContext = createContext(null)

export const ShopContextProvider = ({ children }) => {
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [showingCartModal, setShowingCartModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    api.getProductCategories().then(({ data }) => {
      setCategories(['ALL'].concat(data))
    })
  }, [])
  useEffect(() => {
    setLoadingProducts(true)

    if (selectedCategory === 'ALL') {
      api.getAllProducts().then(({ data }) => {
        setProducts(data?.sort((a, b) => (a.title > b.title ? 1 : -1)))
        setLoadingProducts(false)
      })
    } else {
      api.getProductsByCategory(selectedCategory).then(({ data }) => {
        setProducts(data?.sort((a, b) => (a.title > b.title ? 1 : -1)))
        setLoadingProducts(false)
      })
    }
  }, [selectedCategory])

  const getCartItems = () => {
    const items = []
    const groups = _.groupBy(cartItems, 'title')

    Object.keys(groups).map((g) => {
      const group = groups[g]
      const total = group.reduce((a, n) => a + parseFloat(n.price), 0)
      return items.push({ id: group[0].id, title: g, quantity: group.length, total: total })
    })

    return items
  }

  const changeCategory = (value) => setSelectedCategory(value)

  const updateCart = (product, quantity) => {
    const copy = [...cartItems]
    for (let i = 0; i < quantity; i++) copy.push(product)
    setCartItems(copy)
  }

  const removeProduct = (item) => {
    let copy = [...cartItems]
    copy = copy.filter((c) => c.id !== item.id)
    setCartItems(copy)
  }

  return (
    <ShopContext.Provider
      value={{
        // state
        loadingProducts,
        cartItems,
        showingCartModal,
        setShowingCartModal,
        products,
        categories,
        selectedCategory,

        // functions
        getCartItems,
        changeCategory,
        updateCart,
        removeProduct,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

export const useShopContext = () => {
  const context = useContext(ShopContext)
  if (!context) throw new Error('Context must used within a provider')
  return context
}
