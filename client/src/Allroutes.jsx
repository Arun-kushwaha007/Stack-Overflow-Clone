import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Askquestion from './pages/Askquestion/Askquestion'
import Auth from './pages/Auth/Auth'
function Allroutes({slideIn,handleSlideIn}) {
  return (
    <Routes>
        <Route path='/' element={<Home slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
        <Route path='/Askquestion' element={<Askquestion />}/>
        <Route path='/Auth' element={<Auth />}/>
    </Routes>
  )
}

export default Allroutes