import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Impor ikon pencarian

export default function HomeScreen() {
  const [surahs, setSurahs] = useState([]);
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    fetchSurahs();
  }, []);

  const fetchSurahs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        "https://quran-api-id.vercel.app/surahs"
      );
      setSurahs(response.data);
      setFilteredSurahs(response.data);
    } catch (error) {
      console.error("Error fetching surahs:", error);
      setError("Failed to load surahs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filtered = surahs.filter((surah) =>
        surah.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSurahs(filtered);
    } else {
      setFilteredSurahs(surahs);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="p-4 border-b border-gray-200"
      onPress={() =>
        navigation.navigate("SurahDetail", {
          surahNumber: item.number,
          name: item.name,
        })
      }
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-blue-500 rounded-full justify-center items-center mr-3">
            <Text className="text-white font-bold">{item.number}</Text>
          </View>
          <View>
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text className="text-gray-600">{item.translation}</Text>
          </View>
        </View>
        <View className="items-end">
          <Text className="text-gray-500">{item.numberOfAyahs} ayat</Text>
          <Text className="text-gray-400 text-sm">{item.revelation}</Text>
        </View>
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
          onPress={fetchSurahs}
        >
          <Text className="text-white">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center m-4 border border-gray-300 rounded-2xl">
        <Icon name="search" size={24} color="#3B82F6" style={{ margin: 10 }} />
        <TextInput
          placeholder="Search surah..."
          value={searchQuery}
          onChangeText={handleSearch}
          className="flex-1 p-2"
          style={{ height: 40 }} // Set height for the search bar
        />
      </View>
      <FlatList
        data={filteredSurahs}
        renderItem={renderItem}
        keyExtractor={(item) => item.number.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
