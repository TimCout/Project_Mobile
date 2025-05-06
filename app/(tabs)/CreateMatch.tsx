import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import WhiteBox2 from "@/components/WhiteBox2";
import DateInput from "@/components/DateInput";
import LevelSelector from "@/components/LevelSelector";
import NumberOfPlayersInput from "@/components/NumberOfPlayersInput";
import PlaceInput from "@/components/PlaceInput";

export default function CreateMatchScreen() {
  const navigation = useNavigation();
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [level, setLevel] = useState("");
  const [registeredPlayer, setRegisteredPlayer] = useState("");
  const [neededPlayer, setNeededPlayer] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create your match</Text>

      <WhiteBox2>
        <Text style={styles.subtitle}>When ?</Text>
        <DateInput value={date} onChange={setDate} />

        <Text style={styles.subtitle}>Where ?</Text>
        <PlaceInput value={place} onChange={setPlace} />

        <Text style={styles.subtitle}>Level</Text>
        <LevelSelector selected={level} onSelect={setLevel} />

        <Text style={styles.subtitle}>Number of Players ?</Text>
        <NumberOfPlayersInput
          registered={registeredPlayer}
          needed={neededPlayer}
          onRegisteredChange={setRegisteredPlayer}
          onNeededChange={setNeededPlayer}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create Match</Text>
        </TouchableOpacity>
      </WhiteBox2>

      <Pressable onPress={() => navigation.navigate("Football")}> 
        <Text style={styles.link}>Home - About Page</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "black", flex: 1 },
  title: {
    fontSize: 32,
    color: "#0ea5e9",
    textAlign: "center",
    marginVertical: 24,
    fontWeight: "300",
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#0ea5e9",
    fontSize: 18,
    marginTop: 16,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#0ea5e9",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#0ea5e9",
    textAlign: "center",
    marginTop: 16,
    textDecorationLine: "underline",
  },
});