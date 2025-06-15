import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Send, MoreVertical, ExternalLink, Paperclip, Smile, Mic, Pencil, Trash2, ChevronDown } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import logo2 from '../../assets/images/Logo-cropped.png';

const ChatBox = () => {
  const [currentMessages, setCurrentMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);

  // API base URL
  const API_BASE_URL = 'http://localhost:5000/api';

  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // Create new chat session
  const createNewSession = async () => {
    try {
      const token = getAuthToken();
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
      setCurrentMessages([
        {
          id: Date.now(),
          message: 'Halo! Saya MindTrack AI, asisten kesehatan mental pribadi Anda. Bagaimana perasaan Anda hari ini?',
          is_bot: true,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error('Error creating session:', error);
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
        prediction: response.data.mlResult.prediction,
        recommendations: response.data.mlResult.recommendations,
      };

      setCurrentMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Fallback response
      const fallbackResponse = {
        id: Date.now() + 1,
        message: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
        is_bot: true,
        created_at: new Date().toISOString(),
      };
      setCurrentMessages((prev) => [...prev, fallbackResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize session on component mount
  useEffect(() => {
    createNewSession();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Update createNewChat function
  const createNewChat = () => {
    createNewSession();
  };

  return (
    <div className="mt-20 min-h-screen bg-[#fafbfc] flex flex-col">
      <Navbar variant="dark" userData={userData} />
      <div className="flex flex-1 w-full max-w-[1600px] mx-auto mt-10 gap-6 px-4 md:px-8 pb-8 pt-4">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white rounded-[2.5rem] shadow-xl p-6 md:p-10 min-h-[600px] border border-blue-50">
          {/* Chat bubbles */}
          <div className="flex flex-col gap-8 mb-10 overflow-y-auto">
            {/* Update chat bubble rendering */}
            {currentMessages.map((chat, index) => (
              <div key={index} className={`flex items-start gap-3 ${chat.is_bot ? '' : 'justify-end'}`}>
                {chat.is_bot && <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-900 text-base mt-1 shadow-sm">MT</div>}
                <div className={`px-7 py-4 rounded-3xl ${chat.is_bot ? 'bg-[#f5f7fa] text-gray-700 rounded-tl-lg' : 'bg-blue-700 text-white rounded-tr-lg'} max-w-[70%] shadow transition-all duration-200 text-base`}>
                  {chat.message}

                  {/* Show prediction and recommendations for bot messages */}
                  {chat.is_bot && chat.prediction && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-sm font-semibold text-blue-800 mb-2">Analisis: {chat.prediction}</div>
                      {chat.recommendations && chat.recommendations.length > 0 && (
                        <div>
                          <div className="text-xs font-medium text-blue-700 mb-1">Rekomendasi:</div>
                          <ul className="text-xs text-blue-600 space-y-1">
                            {chat.recommendations.slice(0, 3).map((rec, idx) => (
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
                {!chat.is_bot && <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center font-bold text-white text-base mt-1 shadow-sm">U</div>}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-900 text-base mt-1 shadow-sm">MT</div>
                <div className="bg-[#f5f7fa] px-7 py-4 rounded-3xl rounded-tl-lg text-gray-700 max-w-[70%] shadow transition-all duration-200 text-base">Sedang mengetik...</div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="mt-auto pt-4">
            <div className="flex items-center gap-3 bg-white border border-blue-100 rounded-2xl px-6 py-4 shadow transition-all duration-200 focus-within:shadow-lg">
              <button className="text-gray-400 hover:text-blue-700 p-2 rounded-full transition mr-2">
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                placeholder="Message to Mindtrack..."
                className="flex-1 bg-transparent outline-none text-base text-gray-700"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <button className="text-gray-400 hover:text-blue-700 p-2 rounded-full transition">
                <Smile className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-blue-700 p-2 rounded-full transition">
                <Mic className="w-5 h-5" />
              </button>
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-[#6C63FF] hover:bg-[#5548c8] text-white px-6 py-2 rounded-full flex items-center gap-2 font-semibold text-base ml-2 transition shadow disabled:opacity-50"
              >
                Send <Send className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full md:w-[340px] flex-shrink-0 flex flex-col gap-6">
          {/* User Info Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center text-white mb-2">U</div>
              <div className="text-center">
                <div className="font-semibold text-blue-900 text-lg">MindTrack AI</div>
                <div className="text-xs text-gray-400">Personal Mental Health Assistant</div>
              </div>
              <MoreVertical className="text-gray-400 w-5 h-5 cursor-pointer absolute top-8 right-8" />
            </div>
            <span className="font-semibold text-blue-700 mb-1">{userData?.name || 'User'}</span>
            <span className="text-sm text-gray-500">MindTrack Personal Assistant</span>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl shadow-lg p-8 flex-1 flex flex-col gap-4 border border-blue-50">
            <div className="font-semibold text-blue-900 mb-2 text-base flex items-center gap-2 select-none">
              Quick Actions
              <ChevronDown className="w-4 h-4 text-blue-400" />
            </div>

            <button onClick={createNewChat} className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 text-left group">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Pencil className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-800 text-sm">New Chat</div>
                <div className="text-xs text-gray-500">Start fresh conversation</div>
              </div>
            </button>

            <Link to="/journal" className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 text-left group">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <ExternalLink className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-800 text-sm">Journal</div>
                <div className="text-xs text-gray-500">Write your thoughts</div>
              </div>
            </Link>

            <Link to="/dashboard" className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 text-left group">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <ExternalLink className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="font-medium text-gray-800 text-sm">Dashboard</div>
                <div className="text-xs text-gray-500">View your progress</div>
              </div>
            </Link>
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  );
};

export default ChatBox;
