import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../authcomponent";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();
export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [updateCurrentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    async function initializeUser(user) {
        if (user) {
            setCurrentUser({ ...user });
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser: updateCurrentUser,
        userLoggedIn,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
