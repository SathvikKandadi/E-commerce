import '@/styles/globals.css'
import { AppBar, Button, IconButton, InputBase, Toolbar, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <div>
      <NavBar></NavBar>
      <Component {...pageProps} />
  </div>
  
  function NavBar()
  {
    const appBarStyle = {
      backgroundColor:"black",
      maxHeight:"6%",
   
    };

    const searchStyle = {
      backgroundColor: "#f2f2f2",
      height:"50%",
      // marginLeft:"auto",
      marginBottom:"1%",

    };


    return(
      <AppBar  style={appBarStyle}>
      <Toolbar>
        <Typography>All enquires- orders@sneakerz.co.in</Typography>
        <div className='appBarButtonContainer'>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Create Account</Button>
          
          <IconButton style={{color:"white"}}><ShoppingCartIcon fontSize="small"/></IconButton>
          <InputBase style={searchStyle} placeholder='Search'/>
          <IconButton style={{color:"white"}} aria-label="search"><SearchIcon/>
          </IconButton> 
        </div>
      </Toolbar>
    </AppBar>
    )
  }
}
