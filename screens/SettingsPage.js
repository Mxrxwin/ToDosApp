import react from "react";
import { StyleSheet, View, Text } from "react-native";

export default function SettingsPage({ navigation }) {
  return (
    <View style={styles.page}>
      <Text style={styles.text}>SettingsPage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#15222C",
  },
  text: {
    fontSize: 24,
  },
});
