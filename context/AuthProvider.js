import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
    user: {},
    addUser: (user) => {},
    removeUser: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ _id: null, token: null });

    const addUser = (userObject) => {
        setUser(userObject);
        localStorage.setItem("user", userObject);
    };

    const removeUser = () => {
        setUser({ _id: null, token: null });
        localStorage.setItem("token", user.token);
    };

    useEffect(() => {
        localStorage.setItem("token", user.token);
    }, [user.token]);

    const context = {
        user,
        addUser,
        removeUser,
    };

    return (
        <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;
