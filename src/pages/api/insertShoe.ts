import type { NextApiRequest, NextApiResponse } from 'next';
import Shoe from '@/lib/Shoe';
import dbConnect from '@/lib/dbConnect';


type Data = {
  success: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  await dbConnect();

  if (req.method === 'POST') {
    try {
      const {
        img,
        title,
        brand,
        price,
        sizes,
        description,
      } = req.body;

      const newShoe = new Shoe({
        img,
        title,
        brand,
        price,
        sizes,
        description,
      });

      await newShoe.save();

      res.status(201).json({ success: true, message: 'Shoe data saved successfully' });
    } catch (error) {
      console.error('Error saving shoe data:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
