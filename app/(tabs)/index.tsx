import React from "react";
import { SafeAreaView, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <View>
        <Text className="text-2xl font-bold">Welcome to Home!</Text>
      </View>
    </SafeAreaView>
  );
}
