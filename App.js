// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import "./global.css";

import HomeScreen from "./src/screens/HomeScreen";
import SurahDetailScreen from "./src/screens/SurahDetailScreen";
import AyahDetailScreen from "./src/screens/AyahDetailScreen";
import PrayerTimesScreen from "./src/screens/PrayerTimesScreen";
import HadithScreen from "./src/screens/HadithScreen";
import HadithDetailScreen from "./src/screens/HadithDetailScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function QuranStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="QuranHome"
        component={HomeScreen}
        options={{ title: "Al-Quran Digital" }}
      />
      <Stack.Screen
        name="SurahDetail"
        component={SurahDetailScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen
        name="AyahDetail"
        component={AyahDetailScreen}
        options={{ title: "Detail Ayat" }}
      />
      <Stack.Screen
        name="HadithDetail"
        component={HadithDetailScreen}
        options={({ route }) => ({ title: route.params.bookTitle })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Quran") {
              iconName = "book";
            } else if (route.name === "Prayer") {
              iconName = "clock";
            } else if (route.name === "Hadith") {
              iconName = "bookmark";
            }

            return <Feather name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#3b82f6",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Quran"
          component={QuranStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Prayer"
          component={PrayerTimesScreen}
          options={{ title: "Jadwal Sholat" }}
        />
        <Tab.Screen
          name="Hadith"
          component={HadithScreen}
          options={{ title: "Hadits" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
