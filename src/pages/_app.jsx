import '@styles/tailwind.css'
import { Provider } from "react-redux";
import { store } from 'redux-toolkit/store';

function MyApp({ Component, pageProps }) {
  return (
  <Provider store={store}>
    <div className='bg-[url("../../public/SL-0212121-40670-68.jpg")] min-h-screen min-w-screen bg-cover bg-scroll bg-repeat-y'>
    <Component {...pageProps} />
    </div>
  </Provider>
  )
}

export default MyApp
