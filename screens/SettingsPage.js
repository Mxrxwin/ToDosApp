import react, {useContext, useState} from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import { EventRegister } from 'react-native-event-listeners'
import theme from "../theme/theme";
import themeContext from "../theme/themeContext";
import Icon from "react-native-ionicons";

export default function SettingsPage({ navigation }) {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useContext(themeContext);


  const SwitchTheme = () => {
    setDarkMode(!darkMode);
    EventRegister.emit('ChangeTheme', !darkMode)
  }

  return (
    <View style={[styles.page, {backgroundColor: theme.backgroundColor}]}>
      <View style={{alignItems:'flex-end'}}>
        <Icon 
          name={darkMode ? 'sunny' : 'moon'} 
          size={40} 
          color="#aaa"
          style={{marginTop: 35, marginEnd: 12}} 
          onPress={() => SwitchTheme()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  text: {
    fontSize: 24,
  },
});
