import { BuidlerPluginError } from "@nomiclabs/buidler/plugins";

export class Docker {

	env:any;
	docker:any;

	constructor(private readonly config: any) {
		const {Docker} = require('node-docker-api');
		this.docker = new Docker({ socketPath: '/var/run/docker.sock' });
		this.env = require("@nomiclabs/buidler");
	}

	async load() {
		await this.validateAndPullDockerImage();
		this.docker.image.create({}, { fromImage: 'ethereum/solc', tag: this.env.config.solc.version })
  		.then(() => this.docker.image.get('ubuntu').status())
	}

	async validateAndPullDockerImage() {
		const version = await this.docker.version();
		if (!version) {
			throw new BuidlerPluginError("Docker is not running");
		}

		const semver = require('semver')
		if (!semver.valid(this.env.config.solc.version)) {
      throw new BuidlerPluginError("The Docker Image version you have provided is not valid");
    }

    const promisifyStream = (stream: any) => new Promise((resolve, reject) => {
		  stream.on('data', (d: any) => console.log(d.toString()))
		  stream.on('end', resolve)
		  stream.on('error', reject)
		})

    await this.docker.image.create({}, { fromImage: 'ethereum/solc', tag: this.env.config.solc.version })
		  .then((stream: any) => promisifyStream(stream))
		  .then(() => this.docker.image.get('ethereum/solc').status())
		  .then((image: any) => image.history())
		  .then((events: any) => console.log(events))
		  .catch((error: any) => {
		  	throw new BuidlerPluginError("Docker image ethereum/solc:" + this.env.config.solc.version + " not found");
	  	});
	}
}