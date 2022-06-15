import cluster from "cluster";
import { cpus } from "node:os";
import * as process from "process";

const numCPUs = cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} closed`);
        cluster.fork();
    });
}
if (cluster.isWorker) {
    import('./index');
}
