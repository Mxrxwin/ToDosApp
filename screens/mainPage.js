import React, { useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    TextInput
  } from "react-native";
import { useState } from "react";
import Icon from "react-native-ionicons";
import themeContext from "../theme/themeContext";

export const MainPage = () => {
    const [count, setCount] = useState([]);
    const [inputText, setInputText] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const theme = useContext(themeContext);


    const UpdateCount = () => {
      if (inputText.length != 0) {
        const newItem = {
          id: Date.now(),
          text: inputText,
        };
        setCount((prev) => [...prev, newItem]);
        setInputText("");
      }
    };
  
    const DeleteCount = (id) => {
      const updatedCount = count.filter(item => item.id !== id);
      setCount(updatedCount);
    }
    
    const renderItem = ({ item }) => (
      <View style={styles.itemBox}>
        <View style={{ width: "89%"}}>
          <Text key={item.id} style={[styles.text, {color: theme.textColor}]}>
            {item.text}
          </Text>
          <Text style={{color: 'grey', fontWeight: '300', fontSize: 15}}> {new Date(item.id).toString().substr(4, 20)} </Text>
        </View>
        <TouchableOpacity onPress={() => DeleteCount(item.id)} style={styles.deleteButton}>
          <Icon name="close" color={'#8B8E8F'} size={25} style={{marginTop:15}}/>
        </TouchableOpacity>
      </View>
    );  
  
    return (
      <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
        <View style={styles.header}>
          <TextInput
            style={[styles.input, {color: theme.textColor}]}
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
  }
  
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
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginBottom: 10,
    }, 
    itemBox: {
      flexDirection: 'row', 
      borderBottomColor: "#1C7FCE", 
      borderBottomWidth: 1,
      marginLeft:10, 
      marginRight:5, 
      marginBottom:5
    }
})