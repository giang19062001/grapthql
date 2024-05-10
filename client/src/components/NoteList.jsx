import { Card, CardContent, List, Grid, Typography, Box  } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLoaderData, useNavigate, useParams } from "react-router-dom";
import NewNote from "./NewNote";

const NoteList = () => {
  const { noteId } = useParams()
  const [activeNoteId, setActiveNoteId] = useState(noteId)
  const navigate = useNavigate()


  const { folder }  = useLoaderData() 

  useEffect(()=>{
    if(noteId){
      setActiveNoteId(noteId)
      return
    }
    if(folder?.notes?.[0]){
      navigate(`note/${folder.notes[0].id}`)
    }
  },[noteId,folder.notes])

  //dangerouslySetInnerHTML hiển thị nội dung của thẻ html
  return (
    <Grid container height="100%">
      <Grid item xs={4} sx={{width:'100%', maxWidth: 360, bgcolor:"#F0EBE3", borderRadius:1}}>
        <List
          sx={{
            width: "100%",
            height: "100%",
            padding: "10px",
            textAlign: "left",
            overflowY: "auto",
          }}
          subheader={
            <Box sx={{display:"flex", alignItems:'center', justifyContent:'space-between'}}>
            <Typography sx={{fontWeight:'bold'}}>Notes</Typography>
            <NewNote></NewNote>
           </Box>
        }
        >
          {folder.notes.map(({ id, content }) => {
            return (
              <Link
                key={id}
                to={`note/${id}`}
                style={{ textDecoration: "none" }}
                onClick={()=>setActiveNoteId(id)}
              >
                <Card sx={{ mb: "5px" }}>
                  <CardContent sx={{ padding: "10px", fontWeight:"600", backgroundColor: id == activeNoteId ? 'skyblue' : ''}}>
                    <div
                      style={{ fontSize: "14px" }}
                      dangerouslySetInnerHTML={{
                        __html: `${(content.substring(0, 20) + (content.length > 20 ?  "..." :"")) || "Empty"}`,
                      }}
                    ></div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={8}>
                 <Outlet/>
        </Grid>
    </Grid>
  );
};

export default NoteList;
