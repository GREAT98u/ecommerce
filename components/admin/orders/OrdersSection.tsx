"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminOrders } from "./useAdminOrders";

export default function OrdersSection() {
  const {
    data: orders = [],
    isLoading,
    updateStatus,
    deleteOrder,
  } = useAdminOrders();

  if (isLoading) return <p>Loading orders...</p>;

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="font-semibold mb-4">Orders</h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((o: any) => (
              <TableRow key={o.id}>
                <TableCell>{o.id}</TableCell>
                <TableCell>${o.total_price}</TableCell>

                <TableCell>
                  <Select
                    value={o.order_status}
                    onValueChange={(value) =>
                      updateStatus.mutate({
                        id: o.id,
                        status: value,
                      })
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>

                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteOrder.mutate(o.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
