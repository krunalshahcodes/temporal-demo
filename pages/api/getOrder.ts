import { Client } from "@temporalio/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function queryState(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query;

  if (!id) {
    res.status(405).send({ message: "must send workflow id to query" });
    return;
  }

  const client = new Client();
  const workflow = client.workflow.getHandle(req.query.id as string);

  try {
    const orderState = await workflow.query("orderState");
    res.status(200).json({ orderState });
  } catch (e) {
    console.error(e);
    res.status(500).send({ e });
    return;
  }
}
