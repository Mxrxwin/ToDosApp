import React, { useContext, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../src/themeContext";
import Icon from "react-native-ionicons";
import { Dropdown } from "react-native-element-dropdown";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const theme = useContext(themeContext);

  const [dateFormat, setDateFormat] = useState("dd/MM/yy");

  const data = [
    { label: "01/10/23", value: "dd/MM/yy" },
    { label: "01/10/23 12:34", value: "dd/MM/yy HH:mm" },
    { label: "October 01, 2023", value: "MMMM dd, yyyy" },
    { label: "Sun, Oct 1, 2023", value: "EEE, MMM d, yyyy" },
    { label: "October 1st, 2023 12:34", value: "MMMM do, yyyy HH:mm" },
  ];

  const SwitchTheme = () => {
    setDarkMode(!darkMode);
    EventRegister.emit("ChangeTheme", !darkMode);
  };

  const SwitchDateFormat = (param) => {
    setDateFormat(param);
    EventRegister.emit("ChangeDateFormat", param);
  };

  return (
    <View style={[styles.page, { backgroundColor: theme.backgroundColor }]}>
      <View style={{ alignItems: "flex-end" }}>
        <Icon
          name={darkMode ? "sunny" : "moon"}
          size={40}
          color="#aaa"
          style={{ marginTop: 35, marginEnd: 12 }}
          onPress={() => SwitchTheme()}
        />
      </View>
      <View style={styles.dropdown}>
        <Icon
          style={{ width: "10%", padding: 5 }}
          as
          name={"calendar"}
          size={30}
          color="#aaa"
        />
        <Text
          style={{
            width: "35%",
            color: theme.textColor,
            fontSize: 17,
            fontWeight: "500",
            padding: 5
          }}
        >
          Формат даты
        </Text>
        <Dropdown
          style={{ width: "55%" }}
          placeholderStyle={{ color: theme.textColor, textAlign: 'right' }}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={data.find((item) => item.value === dateFormat).label}
          onChange={(item) => {
            SwitchDateFormat(item.value);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  dropdown: {
    borderWidth: 2,
    borderColor: "#2196F3",
    borderRadius: 10,
    padding: 8,
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
