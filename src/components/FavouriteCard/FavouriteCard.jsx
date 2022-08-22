import { Accordion, AccordionBody, AccordionHeader, IconButton } from "@material-tailwind/react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeFavourite } from "redux-toolkit/reducers/favourite.slice"
import { AiOutlineDelete, AiOutlineReload } from "react-icons/ai";
import Image from "next/image";
import { executeRefresh } from "redux-toolkit/actions/favouriteActions";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

export default function FavouriteCard({ crypto }) {

    const selected = useSelector(store => store.favourites.currency)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleRefresh = async() => {
        setLoading(true)
        await dispatch(executeRefresh(crypto.ticker, crypto.chain))
        setLoading(false)
        setOpen(true)
    }

    return (
        <>
            <Accordion open={open} onClick={() => setOpen(!open)}>
                <AccordionHeader>
                    <div className="flex justify-between w-full items-center z-50">
                        <div className="flex items-center">
                            <Image src={crypto.logo} width='20px' height='20px' className="rounded-full" />
                            <span className="ml-2">{crypto.coin}</span>
                        </div>
                        <div className="flex items-center">
                        {!loading? 
                        <IconButton color="cyan" className="rounded-full h-6 w-6 mr-1" onClick={handleRefresh}>
                            <AiOutlineReload />
                        </IconButton>: 
                        <div className="mr-1">
                            <LoadingSpinner />
                        </div>}
                        
                        <IconButton color="red" className="rounded-full h-6 w-6" onClick={() => { dispatch(removeFavourite({ coin: crypto.coin, chain: crypto.chain })) }}>
                            <AiOutlineDelete />
                        </IconButton>
                        </div>
                    </div>
                </AccordionHeader>
                <AccordionBody>
                    <div className="flex justify-between">
                        <span>Price:</span>
                        {crypto.prices[selected] ? <span>{crypto.prices[selected]} {selected}</span> : <span>Untracked Price</span>}
                    </div>
                    <div className="flex justify-between">
                        <span>Ammount: {crypto.ammount} {crypto.ticker.toUpperCase()}</span>
                        <span>{crypto.prices[selected] ? `~${parseFloat(crypto.prices[selected]) * parseFloat(crypto.ammount)} ${selected}` : 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Last Update</span>
                        <span>{new Date(crypto.lastUpdate).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Last Refresh</span>
                        <span>{new Date(crypto.lastRefresh).toLocaleString()}</span>
                    </div>
                </AccordionBody>
            </Accordion>
        </>
    )
}