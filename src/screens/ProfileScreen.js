import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

const ProfileScreen = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="items-center px-4 py-8">
        {/* Profile Image */}
        <View className="mb-4">
          <Image
            source={{
              uri: "https://static.wikia.nocookie.net/jujutsu-kaisen/images/5/5a/Satoru_Gojo_arrives_on_the_battlefield_%28Anime%29.png/revision/latest?cb=20210226205256",
            }}
            className="w-32 h-32 rounded-full"
          />
        </View>

        {/* Name */}
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Verry Kurniawan
        </Text>
        <Text className="text-gray-500 mb-6">Mobile App Developer</Text>

        {/* Stats */}
        <View className="flex-row justify-around w-full mb-8">
          <View className="items-center">
            <Text className="text-xl font-bold text-blue-500">50</Text>
            <Text className="text-gray-600">Projects</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-blue-500">100</Text>
            <Text className="text-gray-600">Following</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-blue-500">200</Text>
            <Text className="text-gray-600">Followers</Text>
          </View>
        </View>

        {/* Info Cards */}
        <View className="w-full space-y-4">
          <View className="bg-gray-50 p-4 rounded-xl">
            <Text className="text-gray-600 mb-2">Email</Text>
            <Text className="text-gray-800">verryxyz@gmail.com</Text>
          </View>

          <View className="bg-gray-50 p-4 rounded-xl">
            <Text className="text-gray-600 mb-2">Location</Text>
            <Text className="text-gray-800">Indonesia</Text>
          </View>

          <View className="bg-gray-50 p-4 rounded-xl">
            <Text className="text-gray-600 mb-2">About</Text>
            <Text className="text-gray-800">
              Passionate mobile app developer specializing in React Native
              development. Love creating beautiful and functional applications.
            </Text>
          </View>
        </View>

        {/* Edit Profile Button */}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

// <TouchableOpacity
//   className="bg-blue-500 w-full rounded-xl py-4 mt-6"
//   onPress={() => {
//     /* Add edit profile functionality */
//   }}
// >
//   <Text className="text-white text-center font-semibold">
//     Edit Profile
//   </Text>
// </TouchableOpacity>
