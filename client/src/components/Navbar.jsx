import React from 'react';
import { useLocation } from 'react-router-dom';
import ProfileInfo from './ProfileInfo';

const Navbar = () => {
  const location = useLocation();
  const fullName = "Manya Gupta";

  const hideProfileInfo = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className='fixed top-0 z-10 bg-white w-full h-16 flex items-center justify-between text-black border-b-2 px-4 md:px-8'>
      <div className='text-stone-800 font-medium'>Notes App</div>
      {!hideProfileInfo && <ProfileInfo name={fullName} />}
    </div>
  );
}

export default Navbar;
