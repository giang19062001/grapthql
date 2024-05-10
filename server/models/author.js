import mongoose from 'mongoose';
const authorSchema = new mongoose.Schema({
    uid: {
        type: String,
    },
    name: {
        type: String,
    },
},
{ timestamps: true })

const authorModel = mongoose.model('Author', authorSchema);
export default authorModel