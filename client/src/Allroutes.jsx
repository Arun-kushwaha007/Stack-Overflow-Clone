import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Askquestion from './pages/Askquestion/Askquestion'
function Allroutes({slideIn,handleSlideIn}) {
  return (
    <Routes>
        <Route path='/' element={<Home slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
        <Route path='/Askquestion' element={<Askquestion />}/>
    </Routes>
  )
}

export default Allroutes