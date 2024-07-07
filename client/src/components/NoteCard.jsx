import React from 'react';
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from 'react-icons/md';

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
  return (
    <div className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
      <div className='flex items-center justify-between'>
        <div>
          <h6 className='text-sm font-medium'>{title}</h6>
          <span className='text-xs text-slate-500'>{date}</span>
        </div>
        <MdOutlinePushPin
          className={`hover:text-sky-600 text-xl cursor-pointer ${isPinned ? 'text-sky-600' : 'text-slate-400'}`}
          onClick={onPinNote}
        />
      </div>
      <p className='text-xs text-slate-600 mt-2'>{content?.slice(0, 60)}</p>
      <div className='flex items-center justify-between mt-2'>
        <div className='text-xs text-slate-500'>{tags}</div>
        <div className='flex items-center gap-2'>
          <MdCreate className='hover:text-green-600 text-xl text-slate-300 cursor-pointer' onClick={onEdit} />
          <MdDelete className='hover:text-red-600 text-xl text-slate-300 cursor-pointer' onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
