import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useContext, useEffect } from "react";

interface IUserContext {
    user: string,
    login: (username: string) => void;
    logout: () => void;
    authenticated: boolean
}

const userContext = createContext<IUserContext | null>(null);

function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState("");
    const authenticated = Boolean(user);
    const login = (username: string) => {
        localStorage.setItem('user', username);
        setUser(username)
    }
    const logout = () => {
        localStorage.removeItem('user');
        setUser("");
    }

    useEffect(() => {

        let user = localStorage.getItem('user');
        if (user) {

            setUser(user);
        }
    }, [])


    return (
        <>
            <userContext.Provider value={{ user, login, logout, authenticated }}>
                {children}
            </userContext.Provider>
        </>
    )
}

export const useAuth = () => {
    const ctx = useContext(userContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");;
    return ctx;
}


export default UserProvider;