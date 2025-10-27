
import React, { useState, useEffect } from 'react';
import type { GeneratedImages } from '../types';
import { useTranslations } from '../context/LanguageContext';

interface ColoringPageDisplayProps {
  images: GeneratedImages;
  onDownload: (theme: string, name: string) => void;
}

export const ColoringPageDisplay: React.FC<ColoringPageDisplayProps> = ({ images, onDownload }) => {
  // These state values are just for creating a filename.
  // The actual theme/name for generation is handled in the parent component.
  const [theme, setTheme] = useState('My-Coloring-Book'); 
  const [name, setName] = useState('Personalized'); 
  const { t } = useTranslations();

  return (
    <div className="mt-12 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">{t('display.title')}</h2>
        <p className="text-gray-600 mt-2">{t('display.subtitle')}</p>
      </div>

      <div className="bg-white/70 backdrop-blur-sm p-4 md:p-8 rounded-2xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3 text-center">
             <h3 className="text-xl font-semibold mb-2 text-gray-700">{t('display.cover')}</h3>
             <img
              src={images.cover}
              alt={t('display.coverAlt')}
              className="w-full max-w-md mx-auto h-auto object-contain rounded-lg shadow-md border-4 border-white"
            />
          </div>

          {images.pages.map((page, index) => (
            <div key={index} className="text-center">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">{t('display.page', { number: index + 1 })}</h3>
              <img
                src={page}
                alt={t('display.pageAlt', { number: index + 1 })}
                className="w-full h-auto object-contain rounded-lg shadow-md border-4 border-white"
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-8">
         <button 
            onClick={() => onDownload(theme, name)}
            className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
        >
            {t('display.downloadButton')}
        </button>
      </div>
    </div>
  );
};
