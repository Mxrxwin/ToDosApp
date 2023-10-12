import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../src/themeContext";
import Icon from "react-native-ionicons";
import DropdownComponent from "../src/settingsBlock";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const theme = useContext(themeContext);
  const [dateFormat, setDateFormat] = useState("dd/MM/yy");
  const [sortFormat, setSortFormat] = useState("1");

  const dataDateFormat = [
    { label: "01/10/23", value: "dd/MM/yy" },
    { label: "01/10/23 12:34", value: "dd/MM/yy HH:mm" },
    { label: "October 01, 2023", value: "MMMM dd, yyyy" },
    { label: "Sun, Oct 1, 2023", value: "EEE, MMM d, yyyy" },
    { label: "October 1st, 2023 12:34", value: "MMMM do, yyyy HH:mm" },
  ];

  const dataSortFormat = [
    { label: "Сначала старые", value: "1" },
    { label: "Сначала новые", value: "2" },
    { label: "По алфавиту", value: "3" },
    { label: "Против алфавита", value: "4" },
  ];
  
  const SwitchTheme = () => {
    setDarkMode(!darkMode);
    EventRegister.emit("ChangeTheme", !darkMode);
  };

  const SwitchDateFormat = (param) => {
    setDateFormat(param);
    EventRegister.emit("ChangeDateFormat", param);
  };

  const SwitchSortFormat = (param) => {
    setSortFormat(param);
    EventRegister.emit("ChangeSortFormat", param);
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
      <DropdownComponent
        iconName="calendar"
        title="Формат даты"
        changesVar={dateFormat}
        data={dataDateFormat}
        onValueChange={(value) => SwitchDateFormat(value)}
      />
      <DropdownComponent
        iconName="funnel"
        title="Сортировка"
        changesVar={sortFormat}
        data={dataSortFormat}
        onValueChange={(value) => (value !== sortFormat) ? SwitchSortFormat(value) : value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});