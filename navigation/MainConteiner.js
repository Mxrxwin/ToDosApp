import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-ionicons";
import * as Font from 'expo-font';

import { MainPage } from "../screens/mainPage";
import SettingsPage from "../screens/SettingsPage";
import PersonalInfoPage from "../screens/PersonalnfoPage";

const mainName = 'Notes';
const settingsName = 'Settings';
const PersonalInfoName = 'Personal';

const Tab = createBottomTabNavigator();

const loadFonts = async () => {
  await Font.loadAsync({
    Ionicons: require('react-native-ionicons/fonts/Ionicons.ttf'),
  });
}

export default function MainContainer() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFontAsync = async () => {
      await loadFonts();
      setFontLoaded(true);
    };

    loadFontAsync();
  }, []);

  if (!fontLoaded) {
    return null; // Ждем загрузки шрифта, чтобы избежать ошибок
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={mainName}
        screenOptions={({}) => ({
            headerShown: false,
            tabBarStyle: {backgroundColor: '#475E70', height: 60},
            tabBarInactiveTintColor: '#B5B9BB',
            tabBarShowLabel: false,
        })}>

        
        <Tab.Screen name={mainName} component={MainPage} options={{
            tabBarIcon: ({color, size}) => (
                <Icon name="home" color={color} size={32} />
            )
        }} />
        <Tab.Screen name={PersonalInfoName} component={PersonalInfoPage} options={{
            tabBarIcon: ({color, size}) => (
                <Icon name="person" color={color} size={32} />
            )
        }} />
        <Tab.Screen name={settingsName} component={SettingsPage} options={{
            tabBarIcon: ({color, size}) => (
                <Icon name="settings" color={color} size={32} />
            )
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
