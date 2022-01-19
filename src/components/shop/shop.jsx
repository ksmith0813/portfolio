import React, { useEffect } from 'react'
import { Spin, Tag, Avatar } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
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
            {categories.map((c, i) => (
              <Tag
                className={`${selectedCategory === c && 'selected'} clickable`}
                key={i}
                onClick={() => changeCategory(c)}
              >
                {c}
              </Tag>
            ))}
            <div className='cart-container'>
              <ShoppingCartOutlined className='cart-icon pr-025' onClick={() => setShowingCartModal(true)} />
              <Avatar className='cart-count' size='small'>
                {cartItems ? cartItems.length : 0}
              </Avatar>
            </div>
          </>
        )}
      </div>
      <div className='product-container flex justify-sb box-shadow'>
        {loadingProducts && (
          <div className='full-width flex justify-center items-center'>
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
