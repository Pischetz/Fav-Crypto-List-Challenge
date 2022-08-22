import { Accordion, AccordionBody, AccordionHeader, Button, IconButton } from "@material-tailwind/react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeFavourite } from "redux-toolkit/reducers/favourite.slice"
import { AiOutlineDelete } from "react-icons/ai";
import Image from "next/image";

export default function FavouriteCard({ crypto }) {
    
    const selected = useSelector(store => store.favourites.currency)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    return (
        <>
            <Accordion open={open} onClick={() => setOpen(!open)}>
                <AccordionHeader>
                    <div className="flex justify-between w-full">
                    <div>
                    <Image src={crypto.logo} width='20px' height='20px'/>
                    {crypto.coin} 
                    </div>
                    <IconButton color="red" className="rounded-full h-6 w-6" onClick={() => {dispatch(removeFavourite({ coin: crypto.coin, chain: crypto.chain }))}}> <AiOutlineDelete/></IconButton>
                    </div>
                    </AccordionHeader>
                <AccordionBody>
                {crypto.prices[selected]? <p>{crypto.prices[selected]} {selected}</p> : <p>Untracked Price</p>}
                <p>{crypto.ammount}</p>
                <p>{new Date(crypto.lastUpdate).toLocaleString()}</p>
                <p>{new Date(crypto.lastRefresh).toLocaleString()}</p>
                
                </AccordionBody>
            </Accordion>            
        </>
    )
}