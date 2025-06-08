import {
    View,
    Text,
    StyleSheet,
    Alert,
  } from "react-native";
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { useNavigation } from "@react-navigation/native";
  import BlueButton from "@/components/BlueButton";
  import WhiteBox from "@/components/WhiteBox";
  
  export default function LogoutScreen() {
    const queryClient = useQueryClient()
    const navigation = useNavigation();
  
    const logout = useMutation({
      mutationFn: async () => {
        const res = await fetch("http://localhost:3000/api/users/logout", {
          credentials: 'include',
          method: "POST",
        });
        if (!res.ok) throw new Error("Logout failed");
      },
      onSuccess() {
        queryClient.invalidateQueries();
        navigation.navigate("index");
      },
      onError(error) {
        Alert.alert("Erreur", error.message || "Logout échoué");
      },
    });
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Are you sure to logout ?</Text>
        <WhiteBox>
          <BlueButton onPress={() => logout.mutate()} disabled={logout.isPending}>
            {logout.isPending ? "Deconnexion..." : "Log out"}
          </BlueButton>
        </WhiteBox>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
      padding: 16,
      justifyContent: "center",
    },
    title: {
      fontSize: 32,
      color: "#0ea5e9",
      textAlign: "center",
      fontWeight: "300",
      textTransform: "uppercase",
      marginBottom: 32,
    },
  });
  