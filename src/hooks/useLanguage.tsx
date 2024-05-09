import { useContext } from "react";
import { LanguageContext, LanguageContextProps } from "../context/LanguageProvider";

const useLanguage = (): LanguageContextProps => {
    const context = useContext(LanguageContext);
    if (!context) {
      throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
  };
  export default useLanguage