import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from '../components/AddEditNotes';
import Modal from 'react-modal';

const Home = () => {
  const [openEditAddModal, setOpenEditAddModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const openModal = (type, data) => {
    setOpenEditAddModal({
      isShown: true,
      type,
      data,
    });
  };

  const closeModal = () => {
    setOpenEditAddModal({
      isShown: false,
      type: 'add',
      data: null,
    });
  };

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Manya Gupta",
      date: "24th Aug 2023",
      content: "Meeting at 11.30 am with Mr. Jones",
      tags: "#meeting",
      isPinned: false
    },
    {
      id: 2,
      title: "John Doe",
      date: "25th Aug 2023",
      content: "Lunch at 1.00 pm with team",
      tags: "#lunch",
      isPinned: true
    }
  ]);

  const handlePinNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <>
      <NavBar />
      <div className='mx-5 my-12'>
        <div className='grid grid-cols-3 gap-4 mt-8'>
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              date={note.date}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              onEdit={() => openModal('edit', note)}
              onDelete={() => handleDeleteNote(note.id)}
              onPinNote={() => handlePinNote(note.id)}
            />
          ))}
        </div>
      </div>

      <button
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10 hover:scale-110 transition-all ease-in-out'
        onClick={() => openModal('add', null)}
      >
        <MdAdd className='text-[32px] text-white bg-transparent' />
      </button>

      <Modal
        isOpen={openEditAddModal.isShown}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
        contentLabel="Add or Edit Note"
        className="w-[70%] md:w-[50%] lg:w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-24 p-5 "
      >
        <AddEditNotes
          noteData={openEditAddModal.data}
          onClose={closeModal}
          type={openEditAddModal.type}
        />
      </Modal>
    </>
  );
};

export default Home;
