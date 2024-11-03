import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";

export default function SurahDetailScreen({ route }) {
  const { surahNumber, name } = route.params;
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sound, setSound] = useState(null); // Audio state
  const navigation = useNavigation();

  useEffect(() => {
    fetchSurahDetail();
    return () => {
      // Unload sound when component unmounts
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [surahNumber]);

  const fetchSurahDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `https://quran-api-id.vercel.app/surahs/${surahNumber}`
      );
      setSurah(response.data);
    } catch (error) {
      console.error("Error fetching surah detail:", error);
      setError("Gagal memuat detail surah. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const playSound = async (audioUrl) => {
    // Stop any currently playing sound
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }

    // Load new sound
    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: audioUrl,
    });
    setSound(newSound);
    await newSound.playAsync();
  };

  const renderAyah = ({ item }) => (
    <TouchableOpacity
      className="p-4 border-b border-gray-200"
      onPress={() => playSound(item.audio.alafasy)} // Play audio on press
    >
      <View className="mb-3 flex-row justify-between">
        <View className="w-8 h-8 bg-blue-500 rounded-full justify-center items-center">
          <Text className="text-white font-bold">{item.number.inSurah}</Text>
        </View>
        <Text className="text-gray-500">#{item.number.inQuran}</Text>
      </View>

      <Text className="text-2xl text-right mb-4 font-arabic">{item.arab}</Text>
      <Text className="text-base text-gray-700">{item.translation}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 text-center mb-4">{error}</Text>
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-lg"
          onPress={fetchSurahDetail}
        >
          <Text className="text-white">Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!surah) {
    return null;
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header Info */}
      <View className="p-4 bg-blue-50">
        <Text className="text-xl font-bold text-center mb-2">{surah.name}</Text>
        <Text className="text-center text-gray-600 mb-1">
          {surah.translation}
        </Text>
        <Text className="text-center text-gray-500 mb-1">
          {surah.numberOfAyahs} Ayat • {surah.revelation}
        </Text>
      </View>

      {/* Bismillah */}
      {surah.bismillah && (
        <View className="p-4 border-b border-gray-200">
          <Text className="text-2xl text-center mb-2 font-arabic">
            {surah.bismillah.arab}
          </Text>
          <Text className="text-center text-gray-600">
            {surah.bismillah.translation}
          </Text>
        </View>
      )}

      {/* List of Ayahs */}
      <FlatList
        data={surah.ayahs}
        renderItem={renderAyah}
        keyExtractor={(item) => item.number.inQuran.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
