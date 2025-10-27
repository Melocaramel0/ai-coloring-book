
import React, { useState, useCallback } from 'react';
import { ThemeInputForm } from './components/ThemeInputForm';
import { ColoringPageDisplay } from './components/ColoringPageDisplay';
import { LoadingIndicator } from './components/LoadingIndicator';
import { ChatWidget } from './components/ChatWidget';
import { ChatIcon } from './components/icons';
import { generateCoverImage, generateColoringPages } from './services/geminiService';
import { createColoringBookPdf } from './services/pdfService';
import type { GeneratedImages, Language } from './types';
import { LanguageProvider, useTranslations } from './context/LanguageContext';

const AppContent: React.FC = () => {
  const [generatedImages, setGeneratedImages] = useState<GeneratedImages | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const { language, setLanguage, t } = useTranslations();

  const handleGenerate = useCallback(async (theme: string, name: string) => {
    setIsLoading(true);
    setGeneratedImages(null);
    setError(null);
    
    try {
      setLoadingMessage(t('loading.cover'));
      const coverImage = await generateCoverImage(theme, name, language);
      
      setLoadingMessage(t('loading.pages'));
      const pages = await generateColoringPages(theme, language);
      
      setGeneratedImages({ cover: coverImage, pages });
    } catch (err) {
      console.error(err);
      setError(t('error.generation'));
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [language, t]);

  const handleDownload = useCallback(async (theme: string, name: string) => {
    if (!generatedImages) return;
    setIsLoading(true);
    setLoadingMessage(t('loading.pdf'));
    try {
      // @ts-ignore
      const { jsPDF } = window.jspdf;
      await createColoringBookPdf(jsPDF, generatedImages.cover, generatedImages.pages, theme, name, language);
    } catch (err) {
       console.error(err);
       setError(t('error.pdf'));
    } finally {
        setIsLoading(false);
        setLoadingMessage('');
    }
  }, [generatedImages, language, t]);

  return (
    <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen font-sans text-gray-800 antialiased relative">
      <div className="absolute top-4 right-4 z-10">
        <div className="relative bg-white/70 backdrop-blur-sm rounded-full shadow-md">
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${language === 'en' ? 'bg-purple-600 text-white' : 'text-gray-600'}`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('es')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${language === 'es' ? 'bg-purple-600 text-white' : 'text-gray-600'}`}
          >
            ES
          </button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 drop-shadow-md">
            {t('app.title')}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t('app.subtitle')}
          </p>
        </header>

        <main>
          <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg">
            <ThemeInputForm onGenerate={handleGenerate} disabled={isLoading} />
          </div>

          {error && (
             <div className="max-w-xl mx-auto mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                <p className="font-bold">{t('error.title')}</p>
                <p>{error}</p>
             </div>
          )}

          {isLoading && <LoadingIndicator message={loadingMessage} />}

          {generatedImages && !isLoading && (
            <ColoringPageDisplay
              images={generatedImages}
              onDownload={handleDownload}
            />
          )}
        </main>
      </div>
      
      <div className="fixed bottom-6 right-6 z-50">
         <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="bg-purple-600 text-white rounded-full p-4 shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 transition-transform transform hover:scale-110"
            aria-label={t('chat.toggle')}
          >
            <ChatIcon />
         </button>
      </div>
      
      {isChatOpen && <ChatWidget onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);


export default App;
