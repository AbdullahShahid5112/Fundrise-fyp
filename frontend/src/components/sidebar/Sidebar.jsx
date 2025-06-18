
import React from 'react'
import { useState } from "react";
import { Menu } from "lucide-react"; // Optional: or use any hamburger icon
const Sidebar = () => {
 
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
<div className="flex h-screen">
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-4 md:hidden"
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:relative md:translate-x-0 md:block`}
      >
        <h2 className="text-lg font-semibold mb-6">Navigation</h2>
        <nav className="flex flex-col gap-2">
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">Company Info</a>
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">Pitch & Deal</a>
         <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">Images & Videos</a>
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">Documents</a>
        </nav>
      </div>

      
    </div>
  )
}

export default Sidebar;