import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";









export const getSlice = createAsyncThunk("item/getSlice",
    async () =>{
        return (await axios.get("https://jsonplaceholder.typicode.com/todos")).data
    }
)




const itemSlice= createSlice({
    name:"item",
    initialState:{
        item:null
    },
    extraReducers:(builder) =>{
        builder.addCase(getSlice.fulfilled, (state, {payload})=>{
              state.item=payload
        })

    }
})


export default itemSlice.reducer