import express from "express";
const noteRouter =  express.Router();
import authenticateUser from "../middlewares/authenticateUser.js";
import NoteController from "../controllers/NoteController.js";

noteRouter.post("/create-note", authenticateUser, NoteController.createNote);
noteRouter.put("/edit-note/:noteid", authenticateUser, NoteController.editNote);
noteRouter.delete("/delete-note/:noteid", authenticateUser, NoteController.deleteNote);
noteRouter.put("/update-ispinned/:noteid", authenticateUser, NoteController.updateIsPinned)
noteRouter.get("/get-all-notes", authenticateUser, NoteController.getNotes);
noteRouter.get("/search-notes",authenticateUser,NoteController.searchNotes);

export default noteRouter