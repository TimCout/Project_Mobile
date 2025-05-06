import { View, Text, TextInput, StyleSheet } from "react-native";

export default function NumberOfPlayersInput({
  registered,
  needed,
  setRegistered,
  setNeeded,
}: {
  registered: string;
  needed: string;
  setRegistered: (val: string) => void;
  setNeeded: (val: string) => void;
}) {
  return (
    <View>
      <TextInput
        value={registered}
        onChangeText={setRegistered}
        placeholder="Registered"
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.subText}>over</Text>
      <TextInput
        value={needed}
        onChangeText={setNeeded}
        placeholder="Needed"
        keyboardType="numeric"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "#0ea5e9",
    fontWeight: "500",
    marginVertical: 8,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    color: "#0ea5e9",
  },
  subText: {
    color: "#0ea5e9",
    textAlign: "center",
    marginBottom: 8,
  },
});
