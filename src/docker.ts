import { BuidlerPluginError } from "@nomiclabs/buidler/plugins";

export class Docker {
	constructor(private readonly config: any) {}

	this.env = require("@nomiclabs/buidler");

	public async compile() {
		const execSync = await this.getExecSync();
		return execSync("docker run -i ethereum/solc:" + this.env.config.solc.version + " --standard-json");
	}

	public async downloadDockerImages() {
		const execSync = await this.getExecSync();
		await execSync("docker pull ethereum/solc:" + this.env.config.solc.version);
	}

	public async validateDockerImageVersion() {
		const semver = require('semver')
		if (!semver.valid(this.env.config.solc.version)) {
      throw new BuidlerPluginError("The Docker Image version you have provided is not valid");
    }
	}

	private getExecSync() {
		const execSync = require("child_process");
		try {
			execSync("docker -v");
		} catch (err) {
			throw new BuidlerPluginError("Docker is not running");
		}
		return execSync;
	}
}