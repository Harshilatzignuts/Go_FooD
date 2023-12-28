import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: [],

  reducers: {
    add(state, action) {
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...state, action.payload])
      );
      return [...state, action.payload];
    },

    remove(state, action) {
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.filter((item) => item.id !== action.payload.id))
      );

      return state.filter((item) => item.id !== action.payload.id);
    },

    update(state, action) {
      const updatedState = state.map((food) => {
        if (food.id === action.payload.id) {
          return {
            ...food,
            qty: action.payload.qty, // Use the updated quantity directly
            price: action.payload.price + food.price,
          };
        }
        return food;
      });

      return updatedState;
    },

    drop(state, action) {
      // Clear cartItems in localStorage
      localStorage.setItem("cartItems", []);

      // Return an empty array as the new state
      return [];
    },
  },
});

export const { add, remove, update, drop } = cartSlice.actions;

export default cartSlice.reducer;
