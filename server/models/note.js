import mongoose from 'mongoose';
const noteSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    folderId: {
        type: String,
        require: true,
    },
},
{ timestamps: true })

const noteModel = mongoose.model('Note', noteSchema);
export default noteModel