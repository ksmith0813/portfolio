import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Categories } from 'components/_siteWide/layout/categories'
import { CartModal } from './controls/cartModal'
import { Loader } from 'components/_siteWide/layout/loader'
import { loading, getState, setCategories, setProducts, changeCategory, openModal } from 'store/slices/shopSlice'
import api from 'utils/api'
import { ProductCard } from './controls/productCard'
import './shop.scss'

export const Shop = () => {
  const state = useSelector(getState)
  const dispatch = useDispatch()

  useEffect(() => {
    api.getProductCategories().then(({ data }) => {
      dispatch(setCategories(data))
    })
  }, [dispatch])

  useEffect(() => {
    const category = state.selectedCategory
    dispatch(loading())
    if (category === 'ALL') {
      api.getAllProducts().then(({ data }) => {
        dispatch(setProducts(data))
      })
    } else {
      api.getProductsByCategory(category).then(({ data }) => {
        dispatch(setProducts(data))
      })
    }
  }, [state.selectedCategory, dispatch])

  const onCategoryChange = (category) => dispatch(changeCategory(category))

  const totalItems = state.cartItems.reduce((a, n) => a + n.qty, 0)

  return (
    <>
      {!state.loadingProducts && <CartModal />}
      <div className='category-container'>
        <Categories items={state.categories} selected={state.selectedCategory} onClick={onCategoryChange} />
        <div className='cart-container'>
          <ShoppingCartOutlined className='cart-icon' onClick={() => dispatch(openModal())} />
          <span className='cart-count'>{totalItems}</span>
        </div>
      </div>
      <div className='product-container'>
        {state.loadingProducts && <Loader />}
        {!state.loadingProducts && state.products.map((p, i) => <ProductCard key={i} product={p} />)}
      </div>
    </>
  )
}
