import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CopyrightIcon from '@mui/icons-material/Copyright';

export default function Footer()
{
    return(
        <div className="bg-black ">
            <div className="flex flex-row justify-around flex-grow">
            <div className="m-2">
                <div className="text-red-500 font-bold text-sm m-2 pt-6 pb-4">LINKS</div>
                <div className="text-white text-xs m-2">About</div>
                <div className="text-white text-xs m-2">Login</div>
                <div className="text-white text-xs m-2 pb-8">Signup</div>
            </div>
            <div className="m-2 ">
                <div className="text-red-500 font-bold text-sm m-2 pt-6 pb-4">FOLLOW US</div>
                <div className='pl-2 flex flex-row justify-between'>
                <FacebookIcon style={{ color: 'white' }}></FacebookIcon>
                <InstagramIcon style={{ color: 'white' }}></InstagramIcon>
                <YouTubeIcon style={{ color: 'white' }}></YouTubeIcon>
                </div>
            </div>
            <div className="m-2">
                <div className="text-red-500 font-bold text-sm m-2 pt-6 pb-4">Privacy Policy</div>
                <div className="text-white text-xs m-2">Shipping Policy</div>
                <div className="text-white text-xs m-2">Seller Policy</div>
                <div className="text-white text-xs m-2 pb-8">Terms and Conditions</div>
            </div>
            <div className="m-2 ">
                <div className="text-red-500 font-bold text-sm m-2 pt-6 pb-4">Contact US</div>
                <div className="text-white text-xs m-2">Email: shop@sneakerz.co.in</div>
                <div className="text-white text-xs m-2">Contact: +91 9485229421</div>
            </div>
            </div>
            <div className='flex flex-row justify-center pb-6'>
                <div className='text-white text-xs'>
                    Copyright <CopyrightIcon style={{color: 'white', fontSize: 'small'}}/> 2023, Sneakerz.co.in
                </div>
            </div>  
        </div>
        
    )
}