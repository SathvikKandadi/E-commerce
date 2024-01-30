import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {signIn, useSession, signOut} from "next-auth/react";




interface Shoe {
    _id:string,
    img:string,
    title:string,
    brand:string,
    price:string,
    description:string,
    sizes:number[],
}

type t = string | string[] | undefined;
    

export default function HorizontalShoeCard()
{
    const router = useRouter();
    const session = useSession();
    const queryString = router.query;
    let title: t;
    for (let key in queryString) {
        if(queryString[key])
            title  = queryString[key]
    }   
    const [shoe, setShoe] = useState<Shoe | undefined>();
    const [quantity,setQuantity] = useState(1);
    // const apiUrl = process.env.NEXT_APP_API_URL || 'http://localhost:3000';
    const apiUrl ="";
    useEffect(() => {
        const fetchData = async () => {
          try {
                const resp = await axios.get(`${apiUrl}/api/shoe/${title}`);
                setShoe(resp.data.shoe);
          } catch (error) {
            console.error("Error fetching shoe data:", error);
          }
        };
    if(title)
        fetchData();
      }, [title]);

    return(
        <>
        {
            (!shoe) ? 
            <div className="flex flex-row justify-center items-center w-screen h-max">
                <div>
                    <CircularProgress size={150}/> 
                </div>
            </div>
            :
            <div className="grid grid-cols-12 m-20">
            <div className="col-span-6 ">
                <img src={shoe.img} alt={shoe.title}></img>
            </div>
            <div className="col-span-6 ">
                <div className="text-red-700 font-bold text-2xl m-1">{shoe.brand}</div>
                <div className="text-3xl font-bold m-1">{shoe.title}</div>
                <div className="text-red-500 font-bold text-xl m-1">{shoe.price}</div>
                <div className="text-sm m-1"><span className="text-red-500">Shipping</span> calculated at checkout.</div>
                <div className="m-2 mb-4">
                    <div>Size</div>
                    <div>
                        <select className="border border-solid border-gray-400 border-1 p-1">
                            {
                                (shoe.sizes.length)?
                                shoe.sizes.map((size) => (
                                    <option key={size} value={size}>{`UK ${size}`}</option>
                                ))
                                :
                                <option value="">No sizes available</option>
                            }
                        </select>
                    </div>
                </div>
                <div className="m-2 ">
                    <div>Quantity</div>
                    <div>
                        <input className="border border-solid border-gray-400 border-1 p-1" type="number" value={quantity} onChange={(event) => setQuantity(parseInt(event.target.value, 10))}></input>
                    </div>
                </div>
                <button className="bg-red-500 text-white font-bold p-4 rounded-sm w-64 m-2 mt-8" onClick={addToCart}>ADD TO CART</button>
                <div className="m-2 mt-8 text-md font-Helvetica">{shoe.description}</div>
                <div className="m-2 mt-8 font-bold text-md">This product will be shipped and processed in 7-10 working days.</div>
            </div>
        </div>
        }
        </>
        
    )

    async function addToCart()
    {
        
        if(session.data?.user)
        {
            try {
                const user=session.data.user;
                const resp = await axios.post(`${apiUrl}/api/insertIntoCart`, {
                user: user,
                shoe:shoe?._id ,
                quantity:quantity,
                });      
                alert(resp.data.message);
          } catch (error) {
            console.error("Error in adding shoe to the cart:", error);
          }
            // alert("Item successfully added to Cart!");
        }
        else
        {
            alert("Log in before adding an item to Cart!");
        }
    }
}