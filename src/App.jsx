import React from 'react'

import './app.css'
import NavBar from './components/Navbar/NavBar'
import Main from './components/Main/Main';

const App = () => {
  return (
    <div className='app'>
      <NavBar></NavBar>
      <Main/>
    </div>
  )
}

export default App