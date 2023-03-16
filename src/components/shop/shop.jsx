import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Loader, Categories } from 'components/_siteWide/layout/layout'
import { CartModal } from './controls/cartModal'
import { loading, setCategories, setProducts, changeCategory, openModal } from 'store/slices/shopSlice'
import { getAllProducts, getProductCategories, getProductsByCategory } from 'utils/api/productApi'
import { ProductCard } from './controls/productCard'
import './shop.scss'

export const Shop = () => {
  const selectedTheme = useSelector((state) => state.theme.selectedTheme)
  const loadingProducts = useSelector((state) => state.shop.loadingProducts)
  const products = useSelector((state) => state.shop.products)
  const categories = useSelector((state) => state.shop.categories)
  const selectedCategory = useSelector((state) => state.shop.selectedCategory)
  const cartItems = useSelector((state) => state.shop.cartItems)

  const dispatch = useDispatch()

  useEffect(() => {
    getProductCategories().then(({ data }) => {
      dispatch(setCategories(data))
    })
  }, [dispatch])

  useEffect(() => {
    dispatch(loading())
    if (selectedCategory === 'ALL') {
      getAllProducts().then(({ data }) => {
        dispatch(setProducts(data))
      })
    } else {
      getProductsByCategory(selectedCategory).then(({ data }) => {
        dispatch(setProducts(data))
      })
    }
  }, [selectedCategory, dispatch])

  const onCategoryChange = (category) => dispatch(changeCategory(category))

  const totalItems = cartItems.reduce((a, n) => a + n.qty, 0)

  return (
    <>
      {!loadingProducts && <CartModal />}
      <div className={`category-container ${selectedTheme}`}>
        <Categories items={categories} selected={selectedCategory} onClick={onCategoryChange} />
        <div className='cart-container flex items-center'>
          <div className='cart-icon-container'>
            <span className='cart-total-count fs-125 pr-025'>{totalItems}</span>
            <ShoppingCartOutlined className='cart-icon' onClick={() => dispatch(openModal())} />
          </div>
        </div>
      </div>
      <div className='product-container'>
        {loadingProducts && <Loader />}
        {!loadingProducts && products.map((p, i) => <ProductCard key={i} product={p} />)}
      </div>
    </>
  )
}
