import React from 'react';

const EmptyCard = ({ message }) => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <p className='w-1/3 text-sm font-medium text-slate-700 text-center leading-7 mb-40'>{message}</p>
    </div>
  );
};

export default EmptyCard;
