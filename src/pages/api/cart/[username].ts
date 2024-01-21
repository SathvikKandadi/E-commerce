import Order from "@/lib/Order";
import User from "@/lib/User";
import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

interface User {
    _id?:string,
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
        const { username } = req.query;
        const user:User | null = await User.findOne({username});
        if(user)
        {
            const userId = user._id;
        try{
            const orders:Order[] = await Order.find({user : userId});
            const cart: Order[] = await Order.populate(orders, { path: 'shoe' });
            res.status(201).json({success:true , message:"Cart data retrieved successfully",cart:cart });
        }
        catch (error) {
            console.error('Error retrieving  cart data:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
          }
        }
        else
        {
            res.status(404).json({success:false , message: 'Login to view the Cart'});
        }
    }
    else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}