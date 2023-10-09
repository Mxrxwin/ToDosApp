import React, { useEffect, useState } from "react";
import { MainPage } from "./screens/mainPage";
import MainContainer from "./navigation/MainConteiner";

import theme from "./theme/theme";
import themeContext from "./theme/themeContext";
import { EventRegister } from "react-native-event-listeners";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
      setDarkMode(data)
    })
    return () => {
      EventRegister.removeAllListeners(listener)
    }
  }, [darkMode])

  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>   
      <MainContainer />
    </themeContext.Provider>
  );
}
