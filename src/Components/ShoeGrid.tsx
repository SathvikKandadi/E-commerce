import ShoeCard from "./ShoeCard"

const shoes = [
    {
        img:"/shoe1.png",
        title:"Nike Dunk Low 'Black White' Panda",
        brand:"Nike",
        price:"Rs. 12,999.00",
        sizes:"UK 6 UK 7 UK 8 UK 9"
    },
    {
        img:"/shoe1.png",
        title:"Nike Dunk Low 'Black White' Panda",
        brand:"Nike",
        price:"Rs. 12,999.00",
        sizes:"UK 6 UK 7 UK 8 UK 9"
    },
    {
        img:"/shoe1.png",
        title:"Nike Dunk Low 'Black White' Panda",
        brand:"Nike",
        price:"Rs. 12,999.00",
        sizes:"UK 6 UK 7 UK 8 UK 9"
    },
    {
        img:"/shoe1.png",
        title:"Nike Dunk Low 'Black White' Panda",
        brand:"Nike",
        price:"Rs. 12,999.00",
        sizes:"UK 6 UK 7 UK 8 UK 9"
    },
    {
        img:"/shoe1.png",
        title:"Nike Dunk Low 'Black White' Panda",
        brand:"Nike",
        price:"Rs. 12,999.00",
        sizes:"UK 6 UK 7 UK 8 UK 9"
    },
    {
        img:"/shoe1.png",
        title:"Nike Dunk Low 'Black White' Panda",
        brand:"Nike",
        price:"Rs. 12,999.00",
        sizes:"UK 6 UK 7 UK 8 UK 9"
    },
    {
        img:"/shoe1.png",
        title:"Nike Dunk Low 'Black White' Panda",
        brand:"Nike",
        price:"Rs. 12,999.00",
        sizes:"UK 6 UK 7 UK 8 UK 9"
    },
    {
        img:"/shoe1.png",
        title:"Nike Dunk Low 'Black White' Panda",
        brand:"Nike",
        price:"Rs. 12,999.00",
        sizes:"UK 6 UK 7 UK 8 UK 9"
    },
    {
        img:"/shoe1.png",
        title:"Nike Dunk Low 'Black White' Panda",
        brand:"Nike",
        price:"Rs. 12,999.00",
        sizes:"UK 6 UK 7 UK 8 UK 9"
    },
    {
        img:"/shoe1.png",
        title:"Nike Dunk Low 'Black White' Panda",
        brand:"Nike",
        price:"Rs. 12,999.00",
        sizes:"UK 6 UK 7 UK 8 UK 9"
    },
    {
        img:"/shoe1.png",
        title:"Nike Dunk Low 'Black White' Panda",
        brand:"Nike",
        price:"Rs. 12,999.00",
        sizes:"UK 6 UK 7 UK 8 UK 9"
    },
    {
        img:"/shoe1.png",
        title:"Nike Dunk Low 'Black White' Panda",
        brand:"Nike",
        price:"Rs. 12,999.00",
        sizes:"UK 6 UK 7 UK 8 UK 9"
    },
    {
        img:"/shoe1.png",
        title:"Nike Dunk Low 'Black White' Panda",
        brand:"Nike",
        price:"Rs. 12,999.00",
        sizes:"UK 6 UK 7 UK 8 UK 9"
    },
    {
        img:"/shoe1.png",
        title:"Nike Dunk Low 'Black White' Panda",
        brand:"Nike",
        price:"Rs. 12,999.00",
        sizes:"UK 6 UK 7 UK 8 UK 9"
    },
    {
        img:"/shoe1.png",
        title:"Nike Dunk Low 'Black White' Panda",
        brand:"Nike",
        price:"Rs. 12,999.00",
        sizes:"UK 6 UK 7 UK 8 UK 9"
    },
    
]

export default function ShoeGrid()
{
    return(
        <div className="grid grid-cols-5 m-14">
            {shoes.map((shoe) => (
                <ShoeCard img={shoe.img} title={shoe.title} brand={shoe.brand} price={shoe.price} sizes={shoe.sizes}></ShoeCard>
            ))}
        </div>
    )
}