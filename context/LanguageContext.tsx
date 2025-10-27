import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import type { Language } from '../types';

interface Translations {
  [key: string]: string | Translations;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations | null>(null);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await fetch(`./locales/${language}.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error(`Failed to fetch translations for ${language}:`, error);
        // Attempt to fallback to English if the selected language fails
        if (language !== 'en') {
          try {
            const fallbackResponse = await fetch('./locales/en.json');
            const fallbackData = await fallbackResponse.json();
            setTranslations(fallbackData);
          } catch (fallbackError) {
             console.error("Failed to fetch fallback English translations:", fallbackError);
          }
        }
      }
    };

    fetchTranslations();
  }, [language]);

  const t = useCallback((key: string, replacements?: { [key:string]: string | number }): string => {
    // Return key as a fallback during the brief loading period or if a key is not found.
    if (!translations) {
      return key;
    }
    
    const keys = key.split('.');
    let result: any = translations;
    
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    let strResult = String(result);

    if (replacements) {
        Object.keys(replacements).forEach(rKey => {
            strResult = strResult.replace(`{{${rKey}}}`, String(replacements[rKey]));
        });
    }

    return strResult;
  }, [translations]);
  
  // Render children immediately. The `t` function will return keys until translations load,
  // which is acceptable as the fetch is very fast for local files.
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslations = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslations must be used within a LanguageProvider');
  }
  return context;
};
