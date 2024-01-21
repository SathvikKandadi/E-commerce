import { IconButton } from "@mui/material";
import {  useRouter } from "next/router";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import SearchBar from "./SearchBar";
import {signIn, useSession, signOut} from "next-auth/react";

export default function NavBar()
{
    const router = useRouter();
    const session = useSession();
    console.log(session);
    console.log(session.data);
    console.log(session.data?.user);

    return(
        <div className="bg-slate-950 border flex flex-row justify-between p-2 w-full">
            <div >
                <IconButton style={{color:"white"}} onClick={() => router.push("/")}><HomeIcon fontSize="medium"/></IconButton>
                <span className="text-slate-50 pl-4 pt-2">All enquires- orders@sneakerz.co.in</span>
            </div>
            <div className="flex flex-row ">
                {
                    (session.data) ?
                    <div className="text-slate-50 m-2">{session.data.user?.name}</div>
                    :
                    <button className="text-slate-50 m-1" onClick={() => signIn()}>Log in</button>
                }
                {
                    (session.data) ?
                    <button className="text-slate-50 m-1" onClick={() => signOut()}>Log out</button>
                    :
                    <button className="text-slate-50 m-1" onClick={() => router.push("/signup")}>Create account</button>
                }
                <IconButton style={{color:"white"}} onClick={() => router.push("/cart")}><ShoppingCartIcon fontSize="small"/></IconButton>
                <SearchBar></SearchBar>
            </div>
        </div>
    )
}