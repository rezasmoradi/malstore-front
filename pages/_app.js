import React from 'react'
import { wrapper } from '../redux/store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { Router } from 'next/router'

import '../styles/globals.css'
import '../styles/fontiran.css'

import { changeColorThemeAction } from '../redux/actions/userAction'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/style.css'

function App({ Component, pageProps }) {

  const { store, props } = wrapper.useWrappedStore(pageProps)

  const [loading, setLoading] = React.useState(false)
  const theme = store.getState().user.theme;

  React.useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("findished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, [])

  React.useEffect(() => {
    const appTheme = localStorage.getItem('theme')
    if (appTheme === null) {
      localStorage.setItem('theme', 'light');
    }
    if (appTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    if (appTheme !== theme) {
      store.dispatch(changeColorThemeAction(appTheme));
    }
  }, [])

  return (<>
    {loading ? (
      <h1>LOADING</h1>
    ) :
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    }</>)
}

export default App
