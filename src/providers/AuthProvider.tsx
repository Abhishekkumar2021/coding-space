import AuthContext from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import {auth, User} from '../config/firebase';
import { applyActionCode, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";


const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currUser) => {
            if (currUser) {
                setUser(currUser);
            } else {
                setUser(null);
                
    auth.onAuthStateChanged((currUser) => {
        if (currUser) {
            setUser(currUser);
        } else {
            setUser(null);
        }
    });

    const signUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signOut = () => {
        return auth.signOut();
    };

    const resetPassword = (email: string) => {
        return sendPasswordResetEmail(auth, email);
    };

    const confirmEmail = (code: string) => {
        return applyActionCode(auth, code);
    };

    const value = {
        user,
        setUser,
        signUp,
        signIn,
        signOut,
        resetPassword,
        confirmEmail,
    };

    return (
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    )
}

