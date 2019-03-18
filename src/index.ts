import { TASK_COMPILE_RUN_COMPILER } from "@nomiclabs/buidler/builtin-tasks/task-names";
import { extendEnvironment, task, types } from "@nomiclabs/buidler/config";
import { BuidlerPluginError, lazyObject } from "@nomiclabs/buidler/plugins";
import { BuidlerConfig, SolcInput } from "@nomiclabs/buidler/types";

task(TASK_COMPILE_RUN_COMPILER, async (_, { config, run }) => {
  // Overridden Task
});
  /*.addParam("input", "The compiler standard JSON input", undefined, types.json)
  .setAction(async ({ input }: { input: SolcInput }, { config }) => {
    // Replace compiler with docker solc image
    // Must get config.solc.version as the docker image
    /*const compiler = new Compiler(
      config.solc.version,
      path.join(config.paths.cache, "compilers")
    );
  });*/
