import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import axios from "axios";

export default function PrayerTimesScreen() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  const fetchPrayerTimes = async () => {
    try {
      const response = await axios.get(
        "https://api.aladhan.com/v1/timingsByCity?city=Jakarta&country=Indonesia&method=11"
      );
      setPrayerTimes(response.data.data.timings);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching prayer times:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const prayerNames = {
    Fajr: "Subuh",
    Sunrise: "Terbit",
    Dhuhr: "Dzuhur",
    Asr: "Ashar",
    Maghrib: "Maghrib",
    Isha: "Isya",
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-center mb-6">
        Jadwal Sholat Jakarta
      </Text>
      {prayerTimes &&
        Object.entries(prayerNames).map(([key, label]) => (
          <View
            key={key}
            className="flex-row justify-between items-center bg-blue-50 p-4 rounded-lg mb-3"
          >
            <Text className="text-lg font-semibold">{label}</Text>
            <Text className="text-lg">{prayerTimes[key]}</Text>
          </View>
        ))}
    </ScrollView>
  );
}
