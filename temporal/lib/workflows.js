"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.orderStateQuery = void 0;
const workflow_1 = require("@temporalio/workflow");
const wf = __importStar(require("@temporalio/workflow"));
const { placeOrder } = (0, workflow_1.proxyActivities)({
    startToCloseTimeout: "5 minutes",
});
exports.orderStateQuery = wf.defineQuery("orderState");
async function Order(orderInfo) {
    let orderState = "ORDER_PAYMENT_PENDING";
    wf.setHandler(exports.orderStateQuery, () => orderState);
    const result = await placeOrder(orderInfo.id);
    await (0, workflow_1.sleep)("5 minutes");
    console.log(`Activity ID: ${result} executed!`);
}
exports.Order = Order;
//# sourceMappingURL=workflows.js.map