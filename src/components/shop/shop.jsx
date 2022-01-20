import React, { useEffect } from 'react'
import { Spin } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Categories } from 'components/_siteWide/layout/categories'
import { ShopContextProvider, useShopContext } from './context/shopContext'
import { ProductCard } from './controls/productCard'
import { CartModal } from './controls/cartModal'
import './shop.scss'

export const Shop = () => {
  return (
    <ShopContextProvider>
      <ShopContents />
    </ShopContextProvider>
  )
}

const ShopContents = () => {
  const {
    loadingCategories,
    loadingProducts,
    selectedCategory,
    products,
    categories,
    getCategories,
    getProducts,
    changeCategory,
    cartItems,
    updateCart,
    setShowingCartModal,
  } = useShopContext()

  useEffect(() => {
    getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    getProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory])

  return (
    <>
      <CartModal />
      <div className='category-container'>
        {!loadingCategories && (
          <>
            <Categories items={categories} selected={selectedCategory} onClick={changeCategory} />
            <div className='cart-container'>
              <ShoppingCartOutlined className='cart-icon' onClick={() => setShowingCartModal(true)} />
              <span className='cart-count'>{cartItems ? cartItems.length : 0}</span>
            </div>
          </>
        )}
      </div>
      <div className='product-container'>
        {loadingProducts && (
          <div className='page-center'>
            <Spin size='large' />
          </div>
        )}
        {!loadingProducts && (
          <>
            {products.map((p, i) => (
              <ProductCard key={i} product={p} updateCart={updateCart} />
            ))}
          </>
        )}
      </div>
    </>
  )
}
