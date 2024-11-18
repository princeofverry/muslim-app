import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";
import axios from "axios";

export default function PrayerTimesScreen() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState({
    name: "Jakarta",
    lat: -6.2,
    lng: 106.816666,
  });
  const [modalVisible, setModalVisible] = useState(false);

  // Daftar kota-kota besar di Indonesia
  const cities = [
    { name: "Jakarta", lat: -6.2, lng: 106.816666 },
    { name: "Surabaya", lat: -7.2496, lng: 112.7507 },
    { name: "Bandung", lat: -6.914744, lng: 107.60981 },
    { name: "Medan", lat: 3.597031, lng: 98.678513 },
    { name: "Semarang", lat: -6.966667, lng: 110.416664 },
    { name: "Yogyakarta", lat: -7.797068, lng: 110.370529 },
    { name: "Makassar", lat: -5.147665, lng: 119.432731 },
    { name: "Palembang", lat: -2.976074, lng: 104.77536 },
    { name: "Depok", lat: -6.402484, lng: 106.794243 },
    { name: "Bekasi", lat: -6.23827, lng: 106.975571 },
    { name: "Tangerang", lat: -6.178306, lng: 106.631889 },
    { name: "Bogor", lat: -6.597147, lng: 106.806039 },
  ];

  useEffect(() => {
    fetchPrayerTimes(selectedCity.lat, selectedCity.lng);
  }, [selectedCity]);

  const fetchPrayerTimes = async (latitude, longitude) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=11`
      );
      setPrayerTimes(response.data.data.timings);
    } catch (error) {
      console.error("Error fetching prayer times:", error);
      Alert.alert(
        "Error",
        "Gagal mengambil jadwal sholat. Silakan coba lagi nanti.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  const prayerNames = {
    Fajr: "Subuh",
    Sunrise: "Terbit",
    Dhuhr: "Dzuhur",
    Asr: "Ashar",
    Maghrib: "Maghrib",
    Isha: "Isya",
  };

  const CitySelector = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="flex-1 justify-end">
        <View className="bg-white rounded-t-3xl">
          <View className="p-4 border-b border-gray-200">
            <Text className="text-xl font-bold text-center">Pilih Kota</Text>
          </View>
          <ScrollView className="max-h-96">
            {cities.map((city) => (
              <TouchableOpacity
                key={city.name}
                className="p-4 border-b border-gray-100"
                onPress={() => {
                  setSelectedCity(city);
                  setModalVisible(false);
                }}
              >
                <Text className="text-lg">
                  {city.name}
                  {city.name === selectedCity.name && " ✓"}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            className="p-4 bg-gray-100"
            onPress={() => setModalVisible(false)}
          >
            <Text className="text-center text-lg text-blue-600">Tutup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <CitySelector />

      <Text className="text-2xl font-bold text-center mb-2">Jadwal Sholat</Text>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="flex-row justify-center items-center mb-6"
      >
        <Text className="text-lg text-center text-blue-600">
          {selectedCity.name} 📍
        </Text>
      </TouchableOpacity>

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
