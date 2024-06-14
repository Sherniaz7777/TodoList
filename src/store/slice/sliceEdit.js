// slice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for editing an item
export const editItem = createAsyncThunk(
  "items/editItem",
  async ({ id, title }, thunkAPI) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, { title });
      return response.data; // Return the updated item upon success
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const itemSlice = createSlice({
  name: "item",
  initialState: {
    items: [],
    status: "idle", // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {
    // You can add other reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(editItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the item in the state with the updated data
        const updatedItem = action.payload;
        state.items = state.items.map(item =>
          item.id === updatedItem.id ? updatedItem : item
        );
      })
      .addCase(editItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { actions, reducer } = itemSlice;
export default reducer;
const handleEdit = (id, title) => {
    setEditId(id); // Set edit mode for this item
    setNewTask(title); // Populate input field with current title
  };

  const handleSaveEdit = () => {
    dispatch(editItem({ id: editId, title: newTask })); // Dispatch editItem thunk
    setEditId(null); // Exit edit mode
    setNewTask(""); // Clear input field
  };