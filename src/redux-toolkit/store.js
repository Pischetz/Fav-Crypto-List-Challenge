import { configureStore } from "@reduxjs/toolkit";
import cryptoListSlice from "./reducers/cryptoList.slice";

export const store = configureStore({
    reducer:{
        cryptoLists: cryptoListSlice
    }
})