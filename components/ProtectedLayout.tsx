import { View, Text, ActivityIndicator, StyleSheet, Pressable } from "react-native";
import { ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "expo-router";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  if (!user?.username) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>You're not authorized to access this page.</Text>
        <Pressable style={styles.button} onPress={() => router.push("/Login")}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    padding: 16,
  },
  message: {
    fontSize: 18,
    color: "white",
    marginBottom: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0ea5e9",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
