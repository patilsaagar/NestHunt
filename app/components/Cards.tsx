import { StyleSheet, Image, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";

export default function FeaturedCard() {
  return (
    <View>
      <TouchableOpacity className="flex flex-col items-start w-60 h-80 relative">
        <Image source={images.japan} className="size-full rounded-2xl" />
        <Image
          source={images.cardGradient}
          className="size-full rounded-2xl absolute ttom-0"
        />
        <View className="flex flex-row items-center px-3 py-1.5 bg-white top-5 right-5 absolute rounded-full">
          <Image source={icons.star} className="size-5"></Image>
          <Text className="text-xs font-rubik-bold">4.4</Text>
        </View>
        <View className="flex flex-col absolute bottom-5 inset-x-5">
          <Text className="text-xl font-rubik-extrabold text-white">
            Modern apartment
          </Text>
          <Text className="text-xl font-rubik  text-white">New york usa</Text>
          <View className="flex flex-row justify-between">
            <Text className="text-xl font-rubik-extrabold  text-white">
              $400
            </Text>
            <Image source={icons.heart} className="size-5"></Image>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});

export const Cards = () => {
  return (
    <TouchableOpacity className="flex-1 w-full mt-4 py-4 px-3 rounded-lg shadow-lg bg-white shadow-black-100/70 relative">
      <View className="flex flex-row absolute mt-5 bg-white/90 p-1 rounded-full z-50 op-5 right-5 items-center">
        <Image source={icons.star} className="size-2.5" />
        <Text className="text-xs font-rubik-bold ml-1">4.4</Text>
      </View>

      <Image source={images.newYork} className="w-full h-40 rounded-lg"></Image>
      <View className="flex flex-col mt-2">
        <Text className="text-xl font-rubik-extrabold text-black">
          Cozy Studio
        </Text>
        <Image source={icons.heart} className="size-5"></Image>
      </View>
      <Text className="text-xl font-rubik  text-bla">New york usa</Text>
      <View className="flex flex-row justify-between">
        <Text className="text-xl text-primary-300">$400</Text>
        <Image source={icons.heart} className="size-5"></Image>
      </View>
    </TouchableOpacity>
  );
};
