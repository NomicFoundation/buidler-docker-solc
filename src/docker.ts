import { BuidlerPluginError } from "@nomiclabs/buidler/plugins";

export class Docker {

	env:any;
	execSync:any;

	constructor(private readonly config: any) {
		this.env = require("@nomiclabs/buidler");
		this.execSync = require("child_process");
	}

	public async load() {
		
		await this.validateAndPullDockerImage();
		try {
			this.execSync("docker run -i ethereum/solc:" + this.env.config.solc.version + " --standard-json");
		} catch (err) {
			throw new BuidlerPluginError("Error running Docker image ethereum/solc:" + this.env.config.solc.version);
		}

	}

	public async validateAndPullDockerImage() {

		try {
			await this.execSync("docker -v");
		} catch (err) {
			throw new BuidlerPluginError("Docker is not running");
		}

		const semver = require('semver')
		if (!semver.valid(this.env.config.solc.version)) {
      throw new BuidlerPluginError("The Docker Image version you have provided is not valid");
    }

    try {
    	await this.execSync("docker pull ethereum/solc:" + this.env.config.solc.version);
    } catch (err) {
    	throw new BuidlerPluginError("Docker image ethereum/solc:" + this.env.config.solc.version + " not found");
    }

	}

}