import { createContext } from "react";
import {auth, User} from '../config/firebase';
import { UserCredential } from "firebase/auth";



const AuthContext = createContext({} as any);

export default AuthContext;