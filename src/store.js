// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice.jsx'; // Assuming the slice file is named CartSlice.js or CartSlice.jsx

/**
 * Creates and configures the Redux store.
 * The store holds the complete state tree of your application.
 */
const store = configureStore({
  /**
   * The root reducer object defines the shape of the state.
   * 'cart' is the state slice name, and cartReducer is the logic
   * that manages the state for that slice.
   */
  reducer: {
    cart: cartReducer,
  },
});

export default store;