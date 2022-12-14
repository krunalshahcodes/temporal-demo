import { proxyActivities, sleep } from "@temporalio/workflow";
import type * as activities from "./activities";

const { placeOrder } = proxyActivities<typeof activities>({
  startToCloseTimeout: "5 minutes",
});

export async function Order(id: string): Promise<any> {
  const result = await placeOrder(id);
  await sleep("60 seconds");
  console.log(`Activity ID: ${result} executed!`);
}
