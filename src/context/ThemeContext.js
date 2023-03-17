import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect
} from "react";

const ThemeContext = createContext({
    darkMode: false,
    cursorImage: undefined,
    readingProgress: 0,
    scrollProgressTarget: undefined
});

const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState();
    const [showCursorImage, setShowCursorImage] = useState(false);
    const [cursorImage, setCursorImage] = useState(undefined);
    const [readingProgress, setReadingProgress] = useState(0);
    const [headerLight, setHeaderLight] = useState(false);
    const [scrollProgressTarget, setScrollProgressTarget] = useState(undefined);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);

        if (!darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
        }
    };

    useEffect(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    return (
        <ThemeContext.Provider
            value={{
                showCursorImage,
                setShowCursorImage,
                cursorImage,
                setCursorImage,
                // for components/ScrollProgress.jsx
                scrollProgressTarget,
                setScrollProgressTarget,
                readingProgress,
                setReadingProgress,
                // theme
                darkMode,
                toggleDarkMode,
                headerLight,
                setHeaderLight
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

const useThemeContext = () => useContext(ThemeContext);

export { ThemeContext, ThemeProvider, useThemeContext };
