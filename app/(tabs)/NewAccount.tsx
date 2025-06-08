import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import WhiteBox3 from "@/components/WhiteBox3";
import { useNavigation } from "expo-router";
import BlueButton from "@/components/BlueButton";
import { useMutation } from "@tanstack/react-query";

export default function NewAccount() {
  const navigation = useNavigation();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const register = useMutation({
    mutationFn: async () => {
      if (!username || !password || !confirmPassword) {
        throw new Error("All fields are required");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error("Registration failed");
      }
    },
    onSuccess() {
      Alert.alert("Success", "Account created");
      navigation.navigate("Login");
    },
    onError(error: any) {
      Alert.alert("Registration error", error.message);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      <WhiteBox3>
        <View style={styles.field}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            placeholder="Choose a username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Create a password (min. 8 characters)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>

        <BlueButton onPress={() => register.mutate()} disabled={register.isPending}>
          {register.isPending ? "Connexion..." : "Create my account"}
        </BlueButton>
        

        <Text style={styles.footer}>
          Already have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
          >
            Log in
          </Text>
        </Text>
      </WhiteBox3>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  title: {
    fontSize: 32,
    color: "#0ea5e9",
    fontWeight: "300",
    textTransform: "uppercase",
    marginBottom: 32,
    textAlign: "center",
  },
  field: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    color: "#0369a1",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#0ea5e9",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 16,
    color: "#555",
    fontSize: 14,
    textAlign: "center",
  },
  link: {
    color: "#0ea5e9",
    textDecorationLine: "underline",
  },
});
