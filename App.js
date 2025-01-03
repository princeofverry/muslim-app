import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import { View, Image, Text } from "react-native";
import "./global.css";

import HomeScreen from "./src/screens/HomeScreen";
import SurahDetailScreen from "./src/screens/SurahDetailScreen";
import AyahDetailScreen from "./src/screens/AyahDetailScreen";
import PrayerTimesScreen from "./src/screens/PrayerTimesScreen";
import HadithScreen from "./src/screens/HadithScreen";
import HadithDetailScreen from "./src/screens/HadithDetailScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen";

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
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const prepare = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 second delay
      } finally {
        setIsLoading(false);
      }
    };

    prepare();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Image
          source={{
            uri: "https://play-lh.googleusercontent.com/cgSaQoRm2VI7Ugirpm3av_HNSYiECdRXfdk6t-gCLlzYiCBqWhraXCajpPFL_y41ow",
          }}
          className="w-full h-96"
          resizeMode="contain"
        />
        <Text className="mt-8 text-2xl font-bold">Muslim App</Text>
      </View>
    );
  }

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
            } else if (route.name === "Profile") {
              iconName = "user";
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
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Profile" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
