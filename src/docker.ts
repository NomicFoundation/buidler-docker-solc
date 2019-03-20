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
    	Image: "ethereum/solc:" + this.env.config.solc.version,
    	Cmd: [ "--standard-json" ]
		}, input);
	}

	async validateAndPullDockerImage() {
		const semver = require('semver')
		if (!semver.valid(this.env.config.solc.version)) {
      throw new BuidlerPluginError("The Docker Image version you have provided is not valid");
    }

    const promisifyStream = (stream: any) => new Promise((resolve, reject) => {
		  stream.on('data', (d: any) => console.log(d.toString()))
		  stream.on('end', resolve)
		  stream.on('error', reject)
		})

    try {
	    await this.docker.image.create({}, { fromImage: 'ethereum/solc', tag: this.env.config.solc.version })
		    .then((stream: any) => promisifyStream(stream))
			} catch (err) {
					throw new BuidlerPluginError("Docker image ethereum/solc:" + this.env.config.solc.version + " not found");
			}
	}
}