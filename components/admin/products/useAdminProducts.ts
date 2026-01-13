import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  deleteProduct,
} from "@/lib/api/admin";

export function useAdminProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const res = await getAllProducts();
      return res.data.products;
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-products"] }),
  });

  return { ...productsQuery, deleteProduct: deleteProductMutation };
}
