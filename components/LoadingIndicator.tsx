
import React from 'react';
import { useTranslations } from '../context/LanguageContext';

interface LoadingIndicatorProps {
  message: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message }) => {
  const { t } = useTranslations();
  
  return (
    <div className="mt-12 text-center">
      <div className="flex justify-center items-center mb-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-600"></div>
      </div>
      <p className="text-lg font-semibold text-gray-700 animate-pulse">
        {message || t('loading.default')}
      </p>
    </div>
  );
};
