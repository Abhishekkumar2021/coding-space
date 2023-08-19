import { createContext } from 'react';

type ColorMode = 'light' | 'dark';
type ColorModeContextType = {
    colorMode: ColorMode;
    toggleColorMode: () => void;
};

export const ColorModeContext = createContext({} as ColorModeContextType);