import React, { useState, useEffect } from 'react';
import TagInput from './TagInput';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../utils/axiosInstance';

const AddEditNotes = ({ noteData, onClose, type, getAllNote ,showToastMessage}) => {
  const [title, setTitle] = useState(noteData?.title|| "");
  const [content, setContent] = useState(noteData?.content|| "");
  const [tags, setTags] = useState(noteData?.tags|| []);
  const [error, setError] = useState(null);


  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/api/user-note/create-note", {
        title ,
        content, 
        tags
      })

      if(response.data && response.data.note) {
        showToastMessage("Note Added Successfully")
        getAllNote()
        onClose()
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.msg){
        setError(error.response.data.msg);
      }
    }
  };

  const editNote = async () => {
    const noteid = noteData._id;
    try {
      const response = await axiosInstance.put("/api/user-note/edit-note/"+noteid, {
        title ,
        content, 
        tags
      })

      if(response.data && response.data.note) {
        
        showToastMessage("Note Updated Successfully")
        getAllNote()
        onClose()
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.msg){
        setError(error.response.data.msg);
      }
    }
  };

  

  const handleOnAddNote = () => {
    if (!title) {
      setError('Please enter the title');
      return;
    }

    if (!content) {
      setError('Please enter the content');
      return;
    }

    setError('');

    if (type === 'edit') {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <label className="text-xs text-slate-400">TITLE</label>
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center"
          onClick={onClose}
        >
          <MdClose className="text-xl text-slate-400 hover:text-red-600 hover:scale-110 transition-all ease-in-out" />
        </button>
      </div>
      <input
        type="text"
        className="text-2xl text-slate-950 outline-none mb-4 p-2 border border-gray-300 rounded"
        placeholder="Go to gym at 5"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-xs text-slate-400">CONTENT</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={10}
          className="text-sm text-slate-950 p-2 rounded bg-slate-50 outline-none border border-gray-300"
        />
      </div>
      <div className="mb-4">
        <label className="text-xs text-slate-400">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-xs text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleOnAddNote}
        className="font-medium p-3 w-full text-sm text-white my-1 hover:bg-blue-600 bg-blue-500 rounded"
      >
        {type==="edit" ? "UPDATE"  : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
