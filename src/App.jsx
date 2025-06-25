import React from 'react'
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import RightSidebar from './components/RightSidebar'
import { Outlet } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'
import { ModalProvider } from './context/ModalContext'

const AppContent = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop />
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <main className="flex-1 pt-16 md:ml-64 md:mr-80 mobile-main-content">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
        <RightSidebar />
      </div>
      <ScrollToTopButton />
    </div>
  )
}

const App = () => {
  return (
    <ModalProvider>
      <AppContent />
    </ModalProvider>
  )
}

export default App
