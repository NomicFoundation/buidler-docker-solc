import { BuidlerPluginError } from "@nomiclabs/buidler/plugins";

export class Docker {
  private env: any;

  constructor(private readonly config: any) {
    this.env = require("@nomiclabs/buidler");
  }

  public async compile(solcInput: any) {
    const { execSync } = require("child_process");
    await this.validateAndPullDockerImage();
    try {
      const command =
        "echo '" +
        JSON.stringify(solcInput) +
        "' | docker run -i ethereum/solc:" +
        this.env.config.solc.version +
        " --standard-json";
      const buffer = await execSync(command);
      return buffer.toString();
    } catch (err) {
      throw new BuidlerPluginError(
        "Error running Docker image ethereum/solc:" +
          this.env.config.solc.version
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
    if (!semver.valid(this.env.config.solc.version)) {
      throw new BuidlerPluginError(
        "The Docker Image version you have provided is not valid"
      );
    }

    try {
      await execSync(
        "docker pull ethereum/solc:" + this.env.config.solc.version
      );
    } catch (err) {
      throw new BuidlerPluginError(
        "Docker image ethereum/solc:" +
          this.env.config.solc.version +
          " not found"
      );
    }
  }
}
