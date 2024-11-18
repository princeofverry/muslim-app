import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const EditProfileScreen = ({ route, navigation }) => {
  const { profileData, updateProfile } = route.params;
  const [name, setName] = useState(profileData.name);
  const [role, setRole] = useState(profileData.role);
  const [email, setEmail] = useState(profileData.email);
  const [location, setLocation] = useState(profileData.location);
  const [about, setAbout] = useState(profileData.about);
  const [image, setImage] = useState(profileData.image);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    const updatedProfile = {
      name,
      role,
      email,
      location,
      about,
      image,
      stats: profileData.stats, // Preserve existing stats
    };

    updateProfile(updatedProfile);
    navigation.goBack();
    Alert.alert("Success", "Profile updated successfully!");
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {/* Profile Image */}
        <View className="items-center mb-6">
          <Image
            source={{ uri: image }}
            className="w-32 h-32 rounded-full mb-4"
          />
          <TouchableOpacity
            onPress={pickImage}
            className="bg-gray-100 px-4 py-2 rounded-lg"
          >
            <Text className="text-blue-500">Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View className="space-y-4">
          <View>
            <Text className="text-gray-600 mb-2">Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              className="bg-gray-50 p-4 rounded-xl"
              placeholder="Enter your name"
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-2">Role</Text>
            <TextInput
              value={role}
              onChangeText={setRole}
              className="bg-gray-50 p-4 rounded-xl"
              placeholder="Enter your role"
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-2">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              className="bg-gray-50 p-4 rounded-xl"
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-2">Location</Text>
            <TextInput
              value={location}
              onChangeText={setLocation}
              className="bg-gray-50 p-4 rounded-xl"
              placeholder="Enter your location"
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-2">About</Text>
            <TextInput
              value={about}
              onChangeText={setAbout}
              className="bg-gray-50 p-4 rounded-xl"
              placeholder="Tell us about yourself"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          className="bg-blue-500 w-full rounded-xl py-4 mt-6"
          onPress={handleSave}
        >
          <Text className="text-white text-center font-semibold">
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;
