import React = require("react");
import { TouchableOpacity, View, Image, Text } from "react-native";
import { CardsProps } from "./Cards";
import icons from "@/constants/icons";

export default function FeaturedCard({ property, onPress }: CardsProps) {
  return (
    <View>
      <TouchableOpacity className="flex flex-col items-start w-60 h-80 relative">
        <Image
          source={{ uri: property?.image || "" }}
          className="size-full rounded-2xl"
        />
        <Image
          source={require("@/constants/images").cardGradient}
          className="size-full rounded-2xl absolute bottom-0"
        />
        <View className="flex flex-row items-center px-3 py-1.5 bg-white top-5 right-5 absolute rounded-full">
          <Image source={icons.star} className="size-5" />
          <Text className="text-xs font-rubik-bold">
            {property?.rating || "4.4"}
          </Text>
        </View>
        <View className="flex flex-col absolute bottom-5 inset-x-5">
          <Text className="text-xl font-rubik-extrabold text-white">
            {property?.name || "Modern Apartment"}
          </Text>
          <Text className="text-base font-rubik text-white">
            {property?.address || "New York, USA"}
          </Text>
          <View className="flex flex-row justify-between">
            <Text className="text-xl font-rubik-extrabold text-white">
              ${property?.price || "400"}
            </Text>
            <Image source={icons.heart} className="size-5" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
