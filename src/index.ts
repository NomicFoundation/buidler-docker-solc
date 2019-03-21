import { TASK_COMPILE_RUN_COMPILER } from "@nomiclabs/buidler/builtin-tasks/task-names";
import { internalTask } from "@nomiclabs/buidler/config";
import { SolcInput } from "@nomiclabs/buidler/types";

import { Docker } from "./docker";

internalTask(TASK_COMPILE_RUN_COMPILER).setAction(
  async ({ input }: { input: SolcInput }, { config }) => {
    const dockerExec = new Docker(config);
    return dockerExec.compile(input);
  }
);
