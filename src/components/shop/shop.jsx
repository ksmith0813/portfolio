import React from 'react'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Categories } from 'components/_siteWide/layout/categories'
import { ShopContextProvider, useShopContext } from './context/shopContext'
import { ProductCard } from './controls/productCard'
import { CartModal } from './controls/cartModal'
import { Loader } from 'components/_siteWide/layout/loader'
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
    loadingProducts,
    selectedCategory,
    products,
    categories,
    changeCategory,
    cartItems,
    updateCart,
    setShowingCartModal,
  } = useShopContext()

  return (
    <>
      <CartModal />
      <div className='category-container'>
        <Categories items={categories} selected={selectedCategory} onClick={changeCategory} />
        <div className='cart-container'>
          <ShoppingCartOutlined className='cart-icon' onClick={() => setShowingCartModal(true)} />
          <span className='cart-count'>{cartItems ? cartItems.length : 0}</span>
        </div>
      </div>
      <div className='product-container'>
        {loadingProducts && <Loader />}
        {!loadingProducts && products.map((p, i) => <ProductCard key={i} product={p} updateCart={updateCart} />)}
      </div>
    </>
  )
}
