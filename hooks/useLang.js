import { useContext } from "react";
import LanguageContext from "../context/LanguageProvider";

export default function useLang() {
    return useContext(LanguageContext);
}
