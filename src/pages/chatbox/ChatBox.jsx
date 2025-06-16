import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Send, ExternalLink, Pencil, ChevronDown, MessageSquare, Clock, Menu, X, Trash2 } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ChatBox = () => {
  const [currentMessages, setCurrentMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [userData, setUserData] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null); // Tambahkan state ini

  // API base URL
  const API_BASE_URL = 'http://localhost:5000/api';

  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // Get user data from localStorage
  const getUserData = () => {
    try {
      const storedUserData = localStorage.getItem('userData');
      return storedUserData ? JSON.parse(storedUserData) : null;
    } catch (error) {
      console.error('Error parsing userData:', error);
      return null;
    }
  };

  // Fetch chat history dengan error handling yang lebih baik
  const fetchChatHistory = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.log('No auth token found');
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/chats/sessions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Filter sessions that have messages (have been interacted with)
      const sessionsWithMessages = response.data.sessions?.filter((session) => session.message_count > 0) || [];
      setChatHistory(sessionsWithMessages);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      setChatHistory([]);
    }
  };

  // Load specific chat session
  const loadChatSession = async (sessionId) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_BASE_URL}/chats/sessions/${sessionId}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCurrentSession({ id: sessionId });

      // Ensure all message data including ML results are properly loaded
      const messagesWithMLData = response.data.messages.map((msg) => ({
        ...msg,
        prediction: msg.predicted_class,
        recommendations: msg.recommendations,
        confidence: msg.stress_prediction,
      }));

      setCurrentMessages(messagesWithMLData);
      setHasInteracted(true);
      setIsSidebarOpen(false);
    } catch (error) {
      console.error('Error loading chat session:', error);
    }
  };

  // Initialize user data and session on component mount
  useEffect(() => {
    const user = getUserData();
    setUserData(user);
    fetchChatHistory();
    createNewSession();
  }, []);

  // Create new chat session
  const createNewSession = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.log('No auth token found');
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/chats/sessions`,
        {
          title: `Chat ${new Date().toLocaleDateString()}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCurrentSession(response.data.session);
      setHasInteracted(false); // Reset interaction flag for new session
      setCurrentMessages([
        {
          id: Date.now(),
          message: 'Hello! I am MindTrack AI, your personal mental health assistant. How are you feeling today?',
          is_bot: true,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error('Error creating session:', error);
      // Fallback for offline mode
      setCurrentSession({ id: 'offline' });
      setHasInteracted(false);
      setCurrentMessages([
        {
          id: Date.now(),
          message: 'Hello! I am MindTrack AI, your personal mental health assistant. How are you feeling today?',
          is_bot: true,
          created_at: new Date().toISOString(),
        },
      ]);
    }
  };

  // Send message with ML prediction
  const sendMessage = async () => {
    if (!inputMessage.trim() || !currentSession) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message immediately
    const newUserMessage = {
      id: Date.now(),
      message: userMessage,
      is_bot: false,
      created_at: new Date().toISOString(),
    };
    setCurrentMessages((prev) => [...prev, newUserMessage]);

    try {
      const token = getAuthToken();
      const response = await axios.post(
        `${API_BASE_URL}/chats/sessions/${currentSession.id}/messages`,
        { message: userMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Add bot response with ML results
      const botMessage = {
        id: response.data.botMessage.id,
        message: response.data.botMessage.message,
        is_bot: true,
        created_at: response.data.botMessage.created_at,
        prediction: response.data.mlResult?.prediction,
        recommendations: response.data.mlResult?.recommendations,
      };

      setCurrentMessages((prev) => [...prev, botMessage]);

      // Mark as interacted and refresh history only after first user message
      if (!hasInteracted) {
        setHasInteracted(true);
        fetchChatHistory(); // Refresh history to include this session
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Fallback response
      const fallbackResponse = {
        id: Date.now() + 1,
        message: 'Sorry, there was an error. Please try again.',
        is_bot: true,
        created_at: new Date().toISOString(),
      };
      setCurrentMessages((prev) => [...prev, fallbackResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Update createNewChat function
  const createNewChat = () => {
    createNewSession();
    setIsSidebarOpen(false);
  };

  // Add delete session function
  const deleteSession = async (sessionId, event) => {
    // Prevent triggering loadChatSession when clicking delete
    event.stopPropagation();

    if (!confirm('Apakah Anda yakin ingin menghapus chat ini?')) {
      return;
    }

    setIsDeleting(sessionId);

    try {
      const token = getAuthToken();
      await axios.delete(`${API_BASE_URL}/chats/sessions/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove from chat history
      setChatHistory((prev) => prev.filter((session) => session.id !== sessionId));

      // If deleted session is current session, create new session
      if (currentSession?.id === sessionId) {
        createNewSession();
      }

      console.log('Chat session deleted successfully');
    } catch (error) {
      console.error('Error deleting chat session:', error);
      alert('Gagal menghapus chat. Silakan coba lagi.');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col">
      {/* Sembunyikan menu hamburger navbar dengan prop khusus */}
      <Navbar variant="dark" userData={userData} hideHamburger={true} />

      {/* Mobile Header dengan Menu Button */}
      <div className="sm:hidden bg-white shadow-sm border-b px-4 py-3 mt-20 flex items-center justify-between">
        <h1 className="font-semibold text-gray-800">MindTrack Chat</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100">
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Main Container */}
      <div className="flex flex-1 w-full max-w-7xl mx-auto gap-0 sm:gap-4 lg:gap-6 px-0 sm:px-4 md:px-6 lg:px-8 py-0 sm:py-4 mt-0 sm:mt-20">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && <div className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)} />}

        {/* Chat Area - Full width on mobile */}
        <div className="flex-1 flex flex-col bg-white rounded-none sm:rounded-2xl lg:rounded-[2.5rem] shadow-none sm:shadow-xl p-4 md:p-6 lg:p-10 min-h-[calc(100vh-80px)] sm:min-h-[500px] lg:min-h-[600px] border-0 sm:border border-blue-50">
          {/* Chat Messages - Scrollable */}
          <div className="flex flex-col gap-4 lg:gap-8 mb-6 lg:mb-10 overflow-y-auto flex-1 pr-2">
            {currentMessages.map((chat, index) => (
              <div key={index} className={`flex items-start gap-2 lg:gap-3 ${chat.is_bot ? '' : 'justify-end'}`}>
                {chat.is_bot && <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-900 text-sm lg:text-base mt-1 shadow-sm flex-shrink-0">MT</div>}
                <div
                  className={`px-4 lg:px-7 py-3 lg:py-4 rounded-2xl lg:rounded-3xl ${
                    chat.is_bot ? 'bg-[#f5f7fa] text-gray-700 rounded-tl-lg' : 'bg-blue-700 text-white rounded-tr-lg'
                  } max-w-[85%] lg:max-w-[70%] shadow transition-all duration-200 text-sm lg:text-base`}
                >
                  {chat.message}

                  {/* Show prediction and recommendations for bot messages */}
                  {chat.is_bot && (chat.prediction || chat.predicted_class) && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-xs lg:text-sm font-semibold text-blue-800 mb-2">Analysis: {chat.prediction || chat.predicted_class}</div>
                      {chat.recommendations && chat.recommendations.length > 0 && (
                        <div>
                          <div className="text-xs font-medium text-blue-700 mb-1">Recommendations:</div>
                          <ul className="text-xs text-blue-600 space-y-1">
                            {chat.recommendations.slice(0, 30).map((rec, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="inline-block w-1 h-1 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <span className="text-xs text-gray-400 ml-2">{new Date(chat.created_at).toLocaleTimeString()}</span>
                </div>
                {/* Removed user avatar - only show MT avatar for bot */}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-2 lg:gap-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-900 text-sm lg:text-base mt-1 shadow-sm">MT</div>
                <div className="bg-[#f5f7fa] px-4 lg:px-7 py-3 lg:py-4 rounded-2xl lg:rounded-3xl rounded-tl-lg text-gray-700 max-w-[85%] lg:max-w-[70%] shadow transition-all duration-200 text-sm lg:text-base">Typing...</div>
              </div>
            )}
          </div>

          {/* Input Area - Simplified */}
          <div className="mt-auto pt-4">
            <div className="flex items-center gap-3 bg-white border border-blue-100 rounded-xl lg:rounded-2xl px-4 lg:px-6 py-3 lg:py-4 shadow transition-all duration-200 focus-within:shadow-lg">
              <input
                type="text"
                placeholder="Message to Mindtrack..."
                className="flex-1 bg-transparent outline-none text-sm lg:text-base text-gray-700"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-[#6C63FF] hover:bg-[#5548c8] text-white px-4 lg:px-6 py-2 rounded-full flex items-center gap-2 font-semibold text-sm lg:text-base transition shadow disabled:opacity-50"
              >
                Send <Send className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar - Hidden on mobile, slide-in overlay */}
        <aside
          className={`
          fixed sm:relative top-0 right-0 h-full sm:h-auto
          w-80 sm:w-80 lg:w-[340px] 
          bg-white sm:bg-transparent
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full sm:translate-x-0'}
          z-50 sm:z-auto
          flex flex-col gap-4 lg:gap-6 p-4 sm:p-0
          shadow-xl sm:shadow-none
          mt-0 sm:mt-0
        `}
        >
          {/* Mobile Close Button */}
          <div className="sm:hidden flex justify-between items-center pb-4 border-b">
            <h2 className="font-semibold text-gray-800">Menu</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MindTrack AI Info Card */}
          <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white mb-3">
                <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-900 text-base lg:text-lg">MindTrack AI</div>
                <div className="text-xs lg:text-sm text-gray-500">Personal Mental Health Assistant</div>
              </div>
            </div>
          </div>

          {/* Chat History - Scrollable */}
          <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6 flex-1 min-h-0">
            <div className="font-semibold text-blue-900 mb-4 text-sm lg:text-base flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Chat History
            </div>

            {/* Scrollable History Container */}
            <div className="space-y-2 max-h-48 lg:max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-gray-100">
              {chatHistory.length > 0 ? (
                chatHistory.map((session) => (
                  <div
                    key={session.id}
                    className={`relative group w-full text-left p-3 rounded-lg hover:bg-blue-50 transition-colors ${currentSession?.id === session.id ? 'bg-blue-100 border border-blue-200' : 'border border-gray-100 hover:border-blue-200'}`}
                  >
                    <button onClick={() => loadChatSession(session.id)} className="w-full text-left" disabled={isDeleting === session.id}>
                      <div className="font-medium text-gray-800 text-xs lg:text-sm truncate pr-8">{session.title || `Chat ${new Date(session.created_at).toLocaleDateString()}`}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(session.created_at).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={(e) => deleteSession(session.id, e)}
                      disabled={isDeleting === session.id}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-100 text-red-500 hover:text-red-700"
                      title="Hapus chat"
                    >
                      {isDeleting === session.id ? <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-xs lg:text-sm text-gray-500 text-center py-4">No chat history yet</div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6">
            <div className="font-semibold text-blue-900 mb-4 text-sm lg:text-base flex items-center gap-2">
              Quick Actions
              <ChevronDown className="w-4 h-4 text-blue-400" />
            </div>

            <div className="space-y-2">
              <button onClick={createNewChat} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 text-left group">
                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Pencil className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800 text-xs lg:text-sm">New Chat</div>
                  <div className="text-xs text-gray-500">Start fresh conversation</div>
                </div>
              </button>

              <Link to="/journal" className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 text-left group">
                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800 text-xs lg:text-sm">Journal</div>
                  <div className="text-xs text-gray-500">Write your thoughts</div>
                </div>
              </Link>

              <Link to="/dashboard" className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 text-left group">
                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800 text-xs lg:text-sm">Dashboard</div>
                  <div className="text-xs text-gray-500">View your progress</div>
                </div>
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer - Hidden on mobile */}
      <div className="hidden sm:block">
        <Footer />
      </div>
    </div>
  );
};

export default ChatBox;
