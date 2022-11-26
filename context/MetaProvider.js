import { createContext, useContext, useEffect, useState } from "react";
import { useFetch } from "../hooks";

const MetaContext = createContext({
    contacts: {
        whatsapp: "",
        facebook: "",
        pinterest: "",
    },
});
export const MetaProvider = ({ children }) => {
    const [contacts, setContacts] = useState(null);
    const context = {
        contacts,
        setContacts,
    };
    return (
        <MetaContext.Provider value={context}>{children}</MetaContext.Provider>
    );
};

export const useMeta = () => useContext(MetaContext);
MetaProvider;
