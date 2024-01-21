import Order from "@/lib/Order";
import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

interface User {
    email:string,
    username:string,
    password:string,
    admin:boolean,
}

interface Shoe {
    _id:string,
    img:string,
    title:string,
    brand:string,
    price:string,
    description:string,
    sizes:number[],
}


interface Order{
    user:User,
    shoe:Shoe,
    quantity:number,
}


type Data = {
    success: boolean;
    message?: string;
    cart?:Order[];

}

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse<Data>
)
{
    await dbConnect();
    if(req.method === "GET")
    {

        try{
            const cart:Order[] = await Order.find();
            res.status(200).json({success:true , message:"Cart data retrieved successfully",cart:cart });
        }
        catch (error) {
            console.error('Error retrieving  cart data:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
          }
    }
    else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}