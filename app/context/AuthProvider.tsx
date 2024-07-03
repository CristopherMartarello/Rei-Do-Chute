//Provedor de dados e funções

'use client'

import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react"
import dbConfig from '../firebase/firebase-config';
import { AuthContext } from "./AuthContext";

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthContextProviderProps> = ({children}) => {
    const auth = getAuth(dbConfig);
    const [userAuth, setUserAuth] = useState<User | null>(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUserCredentials: User | null) => {
            setUserAuth(authUserCredentials);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    async function logout() {
        let result = null,
            error = null;
        
        try {
            result = await signOut(auth);
        } catch (e) {
            error = e;
        }

        return { result, error };
    }

    return (
        <AuthContext.Provider value={{ userAuth, logout }}>
            {loading
                ?
                <div>
                    <h1>Loading...</h1>
                </div>
                :
                children
            }
        </AuthContext.Provider>
    );
}