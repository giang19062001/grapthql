import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import {CreateNewFolderOutlined} from '@mui/icons-material'
import { addNewFolder } from '../utils/folders'
import { useNavigate } from 'react-router-dom'
const NewFolder = () => {
    const [newFolderName, setNewFolderName] = useState('')
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const handleNewFolderNameChange = (e) =>{
        setNewFolderName(e.target.value)
    }
    const handleOpen = () =>{
        setOpen(true)
    }

    const handleClose = () =>{
        setOpen(false)
        setNewFolderName('')
    }

    const handleAdd = async () =>{
        const { addFolder } = await addNewFolder({name: newFolderName})
        handleClose()
        navigate('/')
    }
  return (
    <div>
        <Tooltip title="Add folder" onClick={handleOpen} sx={{color:'white'}}>
            <IconButton>
                <CreateNewFolderOutlined></CreateNewFolderOutlined>
            </IconButton>
        </Tooltip>
        <Dialog open={open}>
            <DialogTitle>New folder</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin='dense' id="name" fullWidth label="name" variant='standard' autoComplete='off' 
                value={newFolderName} onChange={handleNewFolderNameChange}></TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancle</Button>
                <Button onClick={handleAdd}>Add</Button>

            </DialogActions>
        </Dialog>
    </div>
  )
}

export default NewFolder