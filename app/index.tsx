import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/useAppwrite";

export default function LoginScreen() {
  const router = useRouter();
  const { refetch, isLoggedIn } = useGlobalContext();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/(tabs)");
    }
  }, [isLoggedIn]);

  const handleLogin = async () => {
    try {
      await login();
      refetch();
    } catch (error) {
      Alert.alert(
        "Login Failed",
        "Failed to login with Google. Please try again."
      );
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          resizeMode="contain"
          className="w-full h-4/6"
        />
        <View>
          <Text className="text-center text-black-400">
            Welcome to NestHunt
          </Text>
          <Text className="text-center text-3xl font-bold">
            Let's get started
          </Text>
          <TouchableOpacity
            className="bg-white shadow-md rounded-full p-6 m-6"
            onPress={handleLogin}
          >
            <View className="flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMethod="contain"
              />
              <Text className="ml-2 text-lg font-medium">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
