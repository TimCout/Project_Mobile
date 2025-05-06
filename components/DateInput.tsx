import { View, Text, TextInput, StyleSheet } from "react-native";

export default function DateInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="YYYY-MM-DD HH:mm"
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
