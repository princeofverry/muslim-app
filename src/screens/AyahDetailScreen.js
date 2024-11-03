import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

const AyahDetailScreen = ({ route }) => {
  const { ayah } = route.params;
  const [sound, setSound] = useState();

  const playAudio = async (audioUrl) => {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: audioUrl,
    });
    setSound(newSound);
    await newSound.playAsync();
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <ScrollView className="p-4 bg-white">
      <View className="mb-4">
        <Text className="text-lg font-bold">Nomor Ayat:</Text>
        <Text>
          Pada Al Qur'an{" "}
          {` ${ayah.number.inQuran} pada surah ${ayah.number.inSurah}`}
        </Text>
      </View>
      <View className="mb-4">
        <Text className="text-lg font-bold">Teks Arab:</Text>
        <Text className="text-2xl text-center font-serif">{ayah.arab}</Text>
      </View>
      <View className="mb-4">
        <Text className="text-lg font-bold">Terjemahan:</Text>
        <Text className="text-md">{ayah.translation}</Text>
      </View>
      <View className="mb-4">
        <Text className="text-lg font-bold">Tafsir:</Text>
        <Text className="text-md">{ayah.tafsir.kemenag.long}</Text>
      </View>
      <View className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
        <Text className="text-lg font-bold text-gray-800 mb-2">
          Play Audio:
        </Text>
        {Object.entries(ayah.audio).map(([key, url]) => (
          <TouchableOpacity
            key={key}
            className="bg-[#3B82F6] py-2 px-4 rounded-lg mb-2"
            onPress={() => playAudio(url)}
          >
            <Text className="text-white text-center font-semibold">{`Play ${key}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default AyahDetailScreen;
