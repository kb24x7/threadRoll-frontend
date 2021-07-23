import '../styles/globals.scss'
import { Auth0Provider } from '@auth0/auth0-react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Auth0Provider
        domain={'readroll.us.auth0.com'}
        clientId={'viosHeutTbCFxVHBFEW50IVWasO00JRc'}
        redirectUri={'https://threadroll.app'}>
          <Component {...pageProps} />
      </Auth0Provider>
    </>
  ) 
}

export default MyApp
