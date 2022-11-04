import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
    user: null,
    addUser: (user) => {},
    removeUser: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const addUser = (userObject) => {
        setUser(userObject);
    };

    const removeUser = () => {
        setUser(null);
    };

    // useEffect(() => {
    //     localStorage.setItem("token", user.token);
    // }, [user.token]);

    const context = {
        user,
        addUser,
        removeUser,
    };

    return (
        <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
