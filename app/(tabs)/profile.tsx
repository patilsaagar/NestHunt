import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const profile = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <View>
        <Text className="text-2xl font-bold">Welcome to Profile!</Text>
      </View>
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({});
