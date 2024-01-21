import { useSearchParams} from 'next/navigation';
import MyCarousel from "./MyCarousel";
import ShoeGrid from "./ShoeGrid";



export default function HomePage() {

    // const queryParams =  new URLSearchParams(window.location.search);
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    // console.log(params.get('query'));
    return (
        <div>
            {
                !params.get('query') ?
                <MyCarousel></MyCarousel>
                :
                <></>
            }
            
            {/* <ShoeGrid searchParams={queryParams}></ShoeGrid> */}
            <ShoeGrid searchParams={{ query: params.get('query') || ""}}></ShoeGrid>
        </div>
    )
}