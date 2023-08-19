import { ColorModeContext } from '../contexts/ColorModeContext';
import { useState, useMemo, useEffect } from "react";
import { createTheme, ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';


const ColorModeProvider = ({ children }: any) => {
    const prefersDarkMode =  useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');

    useEffect(() => {
        setMode(prefersDarkMode ? 'dark' : 'light');
    }
    , [prefersDarkMode]);



    const colorMode = useMemo(
        () => ({
            colorMode: mode,
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [mode],
    );

    const theme = useMemo(
        () =>
          createTheme({
            palette: {
              mode,
            },
          }),
        [mode],
      );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
};

export default ColorModeProvider;