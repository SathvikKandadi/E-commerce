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

  if (req.method === 'DELETE') {
    try {

        const {_id} = req.body;
        const shoe = await Shoe.findOne({_id});
        if(!shoe)
        {
            return res.status(404).json({ success: false, message: 'Shoe not found' });
        }

        await Shoe.deleteOne({_id});
        res.status(201).json({ success: true, message: 'Shoe deleted successfully' });
    } catch (error) {
      console.error('Error saving shoe data:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
