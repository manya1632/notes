import mongoose from "mongoose";

const connectDb = async (DB_URL) => {
    try {
        const DB_OPTION = {
            dbName : "notes-app",
        }
        await mongoose.connect(DB_URL,DB_OPTION);
        console.log("mongodb connected successfully")
    } catch (error) {
        console.log(error);
    }
}


export default connectDb;