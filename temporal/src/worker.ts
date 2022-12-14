import { Worker } from "@temporalio/worker";
import * as activities from "./activities";

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve("./workflows"),
    activities,
    taskQueue: "order",
  });

  await worker.run();
}

run().catch((err) => console.log("Error running temporal client: ", err));
