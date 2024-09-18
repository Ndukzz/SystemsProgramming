import { useState } from 'react'
import FileInputComponent from './LoadFile'
import './App.css'
import LoadSearchFile from './LoadSearchFile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <FileInputComponent />
    </>
  )
}

export default App
