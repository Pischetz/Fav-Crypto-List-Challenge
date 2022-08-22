import { useEffect, Fragment, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getCryptos } from "redux-toolkit/actions/cryptoListsActions"
import { selectList } from "redux-toolkit/reducers/cryptoList.slice"
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import CardHolder from "components/CardHolder/CardHolder";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { Menu, Transition } from '@headlessui/react'

export default function SearchModal(props) {

  const { showModal, setShowModal } = props
  const { cryptocurrenciesList, TRC20List, BEP20List, ERC20List, selectedList } = useSelector(store => store.cryptoLists)
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getLists = async () => {
      setLoading(true)
      await dispatch(getCryptos())
      setLoading(false)
    }
    if (!cryptocurrenciesList.length) {
      getLists()
    }
    if (localStorage.getItem('selectedList') !== 'currencies') {
      dispatch(selectList(localStorage.getItem('selectedList')))
    }
  }, [])

  const handleButtons = (e) => {
    if (selectedList !== e.target.value) {
      localStorage.setItem('selectedList', e.target.value)
      dispatch(selectList(e.target.value))
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const sendList = (selectedList) => {
    switch (selectedList) {
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
    switch (selectedList) {
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
        <DialogHeader className='text-center'>Find your fav Crypto!</DialogHeader>
        <DialogBody>
          <div className="w-full flex xs:flex-col">
          <Input variant="outlined" label="Search..." value={search} onChange={handleSearch} className='h-[40px] w-full'/>
          <div>
            <div className="w-auto text-right h-full">
              <Menu as="div" className="relative inline-block text-left h-full xs:w-full">
                <div className="h-[39px] flex ">
                  <Menu.Button className="min-w-[100px] inline-flex w-full h-full justify-center ring-1 ring-gray-500 rounded-md bg-opacity-20 text-gray hover:bg-opacity-30 hover:outline-none hover:ring-2 hover:ring-blue-500 focus:ring-opacity-75">
                    <p className="m-auto">{selectedList || "currencies"}</p>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 xs:w-full">
                      <Menu.Item>
                        <button onClick={handleButtons} className={`text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm`} value="currencies">
                        CryptoCurrencies
                        </button>
                      </Menu.Item>
                      <Menu.Item>
                        <button className={`text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm`} value="TRC-20" onClick={handleButtons}>
                        TRC-20
                        </button>
                      </Menu.Item>
                      <Menu.Item>
                        <button onClick={handleButtons} className={`text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm`}value="BEP-20">
                        BEP-20
                        </button>
                      </Menu.Item>
                      <Menu.Item>
                        <button onClick={handleButtons} className={`text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm`} value="ERC-20">
                        ERC-20
                        </button>
                      </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          </div>
        </DialogBody>
        <DialogBody >
          {loading ? <div className="h-[200px] w-full flex items-center justify-center"><LoadingSpinner /></div> : <CardHolder cryptoList={sendList(selectedList)} chain={sendChain(selectedList)} search={search} />}
        </DialogBody>
      </Dialog>
    </Fragment>

  )
}