'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchValue,setSearchValue] = useState("");

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }


  return (
    <div className='max-w-md mx-auto'>
    <div className="relative flex items-center w-full h-9 rounded focus-within:shadow-lg bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#333333">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

        <input
        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
        type="text"
        id="search"
        placeholder="Search" 
        onChange={(event) => {setSearchValue(event.target.value)}}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSearch(searchValue);
          }
        }}
        defaultValue={searchParams.get('query')?.toString()}/> 
    </div>
</div>
  )
}

export default SearchBar