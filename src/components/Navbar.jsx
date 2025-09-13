import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-center shadow-md">
      <div className="flex gap-10 text-lg font-semibold">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-yellow-400 transition ${
              isActive ? "text-yellow-400 border-b-2 border-yellow-400 pb-1" : ""
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            `hover:text-yellow-400 transition ${
              isActive ? "text-yellow-400 border-b-2 border-yellow-400 pb-1" : ""
            }`
          }
        >
          Paste
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
