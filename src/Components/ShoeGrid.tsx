import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import ShoeCard from "./ShoeCard"
import axios from "axios";
import Pagination from "./Pagination";


interface Shoe {
  _id?: string,
  img: string,
  title: string,
  brand: string,
  price: string,
  sizes: number[],
}


export default function ShoeGrid({ searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) 
{
  
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let query = searchParams?.query || '';


  useEffect(() => {
    const fetchData = async () => {
      if(query.length > 1)
      {
        try{
            const resp = await axios.get(`http://localhost:3000/api/search/shoe/${query}`);
            if(resp.data.message === "No such Shoe found!")
            {
              alert('No such Shoe found!');
             
            }
            else{
              setShoes(resp.data.shoes);
              setTotalPages(resp.data.totalPages);

            }
            
        }catch (error) {
          console.error("Error while searching for shoe data:", error);
        }
      }
      else
      {
        try {
          console.log(currentPage + " in resp");
          const resp = await axios.get(`http://localhost:3000/api/getAllShoes?page=${currentPage}`);
          console.log(resp.data);
          setShoes(resp.data.shoes);
          setTotalPages(resp.data.totalPages);
        } catch (error) {
          console.error("Error fetching shoe data:", error);
        }
      }
      
    };

    fetchData();
  }, [query, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(currentPage);
  };

  return (

    <>

<div className="grid grid-cols-5 m-14 mt-44">
      {
        
        (!shoes.length) ?
          <div className="flex flex-row justify-center items-center w-screen h-max">
            <div>
              <CircularProgress size={150} />
            </div>
          </div>
          :
          <>
            {
              shoes.map((shoe) => (
                <ShoeCard key={shoe._id} img={shoe.img} title={shoe.title} brand={shoe.brand} price={shoe.price} sizes={shoe.sizes}></ShoeCard>
              ))
            }
          </>
          
        }
    </div>
    {
      (query.length === 0) ? 
      <div className="flex justify-center">
    <div className="flex justify-center  p-2  my-4 mx-6 w-1/3">
            <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            />
            </div>
    </div>
    :
    <></>
    }
    
    
    </>
    
  )
}