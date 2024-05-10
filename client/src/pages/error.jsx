import React from 'react'
import {useRouteError} from "react-router-dom"

const Error = () => {
    const error = useRouteError()
    console.error(error)
  return (
    <h1>Oops!!</h1>
  )
}

export default Error