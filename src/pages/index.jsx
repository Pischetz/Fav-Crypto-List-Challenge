import { Button, Card, IconButton, CardHeader, CardBody, CardFooter, Typography} from "@material-tailwind/react"

import FavouriteCard from "components/FavouriteCard/FavouriteCard";
import SearchModal from "components/SearchModal/SearchModal"
import { useState } from "react"
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const favourites = useSelector(store => store.favourites.favourites)
  const dispatch = useDispatch()

  return (
    <div className="hola">
      <Card className="max-w-[400px]">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-12 place-items-center"
        floated={false}
      >
        <div className="flex justify-between w-[90%] items-center">
        <Typography variant="h3" color="white">
          Favourites Cryptos
        </Typography>
        <div>
        <IconButton onClick={() => { setShowModal(!showModal)}} variant='gradient' className="rounded-full h-8 w-8 ">
        <AiOutlinePlus color="white"/>
        </IconButton>
        </div>
        </div>
      </CardHeader>
      
      <CardBody>
      {favourites.length? favourites.map(crypto => <>
        <FavouriteCard crypto={crypto}/>
      </>): null}
      </CardBody>
      </Card>
      <SearchModal setShowModal={setShowModal} showModal={showModal} />
    </div>
  )
}
