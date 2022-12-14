import { proxyActivities, sleep } from "@temporalio/workflow";
import type * as activities from "./activities";
import * as wf from "@temporalio/workflow";

const { placeOrder, confirmOrder, confirmDelivered } = proxyActivities<
  typeof activities
>({
  startToCloseTimeout: "5 minutes",
});

type OrderState =
  | "ORDER_PAYMENT_PENDING"
  | "ORDER_CANCELLED_PAYMENT_FAILED"
  | "ORDER_PLACED"
  | "ORDER_CANCELLED_BY_CUSTOMER"
  | "ORDER_CONFIRMED"
  | "ORDER_REJECTED_BY_PARTNER"
  | "PREPARING_ORDER"
  | "ORDER_READY_FOR_PICKUP"
  | "ORDER_DELIVERED"
  | "REFUND_PENDING"
  | "REFUND_PROCESSED";

type OrderInfo = {
  id: string;
};

export const orderStateQuery = wf.defineQuery<OrderState>("orderState");
export const orderPaymentCompleted = wf.defineSignal("orderPaymentCompleted");
export const orderDelivered = wf.defineSignal("orderDelivered");

export async function Order(orderInfo: OrderInfo): Promise<any> {
  let orderState: OrderState = "ORDER_PAYMENT_PENDING";
  wf.setHandler(orderStateQuery, () => orderState);
  wf.setHandler(
    orderPaymentCompleted,
    () => void (orderState = "ORDER_CONFIRMED")
  );
  wf.setHandler(orderDelivered, () => void (orderState = "ORDER_DELIVERED"));
  const result = await placeOrder(orderInfo.id);

  // if (await wf.condition(() => orderState === "ORDER_DELIVERED", "5s")) {
  //   return await confirmDelivered(orderInfo.id);
  // }
  await sleep("1 minutes");

  // console.log(`Activity ID: ${result} executed!`);
}
