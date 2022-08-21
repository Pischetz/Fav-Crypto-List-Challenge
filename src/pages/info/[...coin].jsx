import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getInfo } from "redux-toolkit/actions/cryptoInfoActions"
import Image from 'next/image'
import { clearInfo } from "redux-toolkit/reducers/cryptoInfo.slice"
import { Button, Input } from "@material-tailwind/react"
import { addFavourite, updateFavourite } from "redux-toolkit/reducers/favourite.slice"
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner"

export default function Info() {
    const router = useRouter()
    const { coin } = router.query
    const dispatch = useDispatch()
    const cryptoInfo = useSelector(store => store.cryptoInfo.info)
    const favourites = useSelector(store => store.favourites.favourites)
    const [loading, setLoading] = useState(false)
    const [fav, setFav] = useState(false)
    const [ammount, setAmmount] = useState(0)

    useEffect(() => {
        const getCryptoInfo = async () => {
            setLoading(true)
            if (coin.length === 2) {
                await dispatch(getInfo(coin[1], `/${coin[0]}`))
                setLoading(false)
            } else {
                await dispatch(getInfo(coin[0]))
                setLoading(false)
            }
        }
        if (coin) {
            getCryptoInfo()
        }
        return (() =>{
            dispatch(clearInfo())
        })
    }, [coin])

    useEffect(() => {
        if(cryptoInfo.coin){
            if (coin.length === 2) {
                let isFav = favourites.find(crypto => crypto.coin === cryptoInfo.coin && crypto.chain === coin[0])
                if(isFav){
                    setFav(true)
                }
            } else {
                let isFav = favourites.find(crypto => crypto.coin === cryptoInfo.coin && crypto.chain === '')
                if(isFav){
                    setFav(true)
                }
            }
        }
    }, [cryptoInfo])

    const handleAddFavourite = () => {
        if (coin.length === 2) {
            if(fav){
                dispatch(updateFavourite({
                    coin: cryptoInfo.coin,
                    chain: coin[0],
                    prices: cryptoInfo.prices,
                    ammount: ammount
                }))
            }else{
                dispatch(addFavourite({
                    coin: cryptoInfo.coin,
                    logo: cryptoInfo.logo,
                    prices: cryptoInfo.prices,
                    ammount: ammount,
                    ticker: cryptoInfo.ticker,
                    chain: coin[0],
                    lastUpdate: new Date().getTime(),
                    lastRefresh: new Date().getTime(),
                }))
            }
            
        }else {
            dispatch(addFavourite({
                coin: cryptoInfo.coin,
                logo: cryptoInfo.logo,
                prices: cryptoInfo.prices,
                ammount: ammount,
                ticker: cryptoInfo.ticker,
                chain: coin[0],
                lastUpdate: new Date().getTime(),
                lastRefresh: new Date().getTime(),
            }))
        }
        router.push('/')
    }

    const handleChange = (e) => {
        setAmmount(parseFloat(e.target.value))
    }

    return <div>
        {loading ? <LoadingSpinner/> :
            cryptoInfo.coin ?
                <>
                    {cryptoInfo.coin}
                    <Image src={cryptoInfo.logo} width='20px' height='20px' />
                    <Input type={'number'} value={ammount} placeholder='Set Ammount' onChange={handleChange}/>
                    <Button onClick={handleAddFavourite}>{fav? <span>Update</span>: <span>SetFav</span>}</Button>
                </>
                : <div>componente de moneda no encontrada</div>}
    </div>
}