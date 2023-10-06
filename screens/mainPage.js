import React from "react";
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

export const MainPage = () => {
    const [count, setCount] = useState([]);
    const [inputText, setInputText] = useState("");
    
  
    const UpdateCount = () => {
      if (inputText.length != 0) {
        const newItem = {
          id: Date.now().toString(),
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
      <View style={{ flexDirection: 'row', borderBottomColor: "#1C7FCE", borderBottomWidth: 1, marginLeft:10, marginBottom:5 }}>
        <Text key={item.id} style={styles.text}>
          {item.text}
        </Text>
        <TouchableOpacity onPress={() => DeleteCount(item.id)} style={styles.deleteButton}>
          <Icon name="close" color={'#8B8E8F'} size={25} style={{marginTop:15}}/>
        </TouchableOpacity>
      </View>
    );  
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput
            style={styles.input}
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
      flex: 1, // Занимает всю доступную ширину и высоту
      justifyContent: "flex-start", // Выравнивание по центру по вертикали
      alignItems: "center", // Выравнивание по центру по горизонтали
      backgroundColor: "#15222C",
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
      color: "white",
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
      width: "89%",
      padding: 10,
    },  
    
    deleteButton: {
      borderRadius: 15,
      width: 40,
      height: 40,
      justifyContent: 'center', // Центрируем содержимое по вертикали
      alignItems: 'center', // Центрируем содержимое по горизонтали
    },
})