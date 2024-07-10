import React from 'react';
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className='flex items-center w-44 md:w-72 x:w-80 px-4 rounded-md m-2 bg-slate-100'>
      <input
        type="text"
        placeholder='Search Notes'
        value={value}
        onChange={(e) => onChange(e.target.value)} 
        className='w-full text-sm bg-transparent py-[11px] outline-none'
      />
      {value && (
        <IoMdClose size={22} className='text-xl text-slate-500 cursor-pointer hover:text-black mr-3' onClick={onClearSearch} />
      )}
      <FaSearch size={22} className="text-slate-400 cursor-pointer hover:text-black" onClick={handleSearch} />
    </div>
  );
};

export default SearchBar;
