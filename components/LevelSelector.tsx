import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

const levels = ["Chill", "Fun", "TryHard"];

export default function LevelSelector({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (level: string) => void;
}) {
  return (
    <View>
      <View style={styles.container}>
        {levels.map((level) => (
          <TouchableOpacity
            key={level}
            onPress={() => onSelect(level)}
            style={[
              styles.button,
              selected === level ? styles.selected : styles.unselected,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selected === level && styles.selectedText,
              ]}
            >
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "#0ea5e9",
    fontWeight: "500",
    marginVertical: 8,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  selected: {
    backgroundColor: "#0ea5e9",
  },
  unselected: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#000",
  },
  selectedText: {
    color: "#fff",
  },
});
