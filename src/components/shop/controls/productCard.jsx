import React, { useState } from 'react'
import { Button } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { useShopContext } from '../context/shopContext'

export const ProductCard = ({ product }) => {
  const { updateCart } = useShopContext()
  const [quantity, setQuantity] = useState(1)
  const [showingAdd, setShowingAdd] = useState(false)
  const image = product.image
  const title = product.title
  const price = parseFloat(product.price).toFixed(2)
  const quantityDisplay = `${quantity} item${quantity > 1 ? 's' : ''} ${
    quantity > 1 ? 'have' : 'has'
  } been added to your cart`

  const subtractQty = () => quantity > 1 && setQuantity(quantity - 1)

  const addQty = () => setQuantity(quantity + 1)

  return (
    <div className='product-card'>
      <div className='text'>
        <b>{title}</b>
      </div>
      <div className='pt-025'>
        <b className='fs-150'>${price}</b>
      </div>
      <img src={image} alt='' />
      <div className='add-to-cart'>
        <div>
          <MinusOutlined className='mr-100' onClick={subtractQty} />
          <span className='item-count'>{quantity}</span>
          <PlusOutlined className='ml-100' onClick={addQty} />
        </div>
        <Button
          className='dark ml-300'
          onClick={() => {
            setShowingAdd(true)
            window.setTimeout(() => setShowingAdd(false), 3000)
            updateCart(product, quantity)
          }}
        >
          Add To Cart
        </Button>
      </div>
      {showingAdd && <div className='items-added'>{quantityDisplay}</div>}
    </div>
  )
}
