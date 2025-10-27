import React, { useState } from 'react';
import { useTranslations } from '../context/LanguageContext';

interface ThemeInputFormProps {
  onGenerate: (theme: string, name: string) => void;
  disabled: boolean;
}

export const ThemeInputForm: React.FC<ThemeInputFormProps> = ({ onGenerate, disabled }) => {
  const [theme, setTheme] = useState<string>('');
  const [name, setName] = useState<string>('');
  const { t } = useTranslations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (theme.trim() && name.trim()) {
      onGenerate(theme, name);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.themeLabel')}
        </label>
        <input
          type="text"
          id="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder={t('form.themePlaceholder')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition bg-white text-gray-900"
          required
        />
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.nameLabel')}
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('form.namePlaceholder')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition bg-white text-gray-900"
          required
        />
      </div>
      <button
        type="submit"
        disabled={disabled}
        className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
      >
        {disabled ? t('form.buttonDisabled') : t('form.button')}
      </button>
    </form>
  );
};