import DataContext from '../contexts/AuthContext';
import { useContext } from 'react';

const useData = () => {
    return useContext(DataContext);
}

export default useData;