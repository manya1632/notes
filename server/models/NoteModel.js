import mongoose from "mongoose";

const NoteSchema =  mongoose.Schema({
    title : {type: String, required : true, trim :true},
    content :  {type: String, required : true, trim :true},
    tags :  {type: [String], default:[]},
    isPinned : {type :Boolean, default : false},
    userId : {type : String, required : true}
},{timestamps : true});

const Note = mongoose.model("note", NoteSchema);

export default Note