import React, { useState } from 'react'
import { Row, Input, Button } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { getAbbreviation } from 'utils/general'
import { useShopContext } from '../context/shopContext'

export const ProductCard = ({ product }) => {
  const { updateCart } = useShopContext()
  const [quantity, setQuantity] = useState(1)
  const [showingAdd, setShowingAdd] = useState(false)
  const image = product.image
  const title = product.title
  const price = parseFloat(product.price).toFixed(2)

  const subtractQty = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const addQty = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className='product-card pt-050 p-250 m-300'>
      <div className='flex justify-sb items-center pt-150'>
        <b className='fs-125'>{getAbbreviation(title)}</b>
        <b className='fs-125'>${price}</b>
      </div>
      <img src={image} className='pb-250 pt-300' alt='' />
      <div className='pt-100 pb-150 flex justify-sb items-end'>
        <div>
          <MinusOutlined className='mr-100 change-cart-count' onClick={subtractQty} />
          <Input style={{ width: 50, textAlign: 'center', disabled: 'disabled' }} value={quantity} />
          <PlusOutlined className='ml-100 change-cart-count' onClick={addQty} />
        </div>
        <Button
          className='dark'
          onClick={() => {
            setShowingAdd(true)
            window.setTimeout(() => setShowingAdd(false), 2000)
            updateCart(product, quantity)
          }}
        >
          Add To Cart
        </Button>
      </div>
      {showingAdd && (
        <Row justify='center'>
          <b>
            {`${quantity} item${quantity > 1 ? 's' : ''} ${quantity > 1 ? 'have' : 'has'} been added to your cart!`}
          </b>
        </Row>
      )}
    </div>
  )
}
