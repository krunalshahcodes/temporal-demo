import { WorkflowClient } from "@temporalio/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Order } from "../../temporal/lib/workflows";

export default async function placeOrder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { itemId } = req.body;
  const client = new WorkflowClient();
  const handle = await client.start(Order, {
    workflowId: "test",
    taskQueue: "order",
    args: [itemId],
  });

  res.status(200).json({ workflowId: handle.workflowId });
}
