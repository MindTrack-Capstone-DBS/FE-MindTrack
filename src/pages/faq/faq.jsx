import { useState } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const faqs = [
  {
    question: 'What is MindTrack?',
    answer: 'MindTrack is a mental wellness platform designed to help users track their moods, journal their daily thoughts, and gain insights for improved emotional awareness.',
  },
  {
    question: 'How do I create a journal entry?',
    answer: "Simply navigate to the 'Journal Entry' page, select your mood, and write your thoughts in the text area. Your entries are saved automatically when you click the Save button.",
  },
  {
    question: 'Is my data private?',
    answer: 'Yes, all your data is stored securely and is only accessible by you. We are committed to maintaining your privacy and data security.',
  },
  {
    question: 'Can I export my journal entries?',
    answer: 'Currently, export functionality is not available, but it is planned for future updates. Stay tuned for new features!',
  },
  {
    question: 'How do I reset my password?',
    answer: 'Go to the Security & Password section in your profile and follow the instructions to reset your password securely.',
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Check if user is logged in
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userData = isAuthenticated ? JSON.parse(localStorage.getItem('userData') || '{}') : { name: 'Guest' };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Gunakan isLandingPage={true} jika user belum login */}
      <Navbar variant="light" isLandingPage={!isAuthenticated} userData={isAuthenticated ? userData : undefined} />
      <div className="mt-20 flex-grow">
        <main className="bg-white min-h-screen py-16 px-6">
          <div className="max-w-[1200px] mx-auto space-y-16">
            <section className="text-center max-w-3xl mx-auto">
              <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-500 text-lg">Answers to the most common questions about MindTrack, your trusted mental wellness companion.</p>
            </section>

            <section>
              <div className="grid gap-8 max-w-4xl mx-auto">
                {faqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div key={index} className="bg-white rounded-3xl shadow-md p-6 cursor-pointer select-none">
                      <button onClick={() => toggleFAQ(index)} className="w-full flex justify-between items-center text-left text-gray-900 font-semibold text-xl" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`}>
                        <span>{faq.question}</span>
                        <svg
                          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div
                        id={`faq-answer-${index}`}
                        className={`text-gray-600 mt-4 text-base leading-relaxed max-w-none overflow-hidden transition-[max-height] duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
                        aria-hidden={!isOpen}
                      >
                        {faq.answer}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;
