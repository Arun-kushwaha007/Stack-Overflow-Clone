
import './App.css';
import Navbar from './Component/Navbar/navbar';
import { useEffect, useState } from 'react';

function App() {
  const [slideIn , SetslideIn] = useState(true);
  useEffect(() =>{
    if(window.innerWidth <= 768){
      SetslideIn(false)
    }
  },[])

  const handleSlideIn = ()=>{
    if(window.innerWidth <= 768){
      SetslideIn((state) => !state)
    }
  }

  return (
    <div className="App">
      <Navbar handleSlideIn={handleSlideIn}/>
    </div>
  );
}

export default App;
