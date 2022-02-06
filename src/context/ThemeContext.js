import React from "react";

const defaultState = {
  dark: false,
  toggleDark: () => {},
  cursorImage: undefined,
  setCursorImage: () => {},
};

const ThemeContext = React.createContext(defaultState);

// Getting dark mode information from OS!
// You need macOS Mojave + Safari Technology Preview Release 68 to test this currently.
const supportsDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches === true;

class ThemeProvider extends React.Component {
  state = {
    dark: false,
    cursorImage: undefined,
  };

  toggleDark = () => {
    let dark = !this.state.dark;
    localStorage.setItem("dark", JSON.stringify(dark));
    this.setState({ dark });
  };

  setCursorImage = (cursorImage) => {
    this.setState({ cursorImage });
  };

  componentDidMount() {
    // Getting dark mode value from localStorage!
    const lsDark = JSON.parse(localStorage.getItem("dark"));
    if (lsDark) {
      this.setState({ dark: lsDark });
    } else if (supportsDarkMode()) {
      this.setState({ dark: true });
    }
  }

  render() {
    const { children } = this.props;
    const { dark, cursorImage } = this.state;

    return (
      <ThemeContext.Provider
        value={{
          dark,
          toggleDark: this.toggleDark,
          cursorImage,
          setCursorImage: this.setCursorImage,
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeContext;

export { ThemeProvider };
