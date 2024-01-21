import Footer from '@/Components/Footer'
import NavBar1 from '@/Components/NavBar1'
import NavBar from '@/Components/NavBar'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'


export default function App({ Component, pageProps }: AppProps) {
  return <SessionProvider>
      <NavBar></NavBar>
      <Component {...pageProps} />
      <Footer></Footer>
  </SessionProvider>
  
  
}
