// SurahDetailScreen.js
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
import { Ionicons } from "@expo/vector-icons";

export default function SurahDetailScreen({ route }) {
  const { surahNumber, name } = route.params;
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sound, setSound] = useState(null);
  const [bookmarks, setBookmarks] = useState([]); // State to hold bookmarks
  const navigation = useNavigation();

  useEffect(() => {
    fetchSurahDetail();
    return () => {
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
      // Load existing bookmarks from storage or state if necessary
    } catch (error) {
      console.error("Error fetching surah detail:", error);
      setError("Gagal memuat detail surah. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const playSound = async (audioUrl) => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: audioUrl,
    });
    setSound(newSound);
    await newSound.playAsync();
  };

  const toggleBookmark = (ayahNumber) => {
    setBookmarks((prevBookmarks) => {
      if (prevBookmarks.includes(ayahNumber)) {
        // Remove from bookmarks
        return prevBookmarks.filter((number) => number !== ayahNumber);
      } else {
        // Add to bookmarks
        return [...prevBookmarks, ayahNumber];
      }
    });
  };

  const renderAyah = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("AyahDetail", { ayah: item })}
    >
      <View className="p-4 border-b border-gray-200">
        <View className="mb-3 flex-row justify-between">
          <View className="w-8 h-8 bg-blue-500 rounded-full justify-center items-center">
            <Text className="text-white font-bold">{item.number.inSurah}</Text>
          </View>
          <TouchableOpacity
            onPress={() => toggleBookmark(item.number.inSurah)}
            className="flex-row items-center"
          >
            <Ionicons
              name={
                bookmarks.includes(item.number.inSurah)
                  ? "bookmark"
                  : "bookmark-outline"
              }
              size={24}
              color={bookmarks.includes(item.number.inSurah) ? "gold" : "gray"}
            />
          </TouchableOpacity>
        </View>

        <Text className="text-3xl text-right mb-4 font-arabic">
          {item.arab}
        </Text>
        <TouchableOpacity
          className="flex-row items-center mt-2"
          onPress={() => playSound(item.audio.alafasy)}
        >
          <Ionicons name="play-circle" size={24} color="#3B82F6" />
          <Text className="text-blue-500 ml-2">Play Sound</Text>
        </TouchableOpacity>
        <Text className="text-base text-gray-700 mb-2">{item.translation}</Text>
      </View>
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
      <View className="p-4 bg-blue-50">
        <Text className="text-xl font-bold text-center mb-2">{surah.name}</Text>
        <Text className="text-center text-gray-600 mb-1">
          {surah.translation}
        </Text>
        <Text className="text-center text-gray-500 mb-1">
          {surah.numberOfAyahs} Ayat • {surah.revelation}
        </Text>
      </View>

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
      <FlatList
        data={surah.ayahs}
        renderItem={renderAyah}
        keyExtractor={(item) => item.number.inQuran.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
