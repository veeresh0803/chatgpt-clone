import React from 'react'
import { useTheme } from '@/context/ThemeContext'

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 flex-1 md:flex-none">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            ✨
          </div>
          <h1 className="text-lg font-bold hidden sm:inline">ChatGPT Clone</h1>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition"
          title="Toggle dark mode"
        >
          {isDark ? (
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414a1 1 0 00-1.414 1.414zm2.828-2.828l1.414-1.414a1 1 0 00-1.414-1.414l-1.414 1.414a1 1 0 001.414 1.414zm0-5.656l1.414 1.414a1 1 0 11-1.414 1.414l-1.414-1.414a1 1 0 111.414-1.414zM5.05 6.464L3.636 5.05a1 1 0 00-1.414 1.414l1.414 1.414a1 1 0 001.414-1.414zM5 3a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 110 2H5zm0 16a1 1 0 01-1-1v-2a1 1 0 112 0v2a1 1 0 01-1 1zM14 19a1 1 0 01-2 0v-2a1 1 0 112 0v2zM3 12a1 1 0 110 2H1a1 1 0 110-2h2zm16 0a1 1 0 110 2h-2a1 1 0 110-2h2z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
