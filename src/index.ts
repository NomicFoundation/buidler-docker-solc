import { TASK_COMPILE_RUN_COMPILER } from "@nomiclabs/buidler/builtin-tasks/task-names";
import { extendEnvironment, internalTask, task, types } from "@nomiclabs/buidler/config";
import { BuidlerPluginError, lazyObject } from "@nomiclabs/buidler/plugins";
import { BuidlerConfig, SolcInput } from "@nomiclabs/buidler/types";
import { Docker } from "./docker";

internalTask(TASK_COMPILE_RUN_COMPILER)
  .setAction(async ({ input }: { input: SolcInput }, { config }) => {
    const dockerExec = new Docker(config);
    console.log(await dockerExec.compile(input));
    console.log("Task Overridden Successfully");
    console.log(config);
  });
