import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Button, Modal } from 'antd'
import { addCommasToNumber, getAbbreviation } from 'utils/general'
import { getState, removeProduct, closeModal } from 'store/slices/shopSlice'

export const CartModal = () => {
  const state = useSelector(getState)
  const dispatch = useDispatch()
  const items = state.cartItems
  const hasItems = items.length > 0
  const totalAmount = hasItems && items.reduce((a, n) => a + n.price * n.qty, 0)

  return (
    <Modal
      title={<span className='fs-125'>Cart Items</span>}
      visible={state.showingCartModal}
      onOk={() => dispatch(closeModal())}
      onCancel={() => dispatch(closeModal())}
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
                  <b>{c.qty}</b>
                </Col>
                <Col span={3} align='center'>
                  <Button className='anchor-button' onClick={() => dispatch(removeProduct(c))}>
                    Remove
                  </Button>
                </Col>
                <Col span={3} align='right'>
                  ${addCommasToNumber((c.price * c.qty).toFixed(2))}
                </Col>
              </Row>
              {i + 1 === items.length && (
                <Row className='pt-100 fs-125'>
                  <Col flex={1} align='right'>
                    Subtotal: <b>${addCommasToNumber(totalAmount?.toFixed(2))}</b>
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
