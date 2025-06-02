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

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const router = useRouter();

    const handleRegister = async () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
          Alert.alert("All fields are required");
          return;
        }
      
        try {
          const res = await axios.post("https://crud-api-development-backend.onrender.com/api/auth/register", {
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
          });
          login(res.data.token);
          router.replace("/home");
        } catch (err: any) {
          console.log("Registration error:", err.response?.data || err.message);
          Alert.alert("Registration Failed", err.response?.data?.message || "Something went wrong");
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
                        <Text style={styles.title}>Register</Text>
                        <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
                        <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
                        <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
                        <Button title="Register" onPress={handleRegister} />
                        <Text style={styles.link} onPress={() => router.push("/login")}>
                            Already have an account? Login here.
                        </Text>

                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
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
  