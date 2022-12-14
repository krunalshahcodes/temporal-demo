"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeOrder = void 0;
const activity_1 = require("@temporalio/activity");
async function placeOrder(id) {
    console.log(`Purchase ${id}`);
    return activity_1.Context.current().info.activityId;
}
exports.placeOrder = placeOrder;
//# sourceMappingURL=activities.js.map