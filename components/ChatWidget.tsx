
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import type { ChatMessage } from '../types';
import { GoogleGenAI, Chat } from '@google/genai';
import { CloseIcon, SendIcon, UserIcon, BotIcon } from './icons';
import { useTranslations } from '../context/LanguageContext';

interface ChatWidgetProps {
  onClose: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ onClose }) => {
  const { t, language } = useTranslations();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: 'model', text: t('chat.welcome') }]);
  }, [t]);

  useEffect(() => {
    const initChat = () => {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      chatRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: t('chat.systemInstruction'),
        },
      });
    };
    initChat();
  }, [t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (chatRef.current) {
        const result = await chatRef.current.sendMessage({ message: input });
        const modelMessage: ChatMessage = { role: 'model', text: result.text };
        setMessages(prev => [...prev, modelMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = { role: 'model', text: t('chat.error') };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] max-w-md h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in-up">
      <header className="flex items-center justify-between p-4 bg-purple-600 text-white rounded-t-2xl">
        <h3 className="font-bold text-lg">{t('chat.title')}</h3>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-purple-700">
          <CloseIcon />
        </button>
      </header>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'model' && <div className="flex-shrink-0 w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center"><BotIcon /></div>}
              <div className={`px-4 py-2 rounded-2xl max-w-[80%] ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
              {msg.role === 'user' && <div className="flex-shrink-0 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center"><UserIcon /></div>}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center"><BotIcon /></div>
              <div className="px-4 py-2 rounded-2xl bg-gray-200">
                <div className="flex items-center space-x-1">
                  <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-white rounded-b-2xl">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('chat.placeholder')}
            className="w-full pl-4 pr-12 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:bg-gray-300">
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  );
};
