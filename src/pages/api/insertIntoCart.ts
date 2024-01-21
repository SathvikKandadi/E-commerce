import Order from "@/lib/Order";
import User from "@/lib/User";
import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { use } from "react";


type Data = {
    success:boolean,
    message?:string,
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

interface User{
    _id:string,
    email:string,
    username:string,
    password:string,
    admin:string,
}

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse<Data>
)
{
    await dbConnect();

    if(req.method === "POST")
    {
        try{
            // const shoe = req.body.shoe;
            // const user:User = req.body.user;
            const {
                shoe ,
                user ,
                quantity
            }
            = req.body
            // const existingItem = await Order.findOne({shoe});
            console.log("Inserting here")
            console.log(shoe);
            console.log(user);
            const email = user.email
            const userId = await User.findOne({email});
            const existingItem = await Order.findOne({
                user: userId,
                shoe: shoe,
              });
            if(existingItem)
            {
                console.log("Existing shoe");
                await Order.updateOne(
                    // { key: existingItem._id},
                    { user: userId, shoe: shoe },
                    { $inc: {quantity:1}}
                )
                res.status(201).json({success:true , message:"Shoe added to cart sucessfully"});
            }
            else
            {
                const newOrder = new Order({
                    shoe,
                    user:userId,
                    quantity:quantity,
                  });
            
                  await newOrder.save();
                  res.status(201).json({ success: true, message: 'Shoe added to cart successfully' });
            }
        }
        catch (error) {
            console.error('Error retrieving  cart data:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
          }
    }
    else
    {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}