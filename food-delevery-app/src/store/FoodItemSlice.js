import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});
const FoodItemSlice = createSlice({
  name: "foodItem",

  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },

  reducers: {
    // setProducts(state, action) {
    //     state.data = action.payload;
    // },
    // setStatus(state, action){
    //     state.status = action.payload
    // }
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchFoodItems.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })

      .addCase(fetchFoodItems.fulfilled, (state, action) => {
        state.data = action.payload;

        state.status = STATUSES.IDLE;
      })

      .addCase(fetchFoodItems.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setProducts, setStatus } = FoodItemSlice.actions;

export default FoodItemSlice.reducer;

//Thunks

export const fetchFoodItems = createAsyncThunk("foodItems/fetch", async () => {
  const url = "http://localhost:5000/api/foodData";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);

  const data = await response.json();

  return data;
});
