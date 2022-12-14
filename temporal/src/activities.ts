import { Context } from "@temporalio/activity";

export async function placeOrder(id: string): Promise<string> {
  console.log(`Purchase ${id}`);
  return Context.current().info.activityId;
}
