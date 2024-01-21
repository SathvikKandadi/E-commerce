import type { NextApiRequest, NextApiResponse } from 'next';
import Shoe from '@/lib/Shoe';
import dbConnect from '@/lib/dbConnect';




interface Shoe {
    _id:any,
    img:string,
    title:string,
    brand:string,
    price:string,
    description:string,
    sizes:number[],
}

type Data = {
    success: boolean;
    message?: string;
    shoe?:Shoe;
  };



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) 
  {
    await dbConnect();
    if (req.method === 'GET') {
        const {title} = req.query;
      try {
        const requiredShoe  = await Shoe.findOne({title});
        if(!requiredShoe)
        {
            res.status(404).json({ success: false, message: 'No such Shoe found!' });
            return;
        }
        res.status(201).json({ success: true, message: 'Shoe data retrieved successfully'  , shoe:requiredShoe});
      } catch (error) {
        console.error('Error retrieving  shoe data:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    } else {
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  }