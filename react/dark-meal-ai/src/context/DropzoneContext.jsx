import { useState, createContext, useContext } from 'react';

const DropzoneContext = createContext();

const DropzoneProvider = () => {
    const [] = useState();
};

export const useDropezone = () => {
    return useContext(DropzoneContext);
}