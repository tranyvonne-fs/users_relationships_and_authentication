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
  });
  