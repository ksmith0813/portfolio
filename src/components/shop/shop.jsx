import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Loader, Categories } from 'components/_siteWide/layout/layout'
import { CartModal } from './controls/cartModal'
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
    dispatch(loading())
    if (state.selectedCategory === 'ALL') {
      api.getAllProducts().then(({ data }) => {
        dispatch(setProducts(data))
      })
    } else {
      api.getProductsByCategory(state.selectedCategory).then(({ data }) => {
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
        <div className='cart-container flex items-center'>
          <span className='fs-125 pr-025'>{totalItems}</span>
          <ShoppingCartOutlined className='cart-icon' onClick={() => dispatch(openModal())} />
        </div>
      </div>
      <div className='product-container'>
        {state.loadingProducts && <Loader />}
        {!state.loadingProducts && state.products.map((p, i) => <ProductCard key={i} product={p} />)}
      </div>
    </>
  )
}
