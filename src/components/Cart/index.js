import {Component} from 'react'

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import Header from '../Header'
import CartListView from '../CartListView'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import './index.css'

class Cart extends Component {
  state = {cod: true, confirmOrder: false}

  onCOD = () => this.setState({cod: false})

  onConfirmOrder = () => this.setState({confirmOrder: true})

  render() {
    const {cod, confirmOrder} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value
          const showEmptyView = cartList.length === 0

          // TODO: Update the functionality to remove all the items in the cart

          const onRemoveAllItems = () => removeAllCartItems()

          const totalBill = () => {
            let totalBillAmount = 0
            cartList.map(each => {
              totalBillAmount += each.quantity * each.price
              return null // just for error
            })
            // const {quantity, price} = cartList[0]

            return (
              <div className="check-out-container">
                <div>
                  <h1 className="total-price-heading">
                    Order Total:{' '}
                    <span className="total-price">Rs {totalBillAmount}/-</span>
                  </h1>
                  <p className="total-items">{cartList.length} Items in cart</p>

                  <Popup
                    modal
                    trigger={
                      <button type="button" className="check-out">
                        Checkout
                      </button>
                    }
                    position="right center"
                  >
                    <>
                      {!confirmOrder ? (
                        <div className="payment-container">
                          <h1 className="payment-heading">Payment Details</h1>
                          <p className="order-details-heading">
                            Payment Method
                          </p>
                          <div className="payment-method-container">
                            <div className="payment-method-sub-container">
                              <input
                                type="radio"
                                id="card"
                                name="paymentMethod"
                                disabled
                              />
                              <label htmlFor="card" className="payment-method">
                                Card
                              </label>
                            </div>
                            <div className="payment-method-sub-container">
                              <input
                                type="radio"
                                id="netBanking"
                                name="paymentMethod"
                                disabled
                              />
                              <label
                                htmlFor="netBanking"
                                className="payment-method"
                              >
                                Net Banking
                              </label>
                            </div>
                            <div className="payment-method-sub-container">
                              <input
                                type="radio"
                                id="upi"
                                name="paymentMethod"
                                disabled
                              />
                              <label htmlFor="upi" className="payment-method">
                                UPI
                              </label>
                            </div>
                            <div className="payment-method-sub-container">
                              <input
                                type="radio"
                                id="wallet"
                                name="paymentMethod"
                                disabled
                              />
                              <label
                                htmlFor="wallet"
                                className="payment-method"
                              >
                                Wallet
                              </label>
                            </div>
                            <div className="payment-method-sub-container">
                              <input
                                type="radio"
                                id="cod"
                                name="paymentMethod"
                                onClick={this.onCOD}
                                checked={!cod}
                              />
                              <label htmlFor="cod" className="payment-method">
                                Cash on Delivery
                              </label>
                            </div>
                          </div>
                          <p className="order-details-heading">
                            Order Details:
                          </p>
                          <p className="details-text">
                            <span className="span-bold">Quantity: </span>
                            {cartList.length}
                          </p>
                          <p className="details-text">
                            <span className="span-bold">Total Price: </span>Rs{' '}
                            {totalBillAmount}/-
                          </p>
                          <div className="confirm-btn-container">
                            {cod ? (
                              <button
                                type="button"
                                className="confirm-btn disabled-btn"
                                disabled={cod}
                                onClick={this.onConfirmOrder}
                              >
                                Confirm Order
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="confirm-btn"
                                disabled={cod}
                                onClick={this.onConfirmOrder}
                              >
                                Confirm Order
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="payment-container">
                          <p className="success-order">
                            Your order has been placed successfully
                          </p>
                        </div>
                      )}
                    </>
                  </Popup>
                </div>
              </div>
            )
          }

          return (
            <>
              <Header />
              <div className="cart-container">
                {showEmptyView ? (
                  <EmptyCartView />
                ) : (
                  <div className="cart-content-container">
                    <h1 className="cart-heading">My Cart</h1>
                    <button
                      type="button"
                      className="hide-btn"
                      onClick={onRemoveAllItems}
                    >
                      Remove All
                    </button>
                    <CartListView />
                    {totalBill()}
                  </div>
                )}
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default Cart
