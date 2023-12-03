import Footer from '@/Components/Footer'
import NavBar from '@/Components/NavBar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'


export default function App({ Component, pageProps }: AppProps) {
  return <div>
      <NavBar></NavBar>
      <Component {...pageProps} />
      <Footer></Footer>
  </div>
  
  
}
