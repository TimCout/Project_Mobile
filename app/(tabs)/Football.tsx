import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import { useState } from "react";
import { z } from "zod";
import { useAuth } from "@/lib/auth";
import ProtectedLayout from "@/components/ProtectedLayout";

const matchSchema = z.object({
  id: z.number(),
  date: z.string(),
  place: z.string(),
  level: z.string(),
  registeredPlayer: z.number(),
  neededPlayer: z.number(),
});
type Match = z.infer<typeof matchSchema>;

export default function Football() {
  const queryClient = useQueryClient();
  const { user } = useAuth()

  const { data: matches, isLoading } = useQuery({
    queryKey: ["matches"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/matches", { credentials: 'include'});
      const data = await res.json();
      return z.array(matchSchema).parse(data);
    },
  });
  
  const { data: participation } = useQuery({
    queryKey: ["hasJoined"],
    queryFn: async() => {
      const res = await fetch(`http://localhost:3000/api/matches/join`, { credentials: 'include'})
      return (await res.json()) as { id: number, joined: boolean}[];
    }
  })

  const { mutate: joinMatch } = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`http://localhost:3000/api/matches/join/${id}`, { method: "POST", credentials: "include" });
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries();
    },
  });

  const { mutate: leaveMatch } = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`http://localhost:3000/api/matches/leave/${id}`, { method: "POST", credentials: "include" });
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries();
    },
  });

  const availableMatches = matches?.filter(
    (match) => match.registeredPlayer < match.neededPlayer
  );

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <ProtectedLayout>
      <View style={styles.container}>
        <Text style={styles.title}>THEY WANT YOU, {user?.username}</Text>

        {(!availableMatches || availableMatches.length === 0) && (
          <Text style={styles.noMatch}>Aucun match disponible pour le moment</Text>
        )}

        <FlatList
          data={availableMatches}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const joined = (participation?.filter(p => p.id === item.id && p.joined).length ?? 0) > 0
            return (
              <View style={styles.card}>
                <Text style={styles.matchText}>
                  <Text style={styles.bold}>
                    {moment(item.date).format("LLLL")}
                  </Text>{" "}
                  - <Text style={styles.bold}>{item.place}</Text> -{" "}
                  <Text style={styles.italic}>Level : {item.level}</Text> -{" "}
                  <Text style={styles.players}>
                    {item.registeredPlayer}/{item.neededPlayer} players
                  </Text>
                </Text>

                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: joined ? "#b91c1c" : "#0ea5e9" },
                  ]}
                  onPress={() => (joined ? leaveMatch(item.id) : joinMatch(item.id))}
                >
                  <Text style={styles.buttonText}>{joined ? "I'm out" : "I'm in"}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </ProtectedLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "black",
    flex: 1,
  },
  title: {
    fontSize: 32,
    color: "#0ea5e9",
    textAlign: "center",
    marginVertical: 24,
    fontWeight: "300",
    textTransform: "uppercase",
  },
  noMatch: {
    textAlign: "center",
    fontSize: 18,
    color: "gray",
    marginTop: 16,
  },
  card: {
    padding: 16,
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  matchText: {
    fontSize: 16,
    color: "#0369a1",
    marginBottom: 8,
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  players: {
    color: "#f97316",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
