
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

  return (
    <div >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-2 bg-gray-300 rounded"
      >
        Previous
      </button>
      <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span> 
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-2 bg-gray-300 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;





// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';
// import { usePathname, useSearchParams } from 'next/navigation';
// import Link from 'next/link';

// export default function Pagination({ totalPages }: { totalPages: number }) {

//     const pathname = usePathname();
//     const searchParams = useSearchParams();
//     const currentPage = Number(searchParams.get('page')) || 1;

//     const createPageURL = (pageNumber: number | string) => {
//         const params = new URLSearchParams(searchParams);
//         params.set('page', pageNumber.toString());
//         return `${pathname}?${params.toString()}`;
//       };
    
//   return (
//     <div className="mt-5 flex w-full justify-center">
//         <button><ArrowLeftIcon fontSize='large'/></button>
//         <button><ArrowRightIcon fontSize='large'/></button>
//         </div>
//   )
// }
