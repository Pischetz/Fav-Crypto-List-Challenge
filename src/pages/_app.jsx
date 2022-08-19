import '@styles/tailwind.css'
import { Provider } from "react-redux";
import { store } from 'redux-toolkit/store';

function MyApp({ Component, pageProps }) {
  return (<Provider store={store}><Component {...pageProps} /></Provider>)
}

export default MyApp
