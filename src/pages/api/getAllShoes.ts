import type { NextApiRequest, NextApiResponse } from 'next';
import Shoe from '@/lib/Shoe';
import dbConnect from '@/lib/dbConnect';

interface Shoe {
    _id: string;
    img: string;
    title: string;
    brand: string;
    price: string;
    description: string;
    sizes: number[];
}

type Data = {
    success: boolean;
    message?: string;
    shoes?: Shoe[];
    totalPages?: number;
};

const ITEMS_PER_PAGE = 10; 

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await dbConnect();
    if (req.method === 'GET') {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || ITEMS_PER_PAGE;

            const totalShoesCount = await Shoe.countDocuments();
            const totalPages = Math.ceil(totalShoesCount / pageSize);

            const shoes: Shoe[] = await Shoe.find()
                .skip((page - 1) * pageSize)
                .limit(pageSize);

            res.status(201).json({
                success: true,
                message: 'Shoes retrieved successfully',
                shoes,
                totalPages,
            });
        } catch (error) {
            console.error('Error retrieving shoes data:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}











// import type { NextApiRequest, NextApiResponse } from 'next';
// import Shoe from '@/lib/Shoe';
// import dbConnect from '@/lib/dbConnect';



// interface Shoe {
//     _id:string,
//     img:string,
//     title:string,
//     brand:string,
//     price:string,
//     description:string,
//     sizes:number[],
// }

// type Data = {
//     success: boolean;
//     message?: string;
//     shoes?:Shoe[];
//   };



// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse<Data>
//   ) 
//   {
//     await dbConnect();
//     if (req.method === 'GET') {
//       try {
//         const allShoes:Shoe [] = await Shoe.find();
//         // console.log(allShoes);
//         res.status(201).json({ success: true, message: 'Shoes  retrieved successfully'  , shoes:allShoes});
//       } catch (error) {
//         console.error('Error retrieving  shoes data:', error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//       }
//     } else {
//       res.status(405).json({ success: false, message: 'Method Not Allowed' });
//     }
//   }