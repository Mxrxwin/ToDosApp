import react, {useContext, useState} from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import { EventRegister } from 'react-native-event-listeners'
import theme from "../theme/theme";
import themeContext from "../theme/themeContext";

export default function SettingsPage({ navigation }) {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useContext(themeContext);

  return (
    <View style={[styles.page, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.text, {color: theme.textColor}]}>SettingsPage</Text>
      <Switch 
        value={darkMode}
        onValueChange={() => {{
          setDarkMode(!darkMode)};
          EventRegister.emit('ChangeTheme', !darkMode)
        }}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
  },
});
