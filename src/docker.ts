import { BuidlerPluginError } from "@nomiclabs/buidler/plugins";

export class Docker {

	env:any;
	docker:any;

	constructor(private readonly config: any) {
		const {Docker} = require('node-docker-api');
		try {
			this.docker = new Docker({ socketPath: '/var/run/docker.sock' });
		} catch (err) {
			throw new BuidlerPluginError("Docker is not running");
		}
		this.env = require("@nomiclabs/buidler");
	}

	public async compile(input: any) {
		await this.validateAndPullDockerImage();
		var appRoot = require('app-root-path');
		return await this.docker.container.create({
			HostConfig: {
        Binds: [appRoot + "/contracts:" + appRoot + "/contracts"] // Bind contracts to container
    	},
    	AttachStdin: true,
      AttachStdout: true,
    	Image: "ethereum/solc" + this.env.config.solc.version,
    	Cmd: [ "--standard-json" ]
		}, input);
	}

	async validateAndPullDockerImage() {
		const semver = require('semver')
		if (!semver.valid(this.env.config.solc.version)) {
      throw new BuidlerPluginError("The Docker Image version you have provided is not valid");
    }

    await this.docker.image.create({}, { fromImage: 'ethereum/solc', tag: this.env.config.solc.version })
		  .catch((error: any) => {
		  	throw new BuidlerPluginError("Docker image ethereum/solc:" + this.env.config.solc.version + " not found");
	  	});
	}
}