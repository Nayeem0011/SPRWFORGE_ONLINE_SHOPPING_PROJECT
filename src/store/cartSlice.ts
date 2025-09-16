import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product, CartItem } from "../types";

interface CartState {
  cart: CartItem[];
}

// Load initial state from localStorage (if exists)
const loadCartFromStorage = (): CartItem[] => {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState: CartState = {
  cart: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = state.cart.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const item = state.cart.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cart = state.cart.filter((i) => i.id !== action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    deleteFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((i) => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, deleteFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
