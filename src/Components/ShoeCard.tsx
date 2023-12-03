interface shoe{
    img:string,
    title:string,
    brand:string,
    price:string,
    sizes:string
}



export default function ShoeCard(props:shoe)
{
    return(
        <div className="m-3 cursor-pointer">
            <img src={props.img}></img>
            <div className="text-sm font-bold mt-10">{props.title}</div>
            <div className="text-sm mt-1">{props.brand}</div>
            <div className="text-xs text-gray-600 mt-1">{props.price}</div>
            <div className="text-red-500 text-sm mt-1">{props.sizes}</div>
        </div>
    )
}