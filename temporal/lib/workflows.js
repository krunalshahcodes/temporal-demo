"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const workflow_1 = require("@temporalio/workflow");
const { placeOrder } = (0, workflow_1.proxyActivities)({
    startToCloseTimeout: "5 minutes",
});
async function Order(id) {
    const result = await placeOrder(id);
    await (0, workflow_1.sleep)("60 seconds");
    console.log(`Activity ID: ${result} executed!`);
}
exports.Order = Order;
//# sourceMappingURL=workflows.js.map