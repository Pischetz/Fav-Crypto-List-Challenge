import axios from "axios";
import { addCryptos } from "redux-toolkit/reducers/cryptoList.slice";

export const getCryptos = () => async (dispatch) => {
    try{
        const {data} = await axios.get('https://api.cryptapi.io/info/')

        const {erc20, bep20, trc20} = data
        const cryptos = []
        const erc20Array = []
        const bep20Array = []
        const trc20Array = []

        for(const key in data) {
            if (!Array.isArray(data[key]) && key !== erc20 && key !== bep20 && key !==trc20) {
                cryptos.push(data[key])
            }
        }

        for(const key in erc20) {
            erc20Array.push(erc20[key])
        }
        for(const key in bep20) {
            bep20Array.push(bep20[key])
        }
        for(const key in trc20) {
            trc20Array.push(trc20[key])
        }
        
        dispatch(addCryptos({cryptos, erc20:erc20Array, bep20:bep20Array, trc20:trc20Array}))
    }catch(err){
        console.log(err)
    }
}