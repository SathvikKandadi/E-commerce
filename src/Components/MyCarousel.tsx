import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function MyCarousel() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:3000,

    };

    

    return (
        <div className='flex flex-row justify-center  ml-12 mr-12 mt-16 h-full'>
            <Slider {...settings} className='w-full'>
            <div>
                <img src="/image1.png" alt="Slide 1" />
            </div>
            <div>
                <img src="/image2.png" alt="Slide 2" />
            </div>
            <div>
                <img src="/image3.png" alt="Slide 3" />
            </div>
        </Slider>
        </div>
        
    );
}
