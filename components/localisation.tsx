import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";

export default function LocationManager() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission pour accéder à la localisation refusée.");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };

    requestLocationPermission();
  }, []);

  const refreshLocation = async () => {
    try {
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de récupérer la localisation.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Localisation actuelle</Text>
      {errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : location ? (
        <View>
          <Text style={styles.text}>Latitude : {location.coords.longitude}</Text>
          <Text style={styles.text}>Longitude : {location.coords.longitude}</Text>
        </View>
      ) : (
        <Text style={styles.text}>Chargement de la localisation...</Text>
      )}
      <Button title="Actualiser la localisation" onPress={refreshLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    alignItems: "center",
    padding: 16,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    color: "white",
    fontSize: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    marginBottom: 8,
  },
});