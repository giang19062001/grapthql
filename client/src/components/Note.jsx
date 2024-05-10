import React, { useEffect, useMemo, useState } from 'react'
import {ContentState, EditorState, convertFromHTML, convertToRaw} from'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml  from 'draftjs-to-html'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { debounce } from '@mui/material'
import { updateNote } from '../utils/note'

const Note = () => {
  const navigate = useNavigate()

  const { note }  = useLoaderData() 
  const { folderId } = useParams()

  const [editorState, setEditorState] = useState(() =>{
    EditorState.createEmpty()
  })

  const [rawHtml, setRawHtml] = useState(note.content)


  useEffect(()=>{
   const blocksFromHTML = convertFromHTML(note.content)
   const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks, blocksFromHTML.entityMap
   )
   setEditorState(EditorState.createWithContent(state))
  },[note.content])

    //debounce sẽ deplay 1 giây và loại bỏ các even trước đó trong quá trình nhập text

    useEffect(()=>{
      debounceMemorized(rawHtml, note)
    },[rawHtml])

    const debounceMemorized = useMemo(()=>{
      return debounce(async (rawHtml, note)=>{
        if(rawHtml === note.content) return 
        const data = await updateNote({id: note.id, content: rawHtml})
        if(data){
          navigate(`/folders/${folderId}/note/${note.id}`)
        }

      },500)
    },[])
//

  useEffect(()=>{
    setRawHtml(note.content)
  },[note.content])

  const handleChange = (e) =>{
    setEditorState(e)
    setRawHtml(draftToHtml(convertToRaw(e.getCurrentContent())))
  }
  return (
   <Editor editorState={editorState} onEditorStateChange={handleChange} placeholder='write something~~'>


   </Editor>

  )
}

export default Note