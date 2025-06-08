import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import * as Location from "expo-location";

export default function IndexPage() {
  const router = useRouter();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const handleGetLocation = async () => {
    // Demander la permission pour accéder à la localisation
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission refusée", "Impossible d'accéder à la localisation.");
      return;
    }

    // Récupérer la localisation actuelle
    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);

    // Afficher la localisation dans une alerte
    Alert.alert(
      "Localisation actuelle",
      `Latitude: ${currentLocation.coords.latitude}\nLongitude: ${currentLocation.coords.longitude}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur BarcaMobile</Text>
      <Text style={styles.subtitle}>Choisissez une option pour continuer :</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/register")}
      >
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      {/* Bouton pour afficher la localisation */}
      <TouchableOpacity style={styles.button} onPress={handleGetLocation}>
        <Text style={styles.buttonText}>Afficher ma localisation</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e293b",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#facc15",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#9ca3af",
    marginBottom: 32,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
