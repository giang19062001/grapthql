import React, { createContext, useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

export const AuthContext = createContext()
const AuthProvider = ({ children}) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState({})
    const auth = getAuth()

    useEffect(() =>{
        const unsubscribed = auth.onIdTokenChanged((user) => {
                if(user?.uid){
                    setUser(user)
                    if(user.accessToken !== localStorage.getItem('accessToken')){
                        localStorage.setItem('accessToken', user.accessToken)
                        window.location.reload()
                    }
                    setIsLoading(false)
                    return
                }
                //reset if logout
                setUser({})
                setIsLoading(false)
                localStorage.clear()
                navigate('/login')
            })

            return (() =>{
                unsubscribed()
            })
    },[auth])

  return (
    
    <AuthContext.Provider value={{user, setUser}}>
        {isLoading ? <CircularProgress></CircularProgress> :children}
    </AuthContext.Provider>
  )
}

export default AuthProvider