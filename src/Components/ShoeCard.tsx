import { useRouter } from "next/router"

interface shoe{
    _id?:string,
    img:string,
    title:string,
    brand:string,
    price:string,
    sizes:number[],
}



export default function ShoeCard(props:shoe)
{
    const router = useRouter();
    return(
        <div className="m-3 cursor-pointer" onClick={() => {router.push(`/product/${props.title}`)}}>
            <img src={props.img}></img>
            <div className="text-sm font-bold mt-10">{props.title}</div>
            <div className="text-sm mt-1">{props.brand}</div>
            <div className="text-xs text-gray-600 mt-1">{props.price}</div>
            <div className="text-red-500 text-sm mt-1">{
                props.sizes.map((size) => ("UK " + size +" "))
            }</div>
        </div>
    )
}