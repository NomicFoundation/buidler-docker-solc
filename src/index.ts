import { TASK_COMPILE_RUN_COMPILER } from "@nomiclabs/buidler/builtin-tasks/task-names";
import { extendEnvironment, internalTask, task, types } from "@nomiclabs/buidler/config";
import { BuidlerPluginError, lazyObject } from "@nomiclabs/buidler/plugins";
import { BuidlerConfig, SolcInput } from "@nomiclabs/buidler/types";

internalTask(TASK_COMPILE_RUN_COMPILER)
  .setAction(async ({ input }: { input: SolcInput }, { config }) => {
    console.log("Task Overridden Successfully");
  });
