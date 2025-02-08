import React from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import icons from "@/constants/icons";
import { Models } from "react-native-appwrite";

interface CardsProps {
  property: Models.Document;
  onPress?: () => void;
}
export const Cards = ({ property, onPress }: CardsProps) => {
  return (
    <TouchableOpacity className="flex-1 w-full mt-4 py-4 px-3 rounded-lg shadow-lg bg-white shadow-black-100/70 relative" onPress={onPress}>
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
