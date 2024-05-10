import authorModel from '../models/author.js'
import folderModel from '../models/folder.js'
import noteModel from '../models/note.js'
import { PubSub } from 'graphql-subscriptions';
import notificationModel from '../models/notification.js';

const pubsub = new PubSub();

export const  resolvers = {
    Query: {
        folders: async (parent, args, context) => { 
            const folders = await folderModel.find({
                authorId : context.uid
            })
            return folders
        },
        folder: async (parent, args, context) => { 
            const folderId = args.folderId
            const folder = await folderModel.findOne({
                _id: folderId
            })
            return folder
        },
        note: async (parent, args) => {
            const note = await noteModel.findOne({
                _id: args.noteId
            })
            return note
        }

    },
    Mutation:{
        addNote : async (parent, args, context) => {
            console.log(parent, args, context)
            const newNote = new noteModel(args)
            await newNote.save()
            return newNote
        },
        updateNote : async (parent, args, context) => {
            const noteId = args.id
            const note = await noteModel.findByIdAndUpdate(noteId, args)
            return note
        },
        addFolder: async (parent, args, context) => {
            const newFolder = new folderModel({...args, authorId : context.uid})
            await newFolder.save()
            return newFolder
        },
        register: async (parent, args) => {
            const user = await authorModel.findOne({ uid : args.uid})
            if(!user){
                const newUser = new authorModel(args)
                await newUser.save()

                return newUser
            }else{
                return user
            }
        },
        pushNotification: async (parent, args) => {
          const newNotification = new notificationModel(args)
          pubsub.publish('PUSH_NOTIFICATION' , {
            notification: {
                message : args.content
            }
        }) // bắn sự kiện
          await newNotification.save()
          return { message :"SUCCESS"}
        },
    },
    Subscription:{
        notification:{
            subscribe: () => pubsub.asyncIterator(['PUSH_NOTIFICATION']) // CÓ THỂ LẮNG NGHE NHÌU SỰ KIỆN CÙNG LÚC NÊN DÙNG ARRAY
        }
    },
    Folder: {
        author: async (parent, args) =>{
            const author = await authorModel.findOne({ uid : parent.authorId})
            return author
        },
        notes : async (parent, args) =>{
            const folderId = String(parent._id)
            const notes = await noteModel.find({ folderId : folderId})
            return notes
        },
    }
}
