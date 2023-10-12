import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { useState } from "react";
import Icon from "react-native-ionicons";
import themeContext from "../src/themeContext";
import { format } from "date-fns";
import { EventRegister } from "react-native-event-listeners";

export const MainPage = () => {
  const [count, setCount] = useState([]);
  const [inputText, setInputText] = useState("");
  const theme = useContext(themeContext);
  const [dateFormat, setDateFormat] = useState('dd/MM/yy');
  const [sortFormat, setSortFormat] = useState("2");

  useEffect(() => {
    const listenerDateFormat = EventRegister.addEventListener(
      "ChangeDateFormat",
      (data) => {
        setDateFormat(data);
      }
    );
    return () => {
      EventRegister.removeEventListener(listenerDateFormat);
    };
  }, [dateFormat]);

  useEffect(() => {
    const listenerSortFormat = EventRegister.addEventListener(
      "ChangeSortFormat",
      (data) => {
        setSortFormat(data);
      }
    );
    return () => {
      EventRegister.removeEventListener(listenerSortFormat);
    };
  }, [sortFormat]);

  useEffect(() => {
    SortCounts(sortFormat);
  }, [count, sortFormat]);


  const UpdateCount = () => {
    if (inputText.length !== 0) {
      setCount((prev) => [
        ...prev,
        {
          id: prev.length > 0 ? Math.max(...prev.map(item => item.id)) + 1 : 1,
          date: new Date(),
          text: inputText,
        },
      ]);
      setInputText("");
    }
  };

  
  const SortCounts = (sortFormat) => {
    switch (sortFormat) {
      case "1":
        count.sort((a, b) => a.id - b.id);
        break;
      case "2":
        count.sort((a, b) => b.id - a.id);
        break;
      case "3":
        count.sort((a, b) => a.text.localeCompare(b.text));
        break;
      case "4":
        count.sort((a, b) => b.text.localeCompare(a.text));
        break;
      default:
        break;
    }
  };
  
  const DeleteCount = (id) => {
    const updatedCount = count.filter((item) => item.id !== id);
    setCount(updatedCount);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemBox}>
      <View style={{ width: "89%" }}>
        <Text key={item.id} style={[styles.text, { color: theme.textColor }]}>
          {item.text}
        </Text>
        <Text style={{ color: "grey", fontWeight: "300", fontSize: 15 }}>
          {format(new Date(item.date), dateFormat)}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => DeleteCount(item.id)}
        style={styles.deleteButton}
      >
        <Icon
          name="close"
          color={"#8B8E8F"}
          size={25}
          style={{ marginTop: 15 }}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.header}>
        <TextInput
          style={[styles.input, { color: theme.textColor }]}
          placeholder="Введите текст"
          placeholderTextColor="grey"
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity onPress={UpdateCount} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ width: "95%" }}
        data={count}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderColor: "gray",
    borderBottomWidth: 1,
    marginRight: 20,
    marginLeft: 20,
    margin: 30,
    paddingHorizontal: 8,
    fontSize: 20,
  },
  button: {
    marginBottom: 20,
    marginTop: 20,
    marginRight: 10,
    padding: 15,
    borderBottomColor: "#1C7FCE",
    borderBottomWidth: 1,
    borderRadius: 20,
    backgroundColor: "#2196F3",
    width: "20%",
  },
  buttonText: {
    color: "#eee",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  text: {
    fontSize: 20, // Размер шрифта 20
    fontWeight: "bold", // Жирный шрифт
    color: "white",
    marginLeft: -4,
    padding: 7,
  },

  deleteButton: {
    width: 40,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  itemBox: {
    flexDirection: "row",
    borderBottomColor: "#1C7FCE",
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 5,
    marginBottom: 5,
  },
});
