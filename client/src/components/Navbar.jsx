import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from './ProfileInfo';
import SearchBar from './SearchBar';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearchNote(searchQuery.trim());
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className='fixed top-0 z-10 bg-white w-full h-16 flex items-center justify-between text-black border-b-2 px-4 md:px-8'>
      <div className='text-stone-800 font-medium'>NoteSync</div>
      {userInfo && (
        <>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
          <ProfileInfo 
            userInfo={userInfo}
            onLogout={onLogout} 
          />
        </>
      )}
    </div>
  );
};

export default Navbar;
