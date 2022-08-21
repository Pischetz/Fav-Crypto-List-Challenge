import { configureStore } from "@reduxjs/toolkit";
import cryptoInfoSlice from "./reducers/cryptoInfo.slice";
import cryptoListSlice from "./reducers/cryptoList.slice";
import favouriteSlice from "./reducers/favourite.slice";

export const store = configureStore({
    reducer:{
        cryptoLists: cryptoListSlice,
        cryptoInfo: cryptoInfoSlice,
        favourites: favouriteSlice
    }
})