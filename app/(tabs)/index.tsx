import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import Search from "../components/Search";
import FeaturedCard, { Cards } from "../components/Cards";
import Filters from "../components/Filters";
import { useGlobalContext } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { user } = useGlobalContext();
  const [latestProperties, setLatestProperties] = useState([]);
  const [recommendedProperties, setRecommendedProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const latest = await getLatestProperties();
      const recommended = await getProperties({
        filter: "All",
        query: "",
        limit: 10,
      });

      setLatestProperties(latest);
      setRecommendedProperties(recommended);
      setAllProperties(recommended);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleSearch = (query) => {
    setSearch(query);

    if (!query) {
      setRecommendedProperties(allProperties);
      return;
    }

    const filteredProperties = allProperties.filter((property) =>
      property.name.toLowerCase().includes(query.toLowerCase())
    );

    console.log("Filtered Properties:", filteredProperties);
    setRecommendedProperties(filteredProperties);
  };

  const handleCardPress = (id) => {
    try {
      router.push(`/properties/${id}`);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <SafeAreaView>
      <FlatList
        data={recommendedProperties}
        renderItem={({ item }) => (
          <Cards property={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row justify-between">
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start ml-2">
                  <Text>Good Morning</Text>
                  <Text className="font-rubik-medium">{user?.name}</Text>
                </View>
              </View>
              <Image
                source={require("@/constants/icons").bell}
                className="size-6"
              />
            </View>
            <Search onSearch={handleSearch} />
            <View className="my-5">
              <View className="flex flex-row justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="font-rubik-bold text-sm text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={latestProperties}
                renderItem={({ item }) => <FeaturedCard property={item} />}
                keyExtractor={(item) => item.$id}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-5 mt-5"
              />
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-xl font-rubik-bold text-black-300">
                Our Recommendations
              </Text>
              <TouchableOpacity>
                <Text className="font-rubik-bold text-sm text-primary-300">
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <Filters />
          </View>
        }
      />
    </SafeAreaView>
  );
}
