import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import WhiteBox from "@/components/WhiteBox";
import BlueButton from "@/components/BlueButton";

export default function HomeScreen() {
  const navigation = useNavigation();
  const clientQuery = useQueryClient();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch("http://localhost:3000/api/users/login/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
          throw new Error('Login failed')
      }
    },
    onSuccess() {
      clientQuery.invalidateQueries({ queryKey: ["getUser"] });
      navigation.navigate("Football");
    },
    onError(error: any) {
      Alert.alert("Erreur de connexion", error.message);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CONNEXION</Text>

      <WhiteBox>
        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password (min. 8 characters)"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <BlueButton onPress={() => login.mutate()} disabled={login.isPending}>
            {login.isPending ? "Connexion..." : "Log in"}
          </BlueButton>

          <View style={styles.bottomText}>
            <Text style={styles.text}>Not a member yet?</Text>
            <Pressable onPress={() => navigation.navigate("NewAccount")}>
              <Text style={styles.link}> Create an account</Text>
            </Pressable>
          </View>
        </View>
      </WhiteBox>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "black",
    flex: 1,
  },
  title: {
    fontSize: 32,
    color: "#0ea5e9",
    textAlign: "center",
    marginVertical: 24,
    fontWeight: "300",
    textTransform: "uppercase",
  },
  form: {
    gap: 16,
  },
  label: {
    color: "#0ea5e9",
    fontWeight: "500",
    marginBottom: 4,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    color: "black",
  },
  bottomText: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  text: {
    color: "#555",
    fontSize: 14,
  },
  link: {
    color: "#0ea5e9",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
