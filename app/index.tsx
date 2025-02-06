import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useRouter } from "expo-router"; // ✅ Import router for navigation
import images from "@/constants/images";
import icons from "@/constants/icons";
import { login } from "../lib/appwrite";
import { useGlobalContext } from "@/lib/useAppwrite";

function Index() {
  const router = useRouter();
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/signin");
    }
  }, [isLoggedIn]);

  const handleLogin = async () => {
    try {
      const result = await login();
      if (result) {
        refetch();
      }
    } catch (error) {
      console.error("Login failed:", error);
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
          <Text className="uppercase text-base text-center text-black-400">
            Welcome to your Nesthunt
          </Text>
          <Text className="text-black-400 text-center text-3xl font-rubik-bold">
            Let's get started
          </Text>
          <TouchableOpacity
            className="bg-white shadow-md rounded-full p-6 m-6"
            onPress={handleLogin}
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMethod="contain"
              />
              <Text className="ml-2 text-lg text-black-300 font-rubik-medium">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Index;
