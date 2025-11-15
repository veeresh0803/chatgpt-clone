import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://chatgpt-clone-g9ur.onrender.com/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

export const chatAPI = {
  // Start new chat session
  newChat: async () => {
    const response = await api.post('/new-chat')
    return response.data
  },

  // Ask a question in a session
  askQuestion: async (sessionId, question) => {
    const response = await api.post('/ask', {
      sessionId,
      question,
    })
    return response.data
  },

  // Get all sessions
  getSessions: async () => {
    const response = await api.get('/sessions')
    return response.data
  },

  // Get specific session history
  getSessionHistory: async (sessionId) => {
    const response = await api.get(`/session/${sessionId}`)
    return response.data
  },

  // Submit feedback for a message
  submitFeedback: async (sessionId, messageId, feedback) => {
    const response = await api.post('/feedback', {
      sessionId,
      messageId,
      feedback,
    })
    return response.data
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/health')
    return response.data
  },
}

export default api
