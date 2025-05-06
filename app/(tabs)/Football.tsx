import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import moment from "moment";
import { string, z } from "zod";

const matchSchema = z.object({
  id: z.number(),
  date: z.string(),
  place: z.string(),
  level: z.string(),
  registeredPlayer: z.string(),
  neededPlayer: z.string(),
});
type Match = z.infer<typeof matchSchema>;

export default function Football() {
  const queryClient = useQueryClient();
  const { data: matches, isLoading } = useQuery({
    queryKey: ["matches"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/matches");
      const data = await res.json();
      return data as Match[];
    },
  });

  const { mutate: join } = useMutation({
    mutationFn: async (id: number) => {
      await fetch("http://localhost:3000/api/matches/join/" + id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });

  const availableMatches = matches?.filter(
    (match) => match.registeredPlayer < match.neededPlayer
  );

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>THEY WANT YOU</Text>

      {(!availableMatches || availableMatches.length === 0) && (
        <Text style={styles.noMatch}>
          Aucun match disponible pour le moment
        </Text>
      )}

      <FlatList
        data={availableMatches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
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
            <TouchableOpacity style={styles.button}>
              <Button title="I'm in" onPress={() => join(item.id)} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
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
    backgroundColor: "#0ea5e9",
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
