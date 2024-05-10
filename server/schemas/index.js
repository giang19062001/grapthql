export const typeDefs =`#graphql
type Folder{
    id: String,
    name: String,
    createAt: String,
    author: Author,
    notes: [Note]
}
type Note {
    id: String!,
    content: String!
}
type Author {
    uid: String!,
    name: String!
}
type Query {
    folders: [Folder],
    folder(folderId: String): Folder,
    note(noteId: String): Note
} 
type Mutation{
    addNote(content: String, folderId: ID) : Note,
    updateNote(content: String, id: String) : Note,
    addFolder(name: String) : Folder,
    register(uid: String, name: String!): Author,
    pushNotification(content: String): Message
}

type Subscription{
    notification: Message
}

type Message {
    message : String
}`


// có thể tự định nghĩa type cho graphql giống như type Message
