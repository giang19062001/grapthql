import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import {CreateNewFolderTwoTone} from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { addNewNote } from '../utils/note'
const NewNote = () => {
    const [newNoteContent, setNewNoteContent] = useState('')
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const { folderId, noteId } = useParams()

    const handleNewNoteContentChange = (e) =>{
        setNewNoteContent(e.target.value)
    }
    const handleOpen = () =>{
        setOpen(true)
    }

    const handleClose = () =>{
        setOpen(false)
        setNewNoteContent('')
    }

    const handleAdd = async () =>{
         await addNewNote({content: newNoteContent, folderId: folderId})
        handleClose()
        if(noteId){
            navigate(`note/${noteId}`)
        }else{
            navigate(`/folders/${folderId}`)
        }
    }
  return (
    <div>
        <Tooltip title="Add note" onClick={handleOpen} >
            <IconButton>
                <CreateNewFolderTwoTone></CreateNewFolderTwoTone>
            </IconButton>
        </Tooltip>
        <Dialog open={open}>
            <DialogTitle>New note</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin='dense' id="content" fullWidth label="content" variant='standard' autoComplete='off' 
                value={newNoteContent} onChange={handleNewNoteContentChange}></TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancle</Button>
                <Button onClick={handleAdd}>Add</Button>

            </DialogActions>
        </Dialog>
    </div>
  )
}

export default NewNote