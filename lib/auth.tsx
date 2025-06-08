import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const client = useQueryClient();
  const user = useQuery({
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/users/login", { credentials: 'include'});
      const data = await res.json();
      return data as { username: string };
    },
    queryKey: ["getUser"],
  });

  const login = useMutation({
    mutationFn: async () => {
      const res = await fetch("http://localhost:3000/api/auth/login", { credentials: 'include',
        method: "POST",
      });
    },
    onSuccess() {
      client.invalidateQueries({ queryKey: ["getUser"] });
    },
  });

  const logout = useMutation({
    mutationFn: async () => {},
    onSuccess() {
      client.invalidateQueries({ queryKey: ["getUser"] });
    },
  });
  return { user: user?.data, login: login.mutate, logout: logout.mutate };
}

// //function Components() {
//   const { user, logout } = useAuth();
//   return (
//     <View>
//       <Text>Hello {user?.name}</Text>
//       <Button onPress={() => logout()} title="Log out" />
//     </View>
//   );
// }/