import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    info: {}
}

const cryptoInfoReducer = createSlice({
    name: 'cryptoInfo',
    initialState,
    reducers: {
        addInfo(state, action){
            state.info = action.payload
        },
        clearInfo(state,action){
            state.info = {}
        }
    }
})

export const {
    addInfo,
    clearInfo
} = cryptoInfoReducer.actions

export default cryptoInfoReducer.reducer