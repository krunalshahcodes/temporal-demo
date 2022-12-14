import { Order } from "@prisma/client";
import { NextPageContext } from "next";
import prisma from "../utils/prisma";

type OrdersProps = {
  orders: Order[];
};

const Orders = ({ orders }: OrdersProps) => {
  const handleDelivered = async (id: string) => {
    console.log(id);
    const res = await fetch(`/api/deliver`, {
      method: "POST",
      body: JSON.stringify({ workflowId: id }),
    });

    const data = await res.json();
  };

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <th>{order.id}</th>
              <th>{order.productId}</th>
              <th>
                <button
                  onClick={() => handleDelivered(order.workflowId as string)}
                >
                  Change To Delivered
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;

export async function getServerSideProps() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return {
    props: {
      orders,
    },
  };
}
