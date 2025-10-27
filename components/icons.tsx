
import React from 'react';

export const ChatIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

export const CloseIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const SendIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
  </svg>
);

export const UserIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

export const BotIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h1a1 1 0 011 1v2.5a1.5 1.5 0 01-3 0v-1a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5v1a1.5 1.5 0 01-3 0V7a1 1 0 011-1h1a1 1 0 001-1v-.5z" />
      <path d="M10 12a4 4 0 100 8 4 4 0 000-8zM7 16a3 3 0 116 0 3 3 0 01-6 0z" />
      <path d="M2 5a1 1 0 011-1h1.5a.5.5 0 000-1H3a2 2 0 00-2 2v2.5a.5.5 0 001 0V5z" />
      <path d="M18 5a1 1 0 00-1-1h-1.5a.5.5 0 000-1H17a2 2 0 012 2v2.5a.5.5 0 001 0V5z" />
    </svg>
);
