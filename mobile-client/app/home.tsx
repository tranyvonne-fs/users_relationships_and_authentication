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
      <Button title="Logout" onPress={() => { logout(); router.replace("/login"); }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff0f5", // light pink/lavender tone
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6a0dad", // royal purple
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "#f3e5f5",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#dda0dd", // plum
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#ffffffcc", // semi-transparent white
    fontSize: 16,
  },
  button: {
    backgroundColor: "#9370db", // medium purple
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  link: {
    marginTop: 16,
    textAlign: "center",
    color: "#4169e1",
    textDecorationLine: "underline",
  },
  card: {
    backgroundColor: "#fdf5ff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4b0082", // indigo
  },
});
