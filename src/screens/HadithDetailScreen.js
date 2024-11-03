import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";

export default function HadithDetailScreen({ route }) {
  const { bookName, bookTitle } = route.params;
  const [hadiths, setHadiths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentRange, setCurrentRange] = useState({ start: 1, end: 20 });

  useEffect(() => {
    fetchHadiths();
  }, [currentRange]);

  const fetchHadiths = async () => {
    try {
      const response = await axios.get(
        `https://api.hadith.gading.dev/books/${bookName}?range=${currentRange.start}-${currentRange.end}`
      );
      setHadiths((prev) => [...prev, ...response.data.data.hadiths]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hadiths:", error);
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View className="bg-white p-4 rounded-lg shadow-sm mb-3 mx-4">
      <Text className="text-lg font-bold mb-2">Hadits No. {item.number}</Text>
      <Text className="text-right text-xl mb-3 font-arabic">{item.arab}</Text>
      <Text className="text-gray-800 mb-2">{item.id}</Text>
    </View>
  );

  const handleLoadMore = () => {
    if (!loading) {
      setCurrentRange((prev) => ({
        start: prev.end + 1,
        end: prev.end + 20,
      }));
    }
  };

  if (loading && hadiths.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <FlatList
        data={hadiths}
        renderItem={renderItem}
        keyExtractor={(item) => item.number.toString()}
        contentContainerClassName="py-4"
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
      />
    </View>
  );
}
