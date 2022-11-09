import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
    user: null,
    addUser: (user) => {},
    removeUser: () => {},
});

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const paths = router.asPath.split("/").filter((path) => path.length > 0);
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
    useEffect(() => {
        if (paths[0] === "login" || paths[0] === "404") return;

        // if (!user) router.replace("/login");

        if (paths[0] === "admin") {
            if (!user?.role || user?.role !== "admin") {
                console.log("Permision denied not admin", user?.role);
                router.replace("/login");
            }
        }
        // eslint-disable-next-line
    }, [user, paths]);
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
