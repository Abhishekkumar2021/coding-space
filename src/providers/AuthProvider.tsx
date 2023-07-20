import AuthContext from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import {auth, User} from '../config/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, GithubAuthProvider  } from "firebase/auth";


const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null);

    // On mount, subscribe to auth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe(); // Cleanup subscription on unmount
    }
    , []);

    // Auth functions
    const signUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    
    const signIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };
    
    const logOut = () => {
        return signOut(auth);
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

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const githubSignIn = () => {
        const provider = new GithubAuthProvider();
        return signInWithPopup(auth, provider);
    };
  
    const value = {
        user,
        setUser,
        signUp,
        signIn,
        logOut,
        resetPassword,
        verifyEmail,
        updateUser,
        googleSignIn,
        githubSignIn,
    };
    
    return (
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;