// sliceDelete.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (id, thunkAPI) => {
    try {
      (await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)).data;
      return id; // Return the deleted item ID upon success
    } catch (error) {
      // Handle error cases
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const sliceDelete = createSlice({
  name: "items",
  initialState: {
    status: "idle", // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItem.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default sliceDelete.reducer;
