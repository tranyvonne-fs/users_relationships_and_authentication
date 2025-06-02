import React from "react";
import { AuthProvider } from "./App/context/AuthContext";
import AppNavigator from "./App/navigation/AppNavigator";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
