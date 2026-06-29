import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Minus, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { findBestMatch } from '../utils/knowledgeBase';

const quickActions = [
  { label: 'Apply for Admission', action: 'route', path: '/admissions' },
  { label: 'Book Campus Visit', action: 'route', path: '/contact' },
  { label: 'School Facilities', action: 'message', text: 'Tell me about the facilities' },
  { label: 'Transport Details', action: 'message', text: 'Do you have school transport?' },
  { label: 'School Timings', action: 'message', text: 'What are the school timings?' },
  { label: 'About the Trust', action: 'message', text: 'Who runs the school?' },
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: '👋 Welcome to VillZone International School.\n\nI am your AI Assistant. I know everything about our admissions, facilities, academics, trust, and timings.\n\nHow may I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [leadForm, setLeadForm] = useState({ name: '', mobile: '', email: '' });
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, showLeadForm, leadSubmitted, isTyping]);

  const handleSend = (text) => {
    const userMessage = text || inputValue.trim();
    if (!userMessage) return;

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputValue('');
    setCurrentQuestion(userMessage);
    setIsTyping(true);
    setShowLeadForm(false); // Hide lead form if they keep typing

    // Simulate AI thinking delay
    setTimeout(() => {
      processBotResponse(userMessage);
    }, 1200 + Math.random() * 800); // Random delay between 1.2s and 2s
  };

  const processBotResponse = (text) => {
    setIsTyping(false);

    // Use the knowledge base algorithm
    const match = findBestMatch(text);

    if (match) {
      setMessages(prev => [...prev, {
        role: 'bot',
        content: match.response,
        actionButton: match.actionButton
      }]);

      if (match.triggerLead) {
        setTimeout(() => setShowLeadForm(true), 500);
      }
    } else {
      // Fallback
      setMessages(prev => [...prev, {
        role: 'bot',
        content: "I'm sorry, I don't have the specific details for that right now. Our admissions team is highly knowledgeable and would be happy to assist you directly.\n\nPlease provide your details below and we will call you back!"
      }]);
      setTimeout(() => setShowLeadForm(true), 500);
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.mobile || !leadForm.email) return;

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/ai-leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadForm,
          questionAsked: currentQuestion,
          conversationHistory: messages
        })
      });
      setLeadSubmitted(true);
      setShowLeadForm(false);
      setMessages(prev => [...prev, { role: 'bot', content: "Thank you, " + leadForm.name.split(' ')[0] + "! Your request has been securely logged in our system. Our admissions team will contact you shortly." }]);
    } catch (err) {
      console.error(err);
    }
  };

  // Helper to parse simple markdown (**bold** and newlines)
  const renderMessageContent = (content) => {
    return content.split('\n').map((line, i) => {
      if (line === '') return <br key={i} />;

      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={i}>
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
          <br />
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[9999] bg-gradient-to-tr from-primary to-purple-600 text-white p-3 rounded-full shadow-premium hover:shadow-premium-hover transition-all hover:scale-110 flex items-center justify-center animate-pulse group border-2 border-white"
          aria-label="Open AI Assistant"
        >
          <Bot size={24} />
          <span className="absolute right-full mr-4 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            AI Assistant
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[9999] w-[350px] sm:w-[400px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fadeIn" style={{ maxHeight: '85vh' }}>

          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-4 flex justify-between items-center shadow-md z-10">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full relative">
                <Bot size={20} />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-primary rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">AI Assistant</h3>
                <p className="text-[10px] text-white/80 font-medium">VillZone Knowledge Engine</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1.5 rounded-lg transition-colors">
                <Minus size={16} />
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1.5 rounded-lg transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 min-h-[300px]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'}`}>
                  {renderMessageContent(msg.content)}

                  {/* Action Button if provided */}
                  {msg.actionButton && (
                    <div className="mt-3">
                      <Link to={msg.actionButton.path} onClick={() => setIsOpen(false)} className="inline-block px-4 py-2 bg-secondary text-white text-xs font-bold rounded-xl hover:bg-secondary-dark transition-colors shadow-sm">
                        {msg.actionButton.label}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}

            {/* Quick Actions (only show at start or if not actively typing) */}
            {messages.length === 1 && !isTyping && (
              <div className="flex flex-wrap gap-2 mt-4">
                {quickActions.map((qa, i) => (
                  qa.action === 'route' ? (
                    <Link key={i} to={qa.path} onClick={() => setIsOpen(false)} className="px-3 py-2 bg-white border border-slate-200 text-xs font-bold text-primary rounded-full hover:border-primary hover:bg-primary/5 transition-colors shadow-sm">
                      {qa.label}
                    </Link>
                  ) : (
                    <button key={i} onClick={() => handleSend(qa.text)} className="px-3 py-2 bg-white border border-slate-200 text-xs font-bold text-primary rounded-full hover:border-primary hover:bg-primary/5 transition-colors shadow-sm text-left">
                      {qa.label}
                    </button>
                  )
                ))}
              </div>
            )}

            {/* Lead Form */}
            {showLeadForm && !leadSubmitted && (
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-premium mt-2 animate-fadeIn">
                <h4 className="text-sm font-black text-slate-800 mb-1">Request a Callback</h4>
                <p className="text-xs text-slate-500 mb-4">Please provide your details below.</p>
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <input type="text" placeholder="Your Name" required className="w-full text-xs font-semibold p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm" value={leadForm.name} onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })} />
                  <input type="tel" placeholder="Mobile Number" required pattern="[0-9]{10}" className="w-full text-xs font-semibold p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm" value={leadForm.mobile} onChange={(e) => setLeadForm({ ...leadForm, mobile: e.target.value })} />
                  <input type="email" placeholder="Email Address" required className="w-full text-xs font-semibold p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm" value={leadForm.email} onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })} />
                  <button type="submit" className="w-full bg-secondary hover:bg-secondary-dark text-white font-black tracking-wide text-xs py-3 rounded-xl transition-all shadow-md hover:shadow-lg">
                    Submit Details
                  </button>
                </form>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2 relative">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 p-3.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium pr-12"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-2 p-2 bg-primary text-white rounded-lg disabled:opacity-50 hover:bg-primary-dark transition-colors flex-shrink-0"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
