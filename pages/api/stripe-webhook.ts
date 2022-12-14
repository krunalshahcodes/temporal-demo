import { Client } from "@temporalio/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body.data.object.metadata);

  const refId = req.body.data.object.client_reference_id;

  const client = new Client();
  const workflow = client.workflow.getHandle(
    req.body.data.object.metadata.workflowId
  );

  await workflow.signal("orderPaymentCompleted");

  res.status(200).json({});
}
