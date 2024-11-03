import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

export default function HadithScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHadithBooks();
  }, []);

  const fetchHadithBooks = async () => {
    try {
      const response = await axios.get("https://api.hadith.gading.dev/books");
      setBooks(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hadith books:", error);
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="bg-white p-4 rounded-lg shadow-sm mb-3 mx-4"
      onPress={() =>
        navigation.navigate("HadithDetail", {
          bookName: item.id,
          bookTitle: item.name,
        })
      }
    >
      <Text className="text-lg font-bold mb-1">{item.name}</Text>
      <Text className="text-gray-600">Total: {item.available} hadits</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerClassName="py-4"
      />
    </View>
  );
}
