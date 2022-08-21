import { Accordion, AccordionBody, AccordionHeader, Button, IconButton } from "@material-tailwind/react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { removeFavourite } from "redux-toolkit/reducers/favourite.slice"
import { AiOutlineDelete } from "react-icons/ai";

export default function FavouriteCard({ crypto }) {

    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    return (
        <>
            <Accordion open={open} onClick={() => setOpen(!open)}>
                <AccordionHeader>
                    <div className="flex justify-between w-full">
                    {crypto.coin} 
                    {crypto.prices.USD}
                    <IconButton color="red" className="rounded-full h-6 w-6" onClick={() => {dispatch(removeFavourite({ coin: crypto.coin, chain: crypto.chain }))}}> <AiOutlineDelete/></IconButton>
                    </div>
                    </AccordionHeader>
                <AccordionBody>
                <p>{crypto.ammount}</p>
                
                <p>{new Date(crypto.lastUpdate).toLocaleString()}</p>
                <p>{new Date(crypto.lastRefresh).toLocaleString()}</p>
                
                </AccordionBody>
            </Accordion>            
        </>
    )
}