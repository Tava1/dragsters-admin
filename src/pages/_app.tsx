import React from 'react';

import '../styles/global.css'
import { AuthProvider } from '../hooks/AuthContext';

function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp