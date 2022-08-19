import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cryptocurrenciesList:[],
    TRC20List: [],
    BEP20List: [],
    ERC20List: []
}

const cryptoListReducer = createSlice({
    name: 'cryptoLists',
    initialState,
    reducers: {
        addCryptos(state, action){
            state.cryptocurrenciesList = action.payload.cryptos
            state.TRC20List = action.payload.trc20
            state.BEP20List = action.payload.bep20
            state.ERC20List = action.payload.erc20
        }
    }
})

export const {
    addCryptos
} = cryptoListReducer.actions

export default cryptoListReducer.reducer