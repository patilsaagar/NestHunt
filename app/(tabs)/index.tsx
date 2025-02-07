import icons from "@/constants/icons";
import images from "@/constants/images";
import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Search from "../components/Search";
import FeaturedCard, { Cards } from "../components/Cards";
import Filters from "../components/Filters";
import { useGlobalContext } from "@/lib/useAppwrite";

export default function HomeScreen() {

  const { user } = useGlobalContext()
  return (
    <SafeAreaView>
      {
        <FlatList
          data={[1, 2]}
          renderItem={(item) => <Cards />}
          keyExtractor={(item) => item.toString()}
          numColumns={2}
          contentContainerClassName="pb-32"
          columnWrapperClassName="glex gap-5 px-5"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View className="px-5">
              <View className="flex flex-row justify-between">
                <View className="flex flex-row items-center">
                  <Image
                    source= {{uri:user?.avatar}}
                    className="size-12 rounded-full"
                  ></Image>
                  <View className="flex flex-col items-start ml-2 justify-content">
                    <Text>Good Morning</Text>
                    <Text className="font-rubik-medium">{user?.name}</Text>
                  </View>
                </View>
                <Image source={icons.bell} className="size-6"></Image>
              </View>
              <Search />
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
                  data={[1, 2, 3]}
                  renderItem={(item) => <FeaturedCard />}
                  keyExtractor={(item) => item.toString()}
                  horizontal
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex gap-5 mt-5"
                />
              </View>
              <View className="flex flex-row justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Our Recommendtion
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
      }
    </SafeAreaView>
  );
}
