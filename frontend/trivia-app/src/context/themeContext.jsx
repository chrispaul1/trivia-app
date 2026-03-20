import React,{createContext, useContext, useState, useEffect} from "react";
const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {


    const [isDarkMode, setIsDarkMode] = useState(false);

    // This "computes" the current state based on the toggle
    const themeState = isDarkMode ? darkTheme : lightTheme;

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    return (
        <ThemeContext.Provider value={{ theme:themeState, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext)

const lightTheme = {
    panel: {
        a1: { backgroundColor: '#ffffff', color: '#000' },
        a2: { backgroundColor: '#f8f9fa', color: '#000' },
        a3: { backgroundColor: '#f1f3f5', color: '#000' },
        a4: { backgroundColor: '#e9ecef', color: '#000' },
        a5: { backgroundColor: '#dee2e6', color: '#000' },
    },
    glass: {
        a1: { backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)', color: '#000' },
        a2: { backgroundColor: 'rgba(248, 249, 250, 0.7)', backdropFilter: 'blur(10px)', color: '#000' },
        a3: { backgroundColor: 'rgba(241, 243, 245, 0.6)', backdropFilter: 'blur(8px)', color: '#000' },
        a4: { backgroundColor: 'rgba(233, 236, 239, 0.5)', backdropFilter: 'blur(6px)', color: '#000' },
        a5: { backgroundColor: 'rgba(222, 226, 230, 0.4)', backdropFilter: 'blur(4px)', color: '#000' },
    }
};

const darkTheme = {
    panela1: { backgroundColor: '#1a1a1a', color: '#ffffff' }, // Dark version
    panela2: { backgroundColor: '#2d2d2d', backdropFilter: 'blur(8px)' } // Darker + blur
};