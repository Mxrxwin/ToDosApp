import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-ionicons";
import { Dropdown } from "react-native-element-dropdown";
import themeContext from "./themeContext";

const DropdownComponent = ({ iconName, title, changesVar, data, onValueChange }) => {
    const theme = useContext(themeContext);
    return (
        <View style={styles.dropdown}>
        <Icon
            style={{ width: "10%", padding: 5 }}
            as
            name={iconName}
            size={30}
            color="#aaa"
        />
        <Text
            style={{
            width: "35%",
            color: theme.textColor,
            fontSize: 17,
            fontWeight: "500",
            padding: 5,
            }}
        >
            {title}
        </Text>
        <Dropdown
            style={{ width: "55%" }}
            placeholderStyle={{ color: theme.textColor, textAlign: "right" }}
            iconStyle={styles.iconStyle}
            data={data}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={data.find((item) => item.value === changesVar).label}
            onChange={(item) => {
            onValueChange(item.value);
            }}
        />
        </View>
    );
    };

const styles = StyleSheet.create ({
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

export default DropdownComponent;