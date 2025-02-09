import { SafeAreaView, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { getProperties } from "@/lib/appwrite";
import { Cards } from "../components/Cards";

const Explore = () => {
  const [recommendedProperties, setRecommendedProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const recommended = await getProperties({
        filter: "All",
        query: "",
        limit: 10,
      });

      setRecommendedProperties(recommended);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  return <SafeAreaView></SafeAreaView>;
};

export default Explore;
