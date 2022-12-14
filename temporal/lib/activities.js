"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmDelivered = exports.confirmOrder = exports.placeOrder = void 0;
async function placeOrder(id) {
    return `Placed ${id}`;
    // return Context.current().info.activityId;
}
exports.placeOrder = placeOrder;
async function confirmOrder(id) {
    return `Confirmed ${id}`;
    // return Context.current().info.activityId;
}
exports.confirmOrder = confirmOrder;
async function confirmDelivered(id) {
    return `Delivered ${id}`;
    // return Context.current().info.activityId;
}
exports.confirmDelivered = confirmDelivered;
//# sourceMappingURL=activities.js.map