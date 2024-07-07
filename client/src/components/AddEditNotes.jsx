import React, { useState, useEffect } from 'react';
import TagInput from './TagInput';
import { MdClose } from 'react-icons/md';

const AddEditNotes = ({ noteData, onClose, type }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);


  const addNewNote = async () => {
    // Logic to add a new note
  };

  const editNote = async () => {
    // Logic to edit an existing note
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
        ADD
      </button>
    </div>
  );
};

export default AddEditNotes;
