import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsers, deleteUser } from "@/lib/api/admin";

export function useAdminUsers() {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await getAllUsers();
      return res.data.users;
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  return { ...usersQuery, deleteUser: deleteUserMutation };
}
