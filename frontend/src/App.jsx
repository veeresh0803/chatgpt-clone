import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import TableView from '@/components/TableView'
import axios from 'axios'

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [sessions, setSessions] = useState([])
  const [currentSessionId, setCurrentSessionId] = useState(null)
  const [messages, setMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [tableData, setTableData] = useState(null)

  const API_BASE = 'http://localhost:5000/api'

  // Fetch sessions on mount
  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      const res = await axios.get(`${API_BASE}/sessions`)
      setSessions(res.data.sessions || [])
    } catch (err) {
      console.error('Failed to fetch sessions:', err)
    }
  }

  const handleNewChat = async () => {
    try {
      const res = await axios.post(`${API_BASE}/new-chat`)
      const sessionId = res.data.sessionId
      setCurrentSessionId(sessionId)
      setMessages([])
      setTableData(null)
      fetchSessions()
    } catch (err) {
      console.error('Failed to create new chat:', err)
    }
  }

  const handleSelectSession = async (sessionId) => {
    try {
      const res = await axios.get(`${API_BASE}/session/${sessionId}`)
      setCurrentSessionId(sessionId)
      setMessages(res.data.session.messages || [])
      // Set tableData from the last assistant message if available
      const lastAssistantMsg = res.data.session.messages.find(
        (m) => m.type === 'assistant' && m.tableData
      )
      setTableData(lastAssistantMsg?.tableData || null)
    } catch (err) {
      console.error('Failed to fetch session:', err)
    }
  }

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || !currentSessionId || isLoading) return

    try {
      setIsLoading(true)
      const res = await axios.post(`${API_BASE}/ask`, {
        sessionId: currentSessionId,
        question: currentMessage,
      })
      const assistantMsg = res.data.message
      setMessages([...messages, assistantMsg])
      setTableData(assistantMsg.tableData || null)
      setCurrentMessage('')
      fetchSessions()
    } catch (err) {
      console.error('Failed to send message:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSelectSession={handleSelectSession}
          onNewChat={handleNewChat}
        />
        <main className="flex-1 flex flex-col p-4 overflow-auto">
          {!currentSessionId ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Start a new chat to begin
                </p>
                <button
                  onClick={handleNewChat}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  New Chat
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {tableData && <TableView data={tableData} />}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask something..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !currentMessage.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
                >
                  {isLoading ? 'Sending...' : 'Send'}
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
