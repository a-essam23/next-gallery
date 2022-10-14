import { createContext, useEffect, useState } from "react";
import { arabic, english } from "../public/lang";

const LanguageContext = createContext({
    language: "",
    changeLanguage: (lang_abr) => {},
    langData: {},
    isAr: false,
});

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("en");
    const [langData, setLangData] = useState(english);
    function changeLanguage(lang) {
        if (lang === "ar") {
            setLanguage("ar");
            setLangData(arabic);
            localStorage.setItem("lang", "ar");
            return;
        }
        setLangData(english);
        setLanguage("en");
        localStorage.setItem("lang", "en");
    }
    useEffect(() => {
        const lang_exist = localStorage.getItem("lang");
        if (lang_exist && lang_exist !== language) changeLanguage(lang_exist);
    }, []);

    const context = {
        language,
        changeLanguage,
        langData,
        isAr: language === "ar",
    };
    return (
        <LanguageContext.Provider value={context}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;
