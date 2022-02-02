import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { updateCart } from 'store/slices/shopSlice'

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const image = product.image
  const title = product.title
  const price = parseFloat(product.price).toFixed(2)

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
            setQuantity(1)
            dispatch(updateCart({ ...product, qty: quantity }))
          }}
        >
          Add To Cart
        </Button>
      </div>
    </div>
  )
}
