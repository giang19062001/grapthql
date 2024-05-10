import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Avatar, Box, Button, Typography } from '@mui/material'

const UserMenu = () => {
    const { user : { auth, photoURL, displayName}} = useContext(AuthContext)

    const handleLogout = async () =>{
        auth.signOut() // hàm có sẳn của firebase
    }
  return (
    <Box sx={{ display :'flex', justifyContent:'center', alignItems:'center', gap:3}}>
        <Avatar src={photoURL}></Avatar>
        <Typography>{displayName}</Typography>
        <Button variant='outlined' color='error' onClick={handleLogout}>Logout</Button>
    </Box>
  )
}

export default UserMenu