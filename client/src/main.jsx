import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from 'react-router-dom'
import router from './router/index.jsx'
import { Container } from '@mui/material'
import './firebase/config.jsx'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Container maxWidth='lg' sx={{textAlign:"center", marginTop:'50px'}}>
    <RouterProvider router={router}></RouterProvider>

    </Container>
  // </React.StrictMode>,
)
