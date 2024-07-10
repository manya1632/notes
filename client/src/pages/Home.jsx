import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import moment from "moment";
import { MdAdd } from 'react-icons/md';
import AddEditNotes from '../components/AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import Toast from '../components/Toast';
import EmptyCard from '../components/EmptyCard';

const Home = () => {
  const [openEditAddModal, setOpenEditAddModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add"
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNote = async () => {
    try {
      const response = await axiosInstance.get("/api/user-note/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again");
    }
  };

  const handleEdit = (noteDetails) => {
    setOpenEditAddModal({
      isShown: true,
      data: noteDetails,
      type: "edit"
    });
  };

  const pinNoteHandler = async (data) => {
    const noteid = data._id;
    try {
      const response = await axiosInstance.put("/api/user-note/update-ispinned/" + noteid);

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        getAllNote();
      }
    } catch (error) {
      console.log("An unexpected error has occurred. Please try again.");
    }
  };

  const deleteNote = async (data) => {
    const noteid = data._id;

    try {
      const response = await axiosInstance.delete("/api/user-note/delete-note/" + noteid);

      if (response.data && response.data.msg) {
        showToastMessage("Note Deleted Successfully", "delete");
        setAllNotes(prevNotes => prevNotes.filter(note => note._id !== noteid));
      }
    } catch (error) {
      console.log("An unexpected error has occurred. Please try again.");
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/api/user-note/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      } else {
        setIsSearch(true);
        setAllNotes([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type
    });
  };

  useEffect(() => {
    getUserInfo();
    getAllNote();
  }, []);

  return (
    <>
      <NavBar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={getAllNote}
      />

      <div className='mt-8 p-4 md:p-5 lg:p-8'>
        {allNotes.length > 0 ? (
          <div className='grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3'>
            {allNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={moment(note.createdAt).format('DD MMM YYYY')}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => handleEdit(note)}
                onDelete={() => deleteNote(note)}
                onPinNote={() => pinNoteHandler(note)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            message={isSearch ? "Oops! No note found matching your search." : "Start creating your first note! Click the Add Button to place your ideas, thoughts, and reminders in one place."}
          />
        )}
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
        contentLabel=""
        className="w-[70%] md:w-[50%] lg:w-[40%] max-h-1/2 bg-white rounded-md mx-auto mt-24 p-5"
      >
        <AddEditNotes
          noteData={openEditAddModal.data}
          onClose={closeModal}
          type={openEditAddModal.type}
          getAllNote={getAllNote}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
