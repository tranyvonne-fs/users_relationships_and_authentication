import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";

export default function Home() {

  type Character = {
    _id: string;
    name: string;
    franchise: string;
    yearRelease: string | number;
  };

  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get("https://crud-api-development-backend.onrender.com/api/characters", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCharacters(res.data);
      } catch (err: any) {
        console.error("Error fetching characters:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disney Characters</Text>
      <Button title="Logout" onPress={() => { logout(); router.replace("/login"); }} />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={characters}
          keyExtractor={(item: Character) => item._id}

          renderItem={({ item }: { item: Character }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.franchise}</Text>
              <Text>{item.yearRelease}</Text>
            </View>
          )}

        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffaf0", // soft cream
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#5d3fd3", // royal purple
    marginBottom: 20,
    textShadowColor: "#dabfff",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d8bfd8", // thistle
    backgroundColor: "#ffffffcc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  link: {
    marginTop: 10,
    color: "#4169e1", // royal blue
    textAlign: "center",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  card: {
    backgroundColor: "#fff0f5", // light pink
    padding: 16,
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: "#dcd0ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: "100%",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#9932cc", // amethyst
    marginBottom: 4,
  },  
});
