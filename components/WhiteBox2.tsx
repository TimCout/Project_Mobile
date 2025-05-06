import { View, StyleSheet } from "react-native";
import { ReactNode } from "react";

export default function whiteBox2({ children }: { children: ReactNode }) {
  return <View style={styles.whiteBox2}>{children}</View>;
}

const styles = StyleSheet.create({
  whiteBox2: {
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
    marginBottom: 16,
  },
});
