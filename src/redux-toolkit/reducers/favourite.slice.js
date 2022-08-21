import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    favourites: []
}

const favouritesReducer = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addFavourite(state, action){
            state.favourites = [...state.favourites, action.payload]
            localStorage.setItem('favs', JSON.stringify(state.favourites))
        },
        removeFavourite(state,action){
            state.favourites = state.favourites.filter(crypto => crypto.coin !== action.payload.coin || crypto.chain !== action.payload.chain )
            localStorage.setItem('favs', JSON.stringify(state.favourites))
        },
        updateFavourite(state,action){
            let favUpdated = state.favourites.find(crypto => crypto.coin === action.payload.coin && crypto.chain === action.payload.chain )
            console.log(favUpdated.coin)
            favUpdated.lastUpdate = new Date().getTime()
            favUpdated.lastRefresh = new Date().getTime()
            favUpdated.prices = action.payload.prices
            favUpdated.ammount = favUpdated.ammount + action.payload.ammount
            localStorage.setItem('favs', JSON.stringify(state.favourites))  
        },
        refreshFavourite(state, action){
            let favRefreshed = state.favourites.find(crypto => crypto.coin === action.payload.coin && crypto.chain === action.payload.chain )
            favRefreshed = {
                ...favRefreshed,
                lastRefresh: new Date().getTime(),
                prices: action.payload.prices
            }
            localStorage.setItem('favs', JSON.stringify(state.favourites))
        },
        setFavourites(state,action){
            state.favourites = action.payload
        }
    }
})

export const {
    addFavourite,
    removeFavourite,
    updateFavourite,
    setFavourites
} = favouritesReducer.actions

export default favouritesReducer.reducer