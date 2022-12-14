"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmDelivered = exports.confirmOrder = exports.placeOrder = void 0;
const activity_1 = require("@temporalio/activity");
async function placeOrder(id) {
    console.log(`Purchase ${id}`);
    return activity_1.Context.current().info.activityId;
}
exports.placeOrder = placeOrder;
async function confirmOrder(id) {
    console.log(`Purchase ${id}`);
    return activity_1.Context.current().info.activityId;
}
exports.confirmOrder = confirmOrder;
async function confirmDelivered(id) {
    console.log(`Purchase ${id}`);
    return activity_1.Context.current().info.activityId;
}
exports.confirmDelivered = confirmDelivered;
//# sourceMappingURL=activities.js.map