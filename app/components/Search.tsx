import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import icons from "@/constants/icons";
import { useLocalSearchParams, usePathname } from "expo-router";

const Search = ({ onSearch }) => {
  const path = usePathname();
  const searchQuery = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(searchQuery.query || "");

  return (
    <View className="flex flex-row justify-between items-center w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2">
      <View className="flex-1 flex flex-row justify-start items-center z-50">
        <Image source={icons.search} className="size-5" />
        <TextInput
          className="text-sm font-rubik text-black-300 flex-1 ml-2"
          placeholder="Search for Something"
          value={search}
          onChangeText={(text) => {
            console.log("Search input:", text);
            setSearch(text);
            onSearch(text);
          }}
          onClear={() => {
            setSearch("");
            onSearch("");
          }}
        />
      </View>
      <TouchableOpacity onPress={() => onSearch(search)}>
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
