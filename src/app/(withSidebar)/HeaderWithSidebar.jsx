"use client";
import React from 'react'
import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from '../components/Header';

const HeaderWithSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
        <header className="fixed top-0 left-0 w-full bg-white flex items-center p-3 border-b z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 cursor-pointer"
        >
          <Menu size={24} className="text-white" />
        </button>
      </header>
      <Header></Header>

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default HeaderWithSidebar
