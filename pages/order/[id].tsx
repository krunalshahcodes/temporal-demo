import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import prisma from "../../utils/prisma";

type OrderStatusProps = {
  workflowId: string;
};

const OrderStatus = ({ workflowId }: OrderStatusProps) => {
  const router = useRouter();
  const [orderStatus, setOrderStatus] = useState<string | null>(null);

  useEffect(() => {
    async function getStatus() {
      const res = await fetch(`/api/getOrder?id=${workflowId}`, {
        method: "GET",
      });
      const data = await res.json();
      setOrderStatus(data.orderState);
    }
    getStatus();
  }, [workflowId]);

  return <div>Status: {orderStatus}</div>;
};

export default OrderStatus;

export async function getServerSideProps(ctx: NextPageContext) {
  const { id } = ctx.query;
  const order = await prisma.order.findFirst({ where: { id: id as string } });
  if (!order) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      workflowId: order.workflowId,
    },
  };
}
