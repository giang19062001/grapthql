import { Box, Card, CardContent, List, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import NewFolder from './NewFolder'

const FolderList = ({folders}) => {
    const { folderId } = useParams()
    const [activeFolderId, setActiveFolderId] = useState(folderId)


  return (
   <List sx={{
    width: '100%',
    height: '100%',
    padding: '10px',
    textAlign:'left',
    overflowY: 'auto',
    bgcolor:'#7D9D9C',
    borderRadius:1
   }}
   subheader={
    <Box sx={{display:"flex", alignItems:'center', justifyContent:'space-between'}}>
     <Typography sx={{fontWeight:'bold', color:'white'}}>Folders</Typography>
     <NewFolder></NewFolder>
    </Box>
   }
   >
        {
            folders.map(({id, name})=>{
                return (
                    <Link
                    key={id}
                    to={`/folders/${id}`}
                    style={{textDecoration:'none'}}
                    onClick={()=>setActiveFolderId(id)}
                    >
                        <Card sx={{mb:'5px',backgroundColor: id == activeFolderId ? 'skyblue' : ''}}>
                            <CardContent sx={{padding:'10px'}}>
                                <Typography  sx={{fontWeight:'600'}}>{name}</Typography>
                            </CardContent>
                        </Card>
                    </Link>
                )
            })
        }

   </List>
  )
}

export default FolderList