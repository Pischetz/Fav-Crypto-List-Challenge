import { useEffect, useRef, Fragment, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getCryptos } from "redux-toolkit/actions/cryptoListsActions"
import { selectList } from "redux-toolkit/reducers/cryptoList.slice"
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
  Input
} from "@material-tailwind/react";
import CardHolder from "components/CardHolder/CardHolder";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

export default function SearchModal(props) {

  const { showModal, setShowModal } = props
  const {cryptocurrenciesList, TRC20List, BEP20List, ERC20List, selectedList} = useSelector(store => store.cryptoLists)
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(()=> {
    const getLists = async() => {
      setLoading(true)
      await dispatch(getCryptos())
      setLoading(false)
    }
    if(!cryptocurrenciesList.length){
      getLists()
    }
    if(localStorage.getItem('selectedList') !== 'currencies'){
      dispatch(selectList(localStorage.getItem('selectedList')))
    }
  },[])

  const handleButtons = (e) =>{
    if(selectedList !== e){
      localStorage.setItem('selectedList', e)
      dispatch(selectList(e))
    }
  }

  const handleSearch = (e) =>{
    setSearch(e.target.value)
  }

  const sendList = (selectedList) => {
      switch(selectedList){
        case 'TRC-20':
          return TRC20List
        case 'BEP-20':
          return BEP20List
        case 'ERC-20':
          return ERC20List
        default:
          return cryptocurrenciesList
      }
  }

  const sendChain = (selectedList) => {
    switch(selectedList){
      case 'TRC-20':
        return '/trc20'
      case 'BEP-20':
        return '/bep20'
      case 'ERC-20':
        return '/erc20'
      default:
        return ''
    }
}



  return (
    <Fragment >
    <Dialog open={showModal} handler={setShowModal} size={"xl"} className='overflow-auto'>
      <DialogHeader>Search Your Favourite Crypto!</DialogHeader>
      <DialogBody divider>
        <Input variant="outlined" label="Outlined" value={search} onChange={handleSearch}/>
        <div className="">
        <Select variant="outlined" label="Select" size="md" onChange={handleButtons}>
          <Option value="currencies" selected>CryptoCurrencies</Option>
          <Option value="TRC-20">TRC-20</Option>
          <Option value="BEP-20">BEP-20</Option>
          <Option value="ERC-20">ERC-20</Option>
        </Select>
        </div>
        </DialogBody>
        <DialogBody divider>
          {loading? <LoadingSpinner/>: <CardHolder cryptoList={sendList(selectedList)} chain={sendChain(selectedList)} search={search}/>}
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={() => setShowModal(false)}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={() => setShowModal(false)}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  </Fragment>

  )
}