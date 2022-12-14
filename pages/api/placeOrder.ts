import { NextApiRequest, NextApiResponse } from "next";
import { WorkflowClient } from "@temporalio/client";
import { nanoid } from "nanoid";
import { Order } from "../../temporal/lib/workflows";
import prisma from "../../utils/prisma";
import { Prisma, Product } from "@prisma/client";

export default async function placeOrder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const workflowId = nanoid();
    const data: Prisma.OrderCreateInput = {
      workflowId,
      product: { connect: { id: req.body.productId } },
      status: "ORDER_PAYMENT_PENDING",
    };
    const order = await prisma.order.create({ data });
    const client = new WorkflowClient();
    const handle = await client.start(Order, {
      workflowId,
      taskQueue: "order",
      args: [order],
    });

    res.status(200).json({ workflowId: handle.workflowId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
