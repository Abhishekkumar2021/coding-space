import AuthContext from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import {auth, User} from '../config/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile} from "firebase/auth";


const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null);

    // On mount, subscribe to auth state change
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return unsubscribe;
    }
    , []);

    // Auth functions
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
    
    const verifyEmail = () => {
        if(!user) return Promise.reject('No user found' as any);
        return sendEmailVerification(user);
    };

    const updateUser = (name: string, image: any) => {
        if(!user) return Promise.reject('No user found' as any);
        return updateProfile(user as User, {displayName: name, photoURL: image});
    };

    
    const value = {
        user,
        setUser,
        signUp,
        signIn,
        signOut,
        resetPassword,
        verifyEmail,
        updateUser
    };
    
    return (
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;