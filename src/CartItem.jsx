// src/CartItem.jsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeItem } from './CartSlice.jsx'; // Consolidated import for actions
import './CartItem.css'; // Assuming you want to use the CSS file mentioned in snippet 2

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  // Retrieve the items array from the Redux store
  const cartItems = useSelector(state => state.cart.items);

  // --- Utility Functions ---

  /**
   * Calculates the total cost for a single item (Unit Price * Quantity).
   * @param {Object} item - The cart item object.
   * @returns {string} The total cost, formatted to two decimal places.
   */
  const calculateTotalCost = (item) => {
    // Extract numeric value from cost string (e.g., "$12" -> 12)
    const unitPrice = parseFloat(item.cost.substring(1));
    return (unitPrice * item.quantity).toFixed(2);
  };

  /**
   * Calculates the total cost of all items in the cart.
   * @returns {string} The overall cart total, formatted to two decimal places.
   */
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const unitPrice = parseFloat(item.cost.substring(1));
      return total + (unitPrice * item.quantity);
    }, 0).toFixed(2);
  };

  // --- Handler Functions for Redux Dispatch ---

  const handleIncrement = (item) => {
    // Dispatch updateQuantity to increase amount by 1
    dispatch(updateQuantity({
      name: item.name,
      amount: item.quantity + 1,
    }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) { // Only decrement if quantity is greater than 1
      dispatch(updateQuantity({
        name: item.name,
        amount: item.quantity - 1,
      }));
    } else {
      // If quantity is 1 and we decrement, remove the item completely
      handleRemove(item);
    }
  };

  const handleRemove = (item) => {
    // Dispatch removeItem action with the item's name
    dispatch(removeItem(item.name));
  };

  // --- UI Action Handlers ---

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(); // Call the function passed from parent
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
    // You might add actual checkout logic or dispatch clearCart here later
  };

  // --- Component Render ---
  return (
    <div className="cart-container">
      {/* Total Cart Amount Display */}
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>

      {/* Cart Actions: Continue Shopping and Checkout */}
      <div className="cart-actions">
        <button onClick={handleContinueShopping} className="continue-shopping">
          Continue Shopping
        </button>
        <button onClick={handleCheckoutShopping} className="checkout">
          Checkout
        </button>
      </div>

      {/* Cart Items List */}
      <div className="cart-items-list">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.name} className="cart-item-card">
              {/* Thumbnail and Name */}
              <img src={item.image} alt={item.name} className="cart-thumbnail" />
              <h3>{item.name}</h3>

              <div className="item-details">
                {/* Unit Cost */}
                <p>Unit Cost: {item.cost}</p>

                {/* Quantity Controls */}
                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span> {/* Display individual plant quantity */}
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>

                {/* Subtotal */}
                <p>Total: ${calculateTotalCost(item)}</p>

                {/* Delete Button */}
                <button onClick={() => handleRemove(item)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartItem;