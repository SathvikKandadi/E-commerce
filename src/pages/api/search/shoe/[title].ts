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
    shoes?:Shoe[];
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
        // const requiredShoes:Shoe[]    = await Shoe.find({title});
        // const requiredShoes: Shoe[] = await Shoe.find({
        //   title: { $regex: new RegExp(`^${title}`, 'i') }, // Match titles starting with the given title
        // });
        const regexPattern =
        typeof title === 'string' ? new RegExp(title, 'i') : /./; // Check if title is a string
      const requiredShoes: Shoe[] = await Shoe.find({
        title: { $regex: regexPattern }, // Match titles with 'Nike' anywhere if given title is Nike
      });

        // console.log(title);
        if(!requiredShoes || requiredShoes.length === 0)
        {
            console.log("No shoe Found");
            res.status(200).json({ success: false, message: 'No such Shoe found!' });
            return;
        }
        // console.log("Shoe found");
        // console.log(requiredShoes);
        res.status(201).json({ success: true, message: 'Shoe data retrieved successfully'  , shoes:requiredShoes});
      } catch (error) {
        console.error('Error retrieving  shoe data:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    } else {
      res.status(403).json({ success: false, message: 'Method Not Allowed' });
    }
  }