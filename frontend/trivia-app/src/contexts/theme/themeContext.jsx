import React,{createContext, useContext, useState, useEffect} from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./themes";

const ThemeContext = createContext()

export const useThemeContext = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {

    const [isDarkMode, setIsDarkMode] = useState(false);
 
    const toggleTheme = () => setIsDarkMode(prev => !prev);
   
    // This "computes" the current state based on the toggle
    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <StyledThemeProvider theme={theme}>
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
};
