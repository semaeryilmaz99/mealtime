import React from 'react'
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import RightSidebar from './components/RightSidebar'

const App = () => {
  return (
    <div>
      <Navbar />
      <LeftSidebar />
      <RightSidebar />
      {/* Other content can go here */}
    </div>
  )
}

export default App
