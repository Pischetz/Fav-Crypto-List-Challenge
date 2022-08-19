import SearchModal from "components/SearchModal/SearchModal"
import { useState } from "react"


export default function Home() {
  const [showModal, setShowModal] = useState(false)


  return (
    <div className="hola">
      hola 23
      <button onClick={() => {setShowModal(!showModal)}}>Hola?</button>
      {showModal? <SearchModal setShowModal={setShowModal} showModal={showModal}/>: null}
    </div>
  )
}
