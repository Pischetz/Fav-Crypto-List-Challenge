import { Card, IconButton, CardHeader, CardBody, Typography } from "@material-tailwind/react"

import FavouriteCard from "components/FavouriteCard/FavouriteCard";
import SearchModal from "components/SearchModal/SearchModal"
import { useEffect, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setFavourites } from "redux-toolkit/reducers/favourite.slice";

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const favourites = useSelector(store => store.favourites.favourites)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!favourites.length) {
      let savedFavorites = localStorage.getItem('favs')

      if (savedFavorites) {
        savedFavorites = JSON.parse(savedFavorites)
        dispatch(setFavourites(savedFavorites))
      }
    }
  }, [])

  return (
    <div className="flex">
      <Card className="w-[400px] m-auto">
        <CardHeader
          variant="gradient"
          color="cyan"
          className="mb-4 grid h-12 place-items-center"
          floated={false}
        >
          <div className="flex justify-between w-[90%] items-center">
            <Typography variant="h3" color="white">
              Your Favs!
            </Typography>
            <div>
              <IconButton onClick={() => { setShowModal(!showModal) }} color='cyan' variant='gradient' className="rounded-full h-8 w-8 ">
                <AiOutlinePlus color="white" />
              </IconButton>
            </div>
          </div>
        </CardHeader>
        <CardBody className="md:max-h-[400px] overflow-auto">
          {favourites.length ? favourites.map(crypto => <>
            <FavouriteCard crypto={crypto} />
          </>) :
            <div className="text-center">
              <Typography variant='h3'>
                You have no Favorite crypto yet!
              </Typography>
            </div>}
        </CardBody>
      </Card>
      <SearchModal setShowModal={setShowModal} showModal={showModal} />
    </div>
  )
}
