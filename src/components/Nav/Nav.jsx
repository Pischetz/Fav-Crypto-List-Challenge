import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrency } from 'redux-toolkit/reducers/favourite.slice'
import Link from 'next/link'

const currencyes = [
    { name: 'USD' },
    { name: 'EUR' },
    { name: 'GBP' },
    { name: 'CAD' },
    { name: 'JPY' },
    { name: 'AED' },
]



export default function Nav() {
    const selected = useSelector(store => store.favourites.currency)
    const dispatch = useDispatch()

    const setSelected = (e) => {
        if(selected !== e){
            dispatch(setCurrency(e))
            localStorage.setItem('currency', e)
        }
    }

    useEffect(()=> {
        const selected = localStorage.getItem('currency')
        if(selected){
            dispatch(setCurrency(selected))
        }
    },[])

    return (
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-cyan-500 mb-3">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className=" relative flex justify-between w-auto static block justify-start">
                    <Link href={'/'}>
                    <a
                        className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                        href="/"
                    >
                        Crypto Fav List
                    </a>
                    </Link>
                </div>
                <div
                    className={
                        "flex flex-grow items-center justify-end"
                    }
                >
                    <Listbox value={selected} onChange={setSelected}>
                        <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block truncate">{selected}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <SelectorIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm w-auto z-50">
                                    {currencyes.map((currency, currencyIdx) => (
                                        <Listbox.Option
                                            key={currencyIdx}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                }`
                                            }
                                            value={currency.name}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                            }`}
                                                    >
                                                        {currency.name}
                                                    </span>
                                                    {selected ? (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
            </div>
        </nav>
    );
}