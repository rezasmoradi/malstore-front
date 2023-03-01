import React from 'react';
import { wrapper } from '../redux/store';
import { Provider } from 'react-redux';
import { Router } from 'next/router';

import '../styles/globals.css';
import '../styles/fontiran.css';
import '../styles/style.css';

function MyApp({ Component, pageProps }) {

  const [loading, setLoading] = React.useState(false);
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
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme', 'light');
    }
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (<>
    {loading ? (
      <h1>LOADING</h1>
    ) :
      <Component {...pageProps} />
    }</>)
}

export default wrapper.withRedux(MyApp);
