import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
} from "react-native";
import React from "react";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/lib/useAppwrite";
import { logout } from "@/lib/appwrite";
import { router } from "expo-router";

interface SettingItemsProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const ProfileSettingOptions = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingItemsProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-4"
    >
      <View className="flex-row items-center gap-3">
        <Image source={icon} className="size-6" />
        <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}}`}>
          {title}
        </Text>
      </View>
      {showArrow && <Image source={icons.rightArrow} className="size-5" />}
    </TouchableOpacity>
  );
};

const profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Alert.alert("Success", "You have been logged out successfully");
      refetch();
      router.replace("/signin");
    } else {
      Alert.alert("Error", "An error occurred while logging out");
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5"></Image>
        </View>
        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{uri: user?.avatar}}
              className="size-44 relative rounded-full"
            ></Image>
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
            <Text className="text-2xl">{user?.name}</Text>
          </View>
        </View>
        <View className="flex flex-col mt-10 ">
          <ProfileSettingOptions icon={icons.calendar} title="My Bookings" />
          <ProfileSettingOptions icon={icons.wallet} title="Payments" />
        </View>
        <View className="flex flex-col mt-5 order-5 pt-5">
          {settings.slice(2).map((item, index) => (
            <ProfileSettingOptions key={index} {...item} />
          ))}
        </View>
        <View className="flex flex-col mt-5 order-5 pt-5">
          <ProfileSettingOptions
            icon={icons.logout}
            showArrow={false}
            title="Logout"
            textStyle="text-danger"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({});
