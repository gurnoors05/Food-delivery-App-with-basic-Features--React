import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state) => {
      state.items.pop();
    },
    clearCart: (state) => {
      state.items.length = 0;
    },
    // NEW ACTION: Syncs Redux with the Database array
    updateItemsFromDB: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addItem, removeItem, clearCart, updateItemsFromDB } = cartSlice.actions;

export default cartSlice.reducer;