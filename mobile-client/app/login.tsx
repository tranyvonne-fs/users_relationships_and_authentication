import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const res = await axios.post("https://crud-api-development-backend.onrender.com/api/auth/login", {
                email,
                password,
            });
            login(res.data.token);
            router.replace("/home");
        } catch (err: any) {
            Alert.alert("Login Failed", err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20 }}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Login</Text>
                        <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
                        <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
                        <Button title="Login" onPress={handleLogin} />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
  
