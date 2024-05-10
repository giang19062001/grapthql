import { graphqlRequest } from "./request"

export const notesLoader = async ({ params: { folderId } }) => {
  const query = `query Folder($folderId: String) {
      folder(folderId: $folderId) {
        id
        name
        notes {
          content
          id
        }
      }
    }    
    `
  const data = await graphqlRequest({ query, variables: { folderId: folderId } })
  return data
}

export const noteLoader = async ({ params: { noteId } }) => {
  const query = `query Note($noteId: String) {
        note(noteId: $noteId) {
          id
          content
        }
      }   
    `

  const data = await graphqlRequest({ query, variables: { noteId: noteId } })
  return data
}


export const addNewNote = async (newNote) => {
  const query = `mutation AddNote($content: String!, $folderId: ID!) {
    addNote(content: $content, folderId: $folderId) {
      content
    }
  }
  `
  const data = await graphqlRequest({query, variables:{content: newNote.content, folderId: newNote.folderId}})
  return data
}



export const updateNote = async (note) => {
  const query = `mutation UpdateNote($id: String, $content: String) {
    updateNote(id: $id, content: $content) {
      content
    }
  }
  `
  const data = await graphqlRequest({query, variables:{content: note.content, id: note.id}})
  return data
}

