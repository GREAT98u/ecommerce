import api from "@/lib/api/axios";

/* USERS */
export const getAllUsers = () => api.get("/admin/getallusers");

export const deleteUser = (id: string) =>
  api.delete(`/admin/delete/${id}`);

/* PRODUCTS */
export const getAllProducts = () => 
    api.get("/product");

export const createProduct = (data: any) =>
  api.post("/product/admin/create", data);

export const updateProduct = (id: string, data: any) =>
  api.put(`/product/admin/update/${id}`, data);

export const deleteProduct = (id: string) =>
  api.delete(`/product/admin/delete/${id}`);

/* ORDERS */
export const getAllOrders = () =>
  api.get("/order/admin/getall");

export const updateOrderStatus = (id: string, status: string) =>
  api.put(`/order/admin/update/${id}`, { status });

export const deleteOrder = (id: string) =>
  api.delete(`/order/admin/delete/${id}`);
