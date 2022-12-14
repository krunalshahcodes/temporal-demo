import * as wf from "@temporalio/workflow";
type OrderState = "ORDER_PAYMENT_PENDING" | "ORDER_CANCELLED_PAYMENT_FAILED" | "ORDER_PLACED" | "ORDER_CANCELLED_BY_CUSTOMER" | "ORDER_CONFIRMED" | "ORDER_REJECTED_BY_PARTNER" | "PREPARING_ORDER" | "ORDER_READY_FOR_PICKUP" | "ORDER_DELIVERED" | "REFUND_PENDING" | "REFUND_PROCESSED";
type OrderInfo = {
    id: string;
};
export declare const orderStateQuery: wf.QueryDefinition<OrderState, []>;
export declare const orderPaymentCompleted: wf.SignalDefinition<[]>;
export declare const orderDelivered: wf.SignalDefinition<[]>;
export declare function Order(orderInfo: OrderInfo): Promise<any>;
export {};
//# sourceMappingURL=workflows.d.ts.map