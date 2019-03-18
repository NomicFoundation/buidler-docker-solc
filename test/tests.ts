import { TASK_COMPILE_RUN_COMPILER } from "@nomiclabs/buidler/builtin-tasks/task-names";
import { BuidlerPluginError } from "@nomiclabs/buidler/plugins";
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

  it("BuidlerPluginError should be thrown if no docker image is available", async function() {
    try {
      await this.env.run(TASK_COMPILE_RUN_COMPILER);
    } catch (err) {
      console.log(err);
    }
  });

  /*it("It should add the example field", function() {
    assert.instanceOf(this.env.example, ExampleBuidlerRuntimeEnvironmentField);
  });

  it("The example filed should say hello", function() {
    assert.equal(this.env.example.sayHello(), "hello");
  });*/
});
