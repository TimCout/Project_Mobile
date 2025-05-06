import { View, StyleSheet } from "react-native";

export default function WhiteBox({ children }: { children: React.ReactNode }) {
  return <View style={styles.box}>{children}</View>;
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    maxWidth: 400,
    alignSelf: "center",
  },
});
