import { CustomSession, UserType } from "@types";
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";

interface UserContextType {
    user?: UserType;
    setUser: Dispatch<SetStateAction<UserType>>;
}

const UserContext = createContext<UserContextType>({
    setUser: () => {},
});

interface UserProviderProps {
    session: CustomSession;
    children: ReactNode | ReactNode[];
}

export const UserProvider = ({ children, session }: UserProviderProps) => {
    const [user, setUser] = useState({});
    const contextValue: UserContextType = {
        user,
        setUser,
    };
    useEffect(() => {
        setUser({
            name: session?.name,
            _id: session?._id,
            role: session?.role,
        });
    }, [session?._id, session?.role, session?.name]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
