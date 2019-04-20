import { BuidlerPluginError } from "@nomiclabs/buidler/plugins";
import { SolcConfig, SolcInput } from "@nomiclabs/buidler/types";

export class Docker {
  private solcConfig: SolcConfig;

  constructor(private readonly config: SolcConfig) {
    this.solcConfig = config;
  }

  public async compile(solcInput: SolcInput) {
    const { execSync } = require("child_process");
    await this.validateAndPullDockerImage();
    try {
      const command =
        "echo '''" +
        JSON.stringify(solcInput) +
        "''' | docker run -i ethereum/solc:" +
        this.solcConfig.version +
        " --standard-json";
      const buffer = await execSync(command);
      return buffer.toString();
    } catch (err) {
      throw new BuidlerPluginError(
        "Error running Docker image ethereum/solc:" + this.solcConfig.version
      );
    }
  }

  public async validateAndPullDockerImage() {
    const { execSync } = require("child_process");
    try {
      await execSync("docker -v");
    } catch (err) {
      throw new BuidlerPluginError("Docker is not running");
    }

    const semver = require("semver");
    if (!semver.valid(this.solcConfig.version)) {
      throw new BuidlerPluginError(
        "The Docker Image version you have provided is not valid"
      );
    }

    try {
      await execSync("docker pull ethereum/solc:" + this.solcConfig.version);
    } catch (err) {
      throw new BuidlerPluginError(
        "Docker image ethereum/solc:" + this.solcConfig.version + " not found"
      );
    }
  }
}
