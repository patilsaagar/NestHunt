import React from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import icons from "@/constants/icons";
import { Models } from "react-native-appwrite";

export interface CardsProps {
  property: Models.Document;
  onPress?: () => void;
}
const Cards = ({ property, onPress }: CardsProps) => {
  return (
    <TouchableOpacity
      className="flex-1 w-full mt-4 py-4 px-3 rounded-lg shadow-lg bg-white shadow-black-100/70 relative"
      onPress={onPress}
    >
      <View className="flex flex-row absolute mt-5 bg-white/90 p-1 rounded-full z-50 op-5 right-5 items-center">
        <Image source={icons.star} className="size-2.5" />
        <Text className="text-xs font-rubik-bold ml-1">
          {property?.rating || "4.4"}
        </Text>
      </View>

      <Image
        source={{ uri: property?.image || "" }}
        className="w-full h-40 rounded-lg"
      />
      <View className="flex flex-col mt-2">
        <Text className="text-xl font-rubik-extrabold text-black">
          {property?.name || "Cozy Studio"}
        </Text>
        <Image source={icons.heart} className="size-5" />
      </View>
      <Text className="text-xl font-rubik text-black">
        {property?.address || "New York, USA"}
      </Text>
      <View className="flex flex-row justify-between">
        <Text className="text-xl text-primary-300">
          ${property?.price || "400"}
        </Text>
        <Image source={icons.heart} className="size-5" />
      </View>
    </TouchableOpacity>
  );
};

export default Cards;
