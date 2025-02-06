import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import images from "@/constants/images";
import icons from "@/constants/icons";

export default function Index() {
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
            Let's get start
          </Text>
          <TouchableOpacity className="bg-white shadow-md rounded-full p-6 m-6">
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMethod="contain"
              ></Image>
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
