import React from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";

export default function AyahDetailScreen({ route }) {
  // Safely access the ayah parameter with a default empty object
  const { ayah = {} } = route?.params || {};

  // Early return with loading state if no ayah data
  if (!ayah) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#4B5563" />
      </View>
    );
  }

  // Early return with error state if ayah data is malformed
  if (typeof ayah !== "object") {
    return (
      <View className="flex-1 bg-white justify-center items-center p-4">
        <Text className="text-red-500 text-lg text-center">
          Error: Invalid ayah data format
        </Text>
      </View>
    );
  }

  // Safely access nested properties
  const {
    text: arabicText = "",
    translation = "",
    tafsir = "",
    number = {},
  } = ayah;

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Ayah number information */}
      <View className="mb-4">
        <Text className="text-gray-600">
          Ayah {number.inSurah} (Global: {number.inQuran})
        </Text>
      </View>

      {/* Arabic text and translation */}
      <View className="bg-blue-50 rounded-lg p-4 mb-4">
        <Text className="text-2xl text-right mb-4 font-arabic">
          {arabicText}
        </Text>
        <Text className="text-lg mb-2">{translation}</Text>
      </View>

      {/* Tafsir section */}
      <View className="bg-gray-50 rounded-lg p-4">
        <Text className="text-xl font-bold mb-2">Tafsir</Text>
        <Text className="text-base text-gray-800">{tafsir}</Text>
      </View>
    </ScrollView>
  );
}
