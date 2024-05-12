import { createContext, useState, useEffect, useMemo, ReactNode } from 'react';

export type LanguageContextProps = {
  language: string;
  changeLanguage: (newLanguage: string) => void;
};

type LanguageProviderProps = {
  children: ReactNode;
};
export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const searchParams = new URLSearchParams(window.location.search);
  let lang = (searchParams.get('lang') || '').toUpperCase(); 
  const isValidLang = ['EN', 'AR'].includes(lang);
  if (!isValidLang) {
    const localStorageLang = localStorage.getItem('lang');
    lang = (localStorageLang || 'en').toUpperCase(); 
  }
  const [language, setLanguage] = useState(lang);

  useEffect(() => {
    localStorage.setItem('lang', language);
    if(language==='EN')
    document.title="Investbank"
  if(language==='AR')
   document.title='البنك الإستثماري'
    document
      .querySelector('html')
      ?.setAttribute('dir', language === 'AR' ? 'rtl' : 'ltr');
      document.querySelector('html')
      ?.setAttribute('lang', language === 'AR' ? 'en' : 'ar');

  }, [language]);

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const memoizedCacheValue = useMemo(
    () => ({
      language,
      changeLanguage,
    }),
    [language],
  );

  return <LanguageContext.Provider value={memoizedCacheValue}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
