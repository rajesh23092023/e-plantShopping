// src/CartSlice.jsx

import { createSlice } from '@reduxjs/toolkit';

// Initial state for the cart
const initialState = {
  items: [], // Array of plant objects in the cart, each having { ..., quantity: N }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Adds a new item or increments the quantity of an existing item
    addItem: (state, action) => {
      // action.payload is the plant object (name, cost, image, etc.)
      const newPlant = action.payload;
      const existingItem = state.items.find(item => item.name === newPlant.name);

      if (existingItem) {
        // If the item already exists, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If it's a new item, add it with an initial quantity of 1
        state.items.push({ ...newPlant, quantity: 1 });
      }
    },

    // Removes an item entirely from the cart
    removeItem: (state, action) => {
      // action.payload is the name of the plant to remove (string)
      const nameToRemove = action.payload;
      state.items = state.items.filter(item => item.name !== nameToRemove);
    },

    // Updates the quantity of a specific item to a new amount
    updateQuantity: (state, action) => {
      // action.payload: { name: 'Plant Name', amount: 3 }
      const { name, amount } = action.payload;

      const itemToUpdate = state.items.find(item => item.name === name);

      if (itemToUpdate) {
        // Update the item's quantity to the specified amount
        itemToUpdate.quantity = amount;
      }
    },

    // Clears all items from the cart
    clearCart: (state) => {
      state.items = [];
    }
  },
});

// Export action creators
export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

// Export the reducer function
export default cartSlice.reducer;