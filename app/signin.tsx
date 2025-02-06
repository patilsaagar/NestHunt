import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useGlobalContext } from "@/lib/useAppwrite";
import { useRouter } from "expo-router"; // ✅ Corrected import
import { logout } from "@/lib/appwrite";

export default function SignIn() {
  const { isLoggedIn, refetch } = useGlobalContext();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isMounted && isLoggedIn === false) {
      router.replace("/");
    }
    return () => setIsMounted(false); 
  }, [isLoggedIn, isMounted]);

  const handleLogout = async () => {
    await logout();
    refetch(); 
    router.replace("/");
  };

  if (isLoggedIn === null) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Welcome! You are signed in!</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            padding: 10,
            marginTop: 20,
            borderRadius: 5,
          }}
          onPress={handleLogout}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
