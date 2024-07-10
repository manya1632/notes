import Note from "../models/NoteModel.js";

class NoteController {
    static createNote = async (req, res) => {
        const { title, content, tags } = req.body;

        if (!title) {
            return res.status(400).json({ msg: "Enter title" });
        }

        if (!content) {
            return res.status(400).json({ msg: "Enter content" });
        }

        try {
            const newNote = new Note({
                title: title,
                content: content,
                tags: tags || [],
                userId: req.user._id
            });

            await newNote.save();
            return res.status(201).json({
                msg: "Note saved successfully",
                note: newNote
            });

        } catch (error) {
            console.error("Error creating note:", error);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    }

    static editNote = async (req, res) => {
        const { title, content, tags, isPinned } = req.body;
        const { noteid } = req.params;

        try {
            const note = await Note.findOne({
                userId: req.user._id,
                _id: noteid
            });

            if (!note) {
                return res.status(404).json({ msg: "No such note exists" });
            }

            if (!title && !content && !tags && typeof isPinned === 'undefined') {
                return res.status(400).json({ msg: "There are no changes to be made" });
            }

            if (title) {
                note.title = title;
            }
            if (content) {
                note.content = content;
            }
            if (tags) {
                note.tags = tags;
            }
            if (typeof isPinned !== 'undefined') {
                note.isPinned = isPinned;
            }

            await note.save();

            return res.status(200).json({
                msg: "Changes to your note have been made",
                note
            });

        } catch (error) {
            console.error("Error editing note:", error);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    }

    static deleteNote = async (req, res) => {
        const { noteid } = req.params;

        try {
            const note = await Note.findOne({
                userId: req.user._id,
                _id: noteid
            });

            if (!note) {
                return res.status(404).json({ msg: "No such note exists" });
            }

            await Note.findByIdAndDelete(noteid);

            return res.status(200).json({ msg: "Note has been successfully deleted" });

        } catch (error) {
            console.error("Error deleting note:", error);
            return res.status(500).json({ msg: "Internal server error" });
        }
    }

    static updateIsPinned = async (req, res) => {
        const { noteid } = req.params;
    
        try {
            const note = await Note.findOne({
                _id: noteid,
                userId: req.user._id
            });
    
            if (!note) {
                return res.status(404).json({ msg: "No such note exists" });
            }
    
            
            note.isPinned = !note.isPinned;
            await note.save();
    
            return res.status(200).json({
                msg: "Is pinned has been successfully updated",
                note
            });
    
        } catch (error) {
            console.error("Error updating isPinned:", error);
            return res.status(500).json({ msg: "Internal server error" });
        }
    }
    

    static getNotes = async (req, res) => {
        try {
            const notes = await Note.find({
                userId: req.user._id
            });

            if (notes.length > 0) {
                return res.status(200).json({
                    msg: "All your notes have been fetched",
                    notes
                });
            } else {
                return res.status(404).json({ msg: "You don't have any notes" });
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
            return res.status(500).json({ msg: "Internal server error" });
        }
    }

    static searchNotes = async (req, res) => {
        const { query } = req.query;
      
        if (!query) {
          return res.status(400).json({
            error: true,
            msg: "Search query is required"
          });
        }
      
        try {
          const matchingNotes = await Note.find({
            userId: req.user._id,
            $or: [
              { title: { $regex: new RegExp(query, "i") } },
              { content: { $regex: new RegExp(query, "i") } },
              { tags: { $regex: new RegExp(query, "i") } }
            ]
          });
      
          return res.json({
            error: false,
            notes: matchingNotes,
            msg: "Notes matching the search query retrieved successfully"
          });
        } catch (error) {
          return res.status(500).json({
            error: true,
            msg: "Internal Server Error"
          });
        }
      }
}      
export default NoteController;
