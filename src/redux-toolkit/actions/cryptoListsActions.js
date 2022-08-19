import axios from "axios";
import { addCryptos } from "redux-toolkit/reducers/cryptoList.slice";

export const getCryptos = () => async (dispatch) => {
    try{
        const {data} = await axios.get('https://api.cryptapi.io/info/')

        const {erc20, bep20, trc20} = data
        const cryptos = []

        for(const key in data) {
            if (!Array.isArray(data[key])) {
                cryptos.push(data[key])
            }
        }
        
        dispatch(addCryptos({cryptos, erc20, bep20, trc20}))
    }catch(err){
        console.log(err)
    }
}