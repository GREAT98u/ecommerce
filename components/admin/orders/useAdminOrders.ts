import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "@/lib/api/admin";

export function useAdminOrders() {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const res = await getAllOrders();
      return res.data.orders;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateOrderStatus(id, status),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] }),
  });

  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] }),
  });

  return {
    ...ordersQuery,
    updateStatus: updateStatusMutation,
    deleteOrder: deleteOrderMutation,
  };
}
