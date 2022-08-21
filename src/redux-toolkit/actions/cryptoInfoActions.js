import axios from "axios";
import { addInfo } from "redux-toolkit/reducers/cryptoInfo.slice";

export const getInfo = (coin, chain) => async(dispatch) => {
    try{
        !chain? chain = '' :null

        const {data} = await axios.get(`https://api.cryptapi.io${chain}/${coin}/info/`)

        dispatch(addInfo(data))
    }catch(err){
        console.log(err)
    }
}