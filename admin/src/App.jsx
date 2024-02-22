import React from 'react'
import { Navbar } from './Components/Navbar/Navbar'
import { Sidebar } from './Components/Navbar/Sidebar/Sidebar'
import { Admin } from './Pages/Admin/Admin'

export const App = () => {
  return (
    <div>
      <Navbar />
      <Admin />
    </div>
  )
}
