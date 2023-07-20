import DataContext from "../contexts/DataContext";
import { useState } from "react";
import { UserData } from "../Types";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { db } from '../config/firebase';


const DataProvider = ({ children }: any) => {
    const [data, setData] = useState<UserData | null>(null);
    const {user} = useAuth();

    const value = {
        data,
        setData
    };
    
    return (
        <DataContext.Provider value = {value}>
            {children}
        </DataContext.Provider>
    );

};

export default DataProvider;