import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteitemfromCart,
  fetchItemsByUserId,
  resetCart,
  UpdateCart,
} from "./cartAPI";

const initialState = {
  status: "idle",
  items: [],
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const UpdateCartAsync = createAsyncThunk(
  "cart/UpdateCart",
  async (update) => {
    const response = await UpdateCart(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteitemfromCartAsync = createAsyncThunk(
  "cart/DeleteCart",
  async (ItemId) => {
    const response = await deleteitemfromCart(ItemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async () => {
    const response = await resetCart();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async () => {
    const response = await fetchItemsByUserId();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(UpdateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("Update cart item", action.payload);
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        console.log("Update cart item index", index);
        state.items[index] = action.payload;
      })
      .addCase(deleteitemfromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      // .addCase(deleteitemfromCartAsync.fulfilled, (state, action) => {
      //   state.status = "idle";
      //   const index = state.items.findIndex(
      //     (item) => item.id === action.payload.id
      //   );

      //   state.items.splice(index, 1); // ✅ remove just one item
      // });
      .addCase(deleteitemfromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items.splice(index, 1); // ✅ remove the correct item
        }
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = []; // ✅ reset the cart to an empty array
      })
      
  },
});

export const selectItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
//
export default cartSlice.reducer;
