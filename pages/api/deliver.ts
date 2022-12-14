import { Client } from "@temporalio/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = JSON.parse(req.body);
    console.log(data.workflowId, "workflowId");

    const client = new Client();
    const workflow = client.workflow.getHandle(data.workflowId);

    await workflow.signal("orderDelivered");

    res.status(200).json({});
  } catch (e) {
    res.status(500).json({ e });
  }
}
