import { Button } from '@mui/material'
import React from 'react'
import { pushNotification } from '../utils/notification'

const PushNoti = () => {
    const  handlePush = async () =>{
        await pushNotification()
    }
  return (
    <Button onClick={handlePush} variant='contained'>Push</Button>
  )
}

export default PushNoti