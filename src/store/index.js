import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./slice/slice"










const store = configureStore({
     reducer:{
        items:itemSlice
     }
})

export default store