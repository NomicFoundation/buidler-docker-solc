import { TASK_COMPILE_RUN_COMPILER } from "@nomiclabs/buidler/builtin-tasks/task-names";
import { BuidlerRuntimeEnvironment } from "@nomiclabs/buidler/types";
import { assert } from "chai";

declare module "mocha" {
  interface Context {
    env: BuidlerRuntimeEnvironment;
  }
}

describe("buidler-docker-solc plugin", function() {
  beforeEach("Buidler project setup", function() {
    process.chdir(__dirname + "/buidler-project");
    process.env.BUIDLER_NETWORK = "develop";

    // We first clear any cache
    delete require.cache[require.resolve("@nomiclabs/buidler")];

    this.env = require("@nomiclabs/buidler");
  });

  it("Task should run successfully", async function() {
    try {
      this.timeout(10000);
      const results = await this.env.run(TASK_COMPILE_RUN_COMPILER, {
        input: {
          language: "Solidity",
          sources: {
            contracts: {
              content: "pragma solidity^0.5.6;\n\ncontract C {\n\n}\n"
            }
          },
          settings: {
            outputSelection: {
              "*": {
                "*": ["*"]
              }
            }
          }
        }
      });
      assert(results);
    } catch (err) {
      console.log(err);
    }
  });

  it("Should throw docker image is not valid", async function() {
    this.env.config.solc.version = "Not an image";
    try {
      await this.env.run(TASK_COMPILE_RUN_COMPILER);
      // If this passes, something is wrong
      assert(false);
    } catch (err) {
      assert.equal(
        err.message,
        "The Docker Image version you have provided is not valid"
      );
    }
  });
});
