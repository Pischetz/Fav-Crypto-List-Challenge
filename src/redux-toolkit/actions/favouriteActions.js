import axios from "axios";
import { refreshFavourite } from "redux-toolkit/reducers/favourite.slice";

export const executeRefresh = (name, chain) => async(dispatch) => {
    try{
        let sendChain = '' 
        chain? sendChain = `/${chain}`: null
        const {data} = await axios.get(`https://api.cryptapi.io${sendChain}/${name}/info/`)
        dispatch(refreshFavourite({coin: data.coin, chain, prices: data.prices}))
    }catch(err){

    }
}