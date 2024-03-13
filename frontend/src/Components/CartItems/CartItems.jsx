import React, { useContext } from 'react';
import remove_icon  from '../Assets/cart_cross_icon.png'; 
import '../CartItems/CartItems.css';
import { ShopContext } from '../../Context/ShopContext';

export const CartItems = () => {
    const { getTotalCartAmount,allProduct, cartItems, removeFromCart } = useContext(ShopContext);

    return (
        <div className='cartitems'>
            <div className="cartitem-format-main"> 
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {allProduct.map((e) => {
                if (cartItems[e.id] > 0) {
                  console.log("The cart id inside condition is : ",e.id);
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitem-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon' /> {/* Fixed typo in image property */}
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img className='cartitems-remove-icons' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null; // added a return null for the case where cartItems[e.id] <= 0
            })}
            <div className='cartitems-down'>
              <div className="cartiems-total">
                <h1>Cart Total</h1>
                <div>
                  <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                  </div>
                  <hr />
                  <div className='cartitems-total-item'>
                    <p>Shipping Fee</p>
                    <p>Free</p>
                  </div>
                  <hr />
                  <div className='cartitems-total-item'>
                    <h3>Total</h3>
                    <h3>${getTotalCartAmount()}</h3>
                  </div>
                </div>
                <button>PROCEED TO CHECKOUT</button>
              </div>
              <div className="cartitems-promocode">
                <p>If you have a promo code enter it here</p>
                <div className="cartitem-promobox">
                  <input type="text" placeholder='Promo code'/>
                  <button>Submit</button>
                </div>
              </div>
            </div>
        </div>
    );
};
