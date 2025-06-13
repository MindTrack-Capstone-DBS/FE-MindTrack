import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, MoreVertical, ExternalLink, Paperclip, Smile, Mic, Pencil, Trash2, ChevronDown } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import logo2 from '../../assets/images/Logo-cropped.png';

const ChatBox = () => {
  const [recentChats, setRecentChats] = useState([]);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  // Load TensorFlow.js model (Graph Model)
  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log('Loading TensorFlow.js graph model...');
        // Use loadGraphModel instead of loadLayersModel
        const loadedModel = await tf.loadGraphModel('/tfjs_model/model.json');
        setModel(loadedModel);
        console.log('Graph model loaded successfully');
      } catch (error) {
        console.error('Error loading model:', error);
        // Fallback: continue without model
        console.log('Continuing without AI model - using rule-based responses');
      }
    };

    loadModel();
  }, []);

  // Fetch recent chats from the database
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found');
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/chats/sessions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRecentChats(data.sessions || []);

        // Set active session if exists
        const activeSession = data.sessions?.find((session) => session.is_active);
        if (activeSession) {
          setCurrentSessionId(activeSession.id);
          fetchMessages(activeSession.id);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

  // Fetch messages for a specific session
  const fetchMessages = async (sessionId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, redirecting to login');
        window.location.href = '/login';
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/chats/sessions/${sessionId}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        console.log('Token expired or invalid, redirecting to login');
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCurrentMessages(data.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Simple rule-based stress prediction (fallback)
  const predictStressRuleBased = (text) => {
    const stressKeywords = {
      high: ['stress', 'anxious', 'panic', 'overwhelmed', 'depressed', 'suicidal', 'hopeless'],
      medium: ['worried', 'tired', 'frustrated', 'angry', 'sad', 'confused'],
      low: ['okay', 'fine', 'good', 'happy', 'calm', 'relaxed'],
    };

    const lowerText = text.toLowerCase();

    for (let word of stressKeywords.high) {
      if (lowerText.includes(word)) return 5;
    }

    for (let word of stressKeywords.medium) {
      if (lowerText.includes(word)) return 3;
    }

    for (let word of stressKeywords.low) {
      if (lowerText.includes(word)) return 1;
    }

    return 2; // default medium-low
  };

  // Preprocess text for model prediction
  const preprocessText = (text) => {
    try {
      // Simple tokenization and padding for graph model
      const words = text.toLowerCase().split(' ');
      const sequence = words.map((word) => {
        // Simple hash function for tokenization
        let hash = 0;
        for (let i = 0; i < word.length; i++) {
          const char = word.charCodeAt(i);
          hash = (hash << 5) - hash + char;
          hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash) % 10000; // Limit to vocab size
      });

      // Pad or truncate to model's expected input length (100)
      const paddedSequence = new Array(100).fill(0);
      for (let i = 0; i < Math.min(sequence.length, 100); i++) {
        paddedSequence[i] = sequence[i];
      }

      return tf.tensor2d([paddedSequence]);
    } catch (error) {
      console.error('Error preprocessing text:', error);
      return null;
    }
  };

  // Predict stress level using TensorFlow.js model
  // Tambahkan fungsi getRecommendations yang hilang
  const getRecommendations = (stressLevel) => {
    const recommendations = {
      1: ['Pertahankan kondisi mental yang baik dengan tetap melakukan aktivitas positif', 'Lakukan olahraga ringan secara teratur', 'Jaga pola tidur yang sehat'],
      2: ['Cobalah teknik pernapasan dalam untuk relaksasi', 'Luangkan waktu untuk hobi yang Anda sukai', 'Berbicara dengan teman atau keluarga tentang perasaan Anda'],
      3: ['Pertimbangkan untuk melakukan meditasi atau mindfulness', 'Kurangi beban kerja jika memungkinkan', 'Cari dukungan dari orang terdekat'],
      4: ['Sangat disarankan untuk berkonsultasi dengan profesional kesehatan mental', 'Hindari isolasi diri, tetap terhubung dengan orang lain', 'Pertimbangkan untuk mengambil cuti jika diperlukan'],
      5: ['Segera hubungi profesional kesehatan mental atau hotline krisis', 'Jangan ragu untuk meminta bantuan dari keluarga atau teman terdekat', 'Pertimbangkan untuk mendapatkan perawatan medis segera'],
    };

    return recommendations[stressLevel] || recommendations[2];
  };

  // Perbaiki fungsi predictStress untuk mengatasi TensorFlow error
  const predictStress = async (text) => {
    if (!model) {
      console.log('Model not loaded, using rule-based prediction');
      return predictStressRuleBased(text);
    }

    try {
      const inputTensor = preprocessText(text);
      if (!inputTensor) {
        return predictStressRuleBased(text);
      }

      // Gunakan predict() sebagai alternatif executeAsync()
      let prediction;
      try {
        prediction = model.predict(inputTensor);
      } catch (executeError) {
        console.log('Using executeAsync as fallback');
        // Jika predict() gagal, coba executeAsync dengan input yang benar
        const inputSignature = model.inputs[0];
        console.log('Model input signature:', inputSignature);

        // Buat input tensor sesuai dengan signature model
        const reshapedInput = inputTensor.reshape([1, -1]);
        prediction = await model.executeAsync(reshapedInput);
      }

      // Handle hasil prediksi
      const outputTensor = Array.isArray(prediction) ? prediction[0] : prediction;
      const result = await outputTensor.data();

      // Clean up tensors
      inputTensor.dispose();
      if (Array.isArray(prediction)) {
        prediction.forEach((tensor) => tensor.dispose());
      } else {
        prediction.dispose();
      }

      // Get the predicted class (highest probability)
      const stressLevel = result.indexOf(Math.max(...result)) + 1; // +1 karena level dimulai dari 1
      return Math.min(Math.max(stressLevel, 1), 5); // Pastikan dalam range 1-5
    } catch (error) {
      console.error('Error predicting stress:', error);
      return predictStressRuleBased(text);
    }
  };

  // Perbaiki fetchChats dengan error handling yang lebih baik
  const fetchChats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, redirecting to login');
        window.location.href = '/login';
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/chats/sessions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        console.log('Token expired or invalid, redirecting to login');
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRecentChats(data.sessions || []);

      // Set active session if exists
      const activeSession = data.sessions?.find((session) => session.is_active);
      if (activeSession) {
        setCurrentSessionId(activeSession.id);
        fetchMessages(activeSession.id);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
      // Jika error karena token issue, redirect ke login
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
  };
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    setIsLoading(true);
    const userMessage = inputMessage;
    setInputMessage('');

    try {
      // Add user message to UI immediately
      const newUserMessage = {
        id: Date.now(),
        message: userMessage,
        is_bot: false,
        created_at: new Date().toISOString(),
      };
      setCurrentMessages((prev) => [...prev, newUserMessage]);

      // Predict stress level
      const stressLevel = await predictStress(userMessage);
      const recommendations = stressLevel !== null ? getRecommendations(stressLevel) : [];

      // Send to backend
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, redirecting to login');
        window.location.href = '/login';
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/chats/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: userMessage,
          session_id: currentSessionId,
          stress_prediction: stressLevel,
          recommendations: recommendations, // Kirim sebagai array langsung
        }),
      });

      if (response.status === 401) {
        console.log('Token expired or invalid, redirecting to login');
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.bot_response) {
        // Add bot response to UI
        const botMessage = {
          id: Date.now() + 1,
          message: data.bot_response.message,
          is_bot: true,
          recommendations: data.bot_response.recommendations,
          created_at: new Date().toISOString(),
        };
        setCurrentMessages((prev) => [...prev, botMessage]);

        // Update session ID if new session was created
        if (data.session_id && !currentSessionId) {
          setCurrentSessionId(data.session_id);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Remove user message from UI if sending failed
      setCurrentMessages((prev) => prev.slice(0, -1));
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

  return (
    <div className="mt-20 min-h-screen bg-[#fafbfc] flex flex-col">
      <Navbar variant="dark" />
      <div className="flex flex-1 w-full max-w-[1600px] mx-auto mt-10 gap-6 px-4 md:px-8 pb-8 pt-4">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white rounded-[2.5rem] shadow-xl p-6 md:p-10 min-h-[600px] border border-blue-50">
          {/* Chat bubbles */}
          <div className="flex flex-col gap-8 mb-10 overflow-y-auto">
            {currentMessages.map((chat, index) => (
              <div key={index} className={`flex items-start gap-3 ${chat.is_bot ? '' : 'justify-end'}`}>
                <div className={`w-10 h-10 rounded-full ${chat.is_bot ? 'bg-blue-100' : 'bg-blue-700'} flex items-center justify-center font-bold text-blue-900 text-base mt-1 shadow-sm`}>{chat.is_bot ? 'MT' : 'U'}</div>
                <div
                  className={`bg-${chat.is_bot ? '[#f5f7fa]' : 'blue-700'} px-7 py-4 rounded-3xl ${chat.is_bot ? 'rounded-tl-lg' : 'rounded-tr-lg'} ${
                    chat.is_bot ? 'text-gray-700' : 'text-white'
                  } max-w-[70%] shadow transition-all duration-200 text-base`}
                >
                  {chat.message}
                  {chat.recommendations && chat.recommendations.length > 0 && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-semibold text-blue-800 mb-2">Rekomendasi:</p>
                      <ul className="text-sm text-blue-700">
                        {chat.recommendations.map((rec, idx) => (
                          <li key={idx} className="mb-1">
                            • {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <span className="text-xs text-gray-400 ml-2">{new Date(chat.created_at).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-900 text-base mt-1 shadow-sm">MT</div>
                <div className="bg-[#f5f7fa] px-7 py-4 rounded-3xl rounded-tl-lg text-gray-700 max-w-[70%] shadow transition-all duration-200 text-base">Sedang menganalisis...</div>
              </div>
            )}
          </div>
          {/* Message input */}
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
          <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col gap-4 items-center border border-blue-50 relative">
            <div className="relative mb-2">
              <img src={logo2} alt="Avatar" className="w-16 h-16 rounded-full object-cover border-2 border-blue-100" />
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="text-center">
              <div className="font-semibold text-blue-900 text-lg">MindTrack AI</div>
              <div className="text-xs text-gray-400">Personal Mental Health Assistant</div>
            </div>
            <MoreVertical className="text-gray-400 w-5 h-5 cursor-pointer absolute top-8 right-8" />
          </div>
          {/* Recent Chats Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8 flex-1 flex flex-col gap-4 border border-blue-50">
            <div className="font-semibold text-blue-900 mb-2 text-base flex items-center gap-2 select-none">
              Recent Chats
              <ChevronDown className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex flex-col gap-1 overflow-y-auto max-h-[350px]">
              {recentChats.map((chat, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition text-sm ${chat.is_active ? 'bg-blue-50 text-blue-900 font-bold shadow' : 'hover:bg-blue-50 hover:text-blue-900 text-gray-700'}`}
                  onClick={() => {
                    setCurrentSessionId(chat.id);
                    fetchMessages(chat.id);
                  }}
                >
                  <span className="truncate flex-1">{chat.title}</span>
                  <span className="text-xs text-gray-400">{new Date(chat.updated_at).toLocaleDateString()}</span>
                  {chat.is_active ? (
                    <>
                      <button className="p-1 text-blue-400 hover:text-blue-700">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-blue-700">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  );
};

export default ChatBox;
