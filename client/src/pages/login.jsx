import React, { useContext, useEffect } from 'react'
import {Button, Typography} from '@mui/material'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { AuthContext } from '../context/AuthProvider'
import { Navigate, useNavigate } from 'react-router-dom'
import { graphqlRequest } from '../utils/request'

const Login = () => {
  const { user } = useContext(AuthContext)

  const handleLoginWithGoogle = async () =>{
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    const {user :{ uid, displayName}} =  await signInWithPopup(auth, provider)
    console.log('handleLoginWithGoogle--', user)
    const { data } = await graphqlRequest({
      query: ` mutation Register($uid: String!, $name: String!) {
        register(uid: $uid, name: $name) {
          uid
          name
        }
      }`, variables:{
        uid: uid,
        name: displayName
      }
    })
  }

  if(localStorage.getItem('accessToken')){
    return <Navigate to="/" />
  }
 
  return (
    <>
      <Typography sx={{marginBottom: "10px"}} variant='h5'>Welcome to note App</Typography>
    <Button variant='outlined' onClick={handleLoginWithGoogle}>Login with Google</Button>
    </>
  )
}

export default Login