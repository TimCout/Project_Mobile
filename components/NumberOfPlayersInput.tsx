import { View, TextInput, StyleSheet, Text } from "react-native";
import { useState } from "react";

export default function NumberOfPlayersInput({
  count,
  onCountChange,
  total,
  onTotalChange,
}: {
  count: string;
  onCountChange: (newVal: string) => void;
  total: string;
  onTotalChange: (newVal: string) => void;
}) {

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Registered Players"
        value={count}
        onChangeText={onCountChange}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.over}>over</Text>
      <TextInput
        placeholder="Needed Players"
        value={total}
        onChangeText={onTotalChange}
        keyboardType="numeric"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    width: 100,
    color: "black",
  },
  over: {
    color: "#38bdf8",
  },
});
