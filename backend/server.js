import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { mockSessions, mockAnswers } from './mockData.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for sessions (using mock data as initial state)
let sessions = { ...mockSessions };
let sessionsList = Object.values(mockSessions).map(s => ({
  id: s.id,
  title: s.title,
  createdAt: s.createdAt
}));

// Routes

// 1. Start a new chat - Returns new session ID
app.post('/api/new-chat', (req, res) => {
  const sessionId = `session-${Date.now()}`;
  const newSession = {
    id: sessionId,
    title: `Chat ${new Date().toLocaleDateString()}`,
    createdAt: new Date().toISOString(),
    messages: []
  };
  
  sessions[sessionId] = newSession;
  sessionsList.push({
    id: sessionId,
    title: newSession.title,
    createdAt: newSession.createdAt
  });
  
  res.json({
    success: true,
    sessionId: sessionId,
    session: newSession
  });
});

// 2. Ask a question in a session - Returns dummy table + information
app.post('/api/ask', (req, res) => {
  const { sessionId, question } = req.body;
  
  if (!sessionId || !question) {
    return res.status(400).json({
      success: false,
      error: 'sessionId and question are required'
    });
  }
  
  if (!sessions[sessionId]) {
    return res.status(404).json({
      success: false,
      error: 'Session not found'
    });
  }
  
  // Add user message
  const userMessage = {
    id: uuidv4(),
    type: 'user',
    content: question,
    timestamp: new Date().toISOString()
  };
  
  sessions[sessionId].messages.push(userMessage);
  
  // Select random mock answer
  const randomAnswer = mockAnswers[Math.floor(Math.random() * mockAnswers.length)];
  
  // Generate new title from first question if it's the first message
  if (sessions[sessionId].messages.length === 1) {
    const titlePreview = question.substring(0, 40).trim();
    sessions[sessionId].title = titlePreview + (question.length > 40 ? '...' : '');
    
    // Update in sessionsList
    const sessionIndex = sessionsList.findIndex(s => s.id === sessionId);
    if (sessionIndex !== -1) {
      sessionsList[sessionIndex].title = sessions[sessionId].title;
    }
  }
  
  // Add assistant message with table data
  const assistantMessage = {
    id: uuidv4(),
    type: 'assistant',
    content: `Here's comprehensive information about your query: "${question}"`,
    timestamp: new Date().toISOString(),
    tableData: randomAnswer,
    feedback: null // null, 'like', or 'dislike'
  };
  
  sessions[sessionId].messages.push(assistantMessage);
  
  res.json({
    success: true,
    message: assistantMessage,
    sessionTitle: sessions[sessionId].title
  });
});

// 3. Fetch all sessions - Returns list of sessions with IDs/titles
app.get('/api/sessions', (req, res) => {
  const sortedSessions = [...sessionsList].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
  
  res.json({
    success: true,
    sessions: sortedSessions
  });
});

// 4. Fetch session history - Returns full chat history for a session
app.get('/api/session/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  
  if (!sessions[sessionId]) {
    return res.status(404).json({
      success: false,
      error: 'Session not found'
    });
  }
  
  res.json({
    success: true,
    session: sessions[sessionId]
  });
});

// 5. Update feedback for a message
app.post('/api/feedback', (req, res) => {
  const { sessionId, messageId, feedback } = req.body;
  
  if (!sessionId || !messageId || !feedback) {
    return res.status(400).json({
      success: false,
      error: 'sessionId, messageId, and feedback are required'
    });
  }
  
  if (!sessions[sessionId]) {
    return res.status(404).json({
      success: false,
      error: 'Session not found'
    });
  }
  
  const message = sessions[sessionId].messages.find(m => m.id === messageId);
  if (!message) {
    return res.status(404).json({
      success: false,
      error: 'Message not found'
    });
  }
  
  message.feedback = feedback;
  
  res.json({
    success: true,
    message: 'Feedback recorded'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Backend is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📍 API routes:`);
  console.log(`   POST   /api/new-chat - Start a new chat`);
  console.log(`   POST   /api/ask - Ask a question`);
  console.log(`   GET    /api/sessions - Get all sessions`);
  console.log(`   GET    /api/session/:sessionId - Get session history`);
  console.log(`   POST   /api/feedback - Submit feedback`);
  console.log(`   GET    /api/health - Health check`);
});
