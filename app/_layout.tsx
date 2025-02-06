import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import "./global.css";
import { GlobalProvider } from "@/lib/useAppwrite";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <GlobalProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="signin" />
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            // This prevents the (tabs) text from showing in the header
            title: ""
          }} 
        />
      </Stack>
    </GlobalProvider>
  );
}
