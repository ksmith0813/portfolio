import React from 'react'
import { Row, Col, Button, Modal } from 'antd'
import { getAbbreviation } from 'utils/general'
import { useShopContext } from '../context/shopContext'

export const CartModal = () => {
  const { getCartItems, removeProduct, showingCartModal, setShowingCartModal } = useShopContext()
  const items = getCartItems()
  const hasItems = items.length > 0
  const totalAmount = hasItems && items.reduce((a, n) => a + parseFloat(n.total), 0)

  return (
    <Modal
      title={<span className='fs-125'>Cart Items</span>}
      visible={showingCartModal}
      onOk={() => setShowingCartModal(false)}
      onCancel={() => setShowingCartModal(false)}
      width={900}
    >
      {hasItems && (
        <>
          <Row className='p-100 pr-000 items-center border-bottom-light'>
            <Col span={15}>
              <b>Title</b>
            </Col>
            <Col span={3} align='center'>
              <b>Qty</b>
            </Col>
            <Col span={3} align='center'>
              <b>Action</b>
            </Col>
            <Col span={3} align='right'>
              <b>Cost</b>
            </Col>
          </Row>
          {items.map((c, i) => (
            <div key={i}>
              <Row className='border-bottom-light p-100 pr-000'>
                <Col span={15}>
                  <b>{getAbbreviation(c.title, 100)}</b>
                </Col>
                <Col span={3} align='center'>
                  <b>{c.quantity}</b>
                </Col>
                <Col span={3} align='center'>
                  <Button className='anchor-button' onClick={() => removeProduct(c)}>
                    Remove
                  </Button>
                </Col>
                <Col span={3} align='right'>
                  ${c.total.toLocaleString()}
                </Col>
              </Row>
              {i + 1 === items.length && (
                <Row className='pt-100 fs-125'>
                  <Col flex={1} align='right'>
                    Subtotal: <b>${totalAmount.toLocaleString()}</b>
                  </Col>
                </Row>
              )}
            </div>
          ))}
        </>
      )}
      {!hasItems && <b className='fs-150'>Cart is empty</b>}
    </Modal>
  )
}
