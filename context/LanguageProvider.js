import { createContext, useContext, useEffect, useState } from "react";
import { arabic, english } from "../public/lang";

const LanguageContext = createContext({
    language: "",
    changeLanguage: (lang_abr) => {},
    langData: {},
    dir: "ltr",
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
        dir: language === "ar" ? "rtl" : "ltr",
        isAr: language === "ar",
    };
    return (
        <LanguageContext.Provider value={context}>
            {children}
        </LanguageContext.Provider>
    );
};
export const useLang = () => useContext(LanguageContext);
export default LanguageContext;
