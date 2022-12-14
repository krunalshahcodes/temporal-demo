import { Context } from "@temporalio/activity";

export async function placeOrder(id: string): Promise<string> {
  return `Placed ${id}`;
  // return Context.current().info.activityId;
}

export async function confirmOrder(id: string): Promise<string> {
  return `Confirmed ${id}`;
  // return Context.current().info.activityId;
}

export async function confirmDelivered(id: string): Promise<string> {
  return `Delivered ${id}`;
  // return Context.current().info.activityId;
}
