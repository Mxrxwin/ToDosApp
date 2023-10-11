import React, { useEffect, useState } from "react";
import MainContainer from "./navigation/MainConteiner";

import theme from "./src/theme";
import themeContext from "./src/themeContext";
import { EventRegister } from "react-native-event-listeners";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const listenerTheme = EventRegister.addEventListener(
      "ChangeTheme",
      (data) => {
        setDarkMode(data);
      }
    );
    return () => {
      EventRegister.removeEventListener(listenerTheme);
    };
  }, [darkMode]);

  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <MainContainer />
    </themeContext.Provider>
  );
}
