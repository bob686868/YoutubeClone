'use client';
import { useState } from 'react';
import { Home, Compass, PlaySquare, Clock, ThumbsUp, History, Library, Settings, HelpCircle, Flag, MessageSquare, Menu } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            {/* Toggle Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 p-2 rounded-full hover:bg-gray-100"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Sidebar */}
            <div 
                className={`fixed top-0 left-0 h-screen bg-white border-r transition-all duration-300 ease-in-out ${
                    isOpen ? 'w-64' : 'w-20'
                }`}
            >
                <div className="p-4 pt-16">
                    <div className="space-y-4">
                        {/* Main Section */}
                        <div className="space-y-2">
                            <Link href="/" className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
                                <Home className="w-6 h-6" />
                                {isOpen && <span>Home</span>}
                            </Link>
                            <Link href="/explore" className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
                                <Compass className="w-6 h-6" />
                                {isOpen && <span>Explore</span>}
                            </Link>
                            <Link href="/shorts" className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
                                <PlaySquare className="w-6 h-6" />
                                {isOpen && <span>Shorts</span>}
                            </Link>
                            <Link href="/subscriptions" className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
                                <Library className="w-6 h-6" />
                                {isOpen && <span>Subscriptions</span>}
                            </Link>
                        </div>

                        {/* Library Section */}
                        <div className="space-y-2">
                            {isOpen && <h3 className="px-2 text-sm font-semibold text-gray-500">Library</h3>}
                            <Link href="/history" className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
                                <History className="w-6 h-6" />
                                {isOpen && <span>History</span>}
                            </Link>
                            <Link href="/watch-later" className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
                                <Clock className="w-6 h-6" />
                                {isOpen && <span>Watch later</span>}
                            </Link>
                            <Link href="/liked-videos" className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
                                <ThumbsUp className="w-6 h-6" />
                                {isOpen && <span>Liked videos</span>}
                            </Link>
                        </div>

                        {/* Settings Section */}
                        <div className="space-y-2">
                            {isOpen && <h3 className="px-2 text-sm font-semibold text-gray-500">Settings</h3>}
                            <Link href="/settings" className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
                                <Settings className="w-6 h-6" />
                                {isOpen && <span>Settings</span>}
                            </Link>
                            <Link href="/help" className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
                                <HelpCircle className="w-6 h-6" />
                                {isOpen && <span>Help</span>}
                            </Link>
                            <Link href="/feedback" className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
                                <MessageSquare className="w-6 h-6" />
                                {isOpen && <span>Send feedback</span>}
                            </Link>
                            <Link href="/report" className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
                                <Flag className="w-6 h-6" />
                                {isOpen && <span>Report</span>}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 