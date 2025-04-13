import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect } from 'react';


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Import Bootstrap JS on the client side
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
