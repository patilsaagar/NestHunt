import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useGlobalContext } from "@/lib/useAppwrite";
import { router } from "expo-router";

export default function SignIn() {
  const { isLoggedIn } = useGlobalContext();

  React.useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Welcome! You are signed in!</Text>
      </View>
    </SafeAreaView>
  );
}