import { View, Text, TextInput, StyleSheet } from "react-native";

export default function PlaceInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <View>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Place"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "#0ea5e9",
    fontWeight: "500",
    marginBottom: 4,
    marginTop: 16,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    color: "#0ea5e9",
  },
});
