import { AppBar, Button, IconButton, InputBase, Toolbar, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/router';

export default function NavBar()
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

    const router = useRouter();
    return(
      <AppBar  style={appBarStyle}>
      <Toolbar>
        <Typography>All enquires- orders@sneakerz.co.in</Typography>
        <div className='appBarButtonContainer'>
          <Button color="inherit" onClick={() => router.push("/login")}>Login</Button>
          <Button color="inherit" onClick={() => router.push("/signup")}>Create Account</Button>
          
          <IconButton style={{color:"white"}} onClick={() => router.push("/cart")}><ShoppingCartIcon fontSize="small"/></IconButton>
          <InputBase style={searchStyle} className="rounded" placeholder='Search'/>
          <IconButton style={{color:"white"}} aria-label="search"><SearchIcon/>
          </IconButton> 
        </div>
      </Toolbar>
    </AppBar>
    )
  }