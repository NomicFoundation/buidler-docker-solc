# buidler-docker-solc
Buidler plugin to optimize the Solidity compilation process by executing solc via Docker

## What is it

This plugin is used to deploy a docker image of solc to compile contracts instead of the user compiling the contracts themselves. The plugin overrides [TASK_COMPILE_RUN_COMPILER](https://github.com/nomiclabs/buidler/blob/master/src/builtin-tasks/task-names.ts#L10) to compile the contracts.

To use it, just use the compile task, passing in the [solc standard json](https://solidity.readthedocs.io/en/v0.5.5/using-the-compiler.html#compiler-input-and-output-json-description) for your contracts.

### Installation

`npm install @nomiclabs/buidler-docker-solc`

and add the following at the top of `buidler.config.js`:

`require("@nomiclabs/buidler-docker-solc");`

### Requirements:

* Docker installed

### Error Handling

This plugin will throw BuidlerPluginError for the following cases:

* Docker is not running
* Version of solc in the config is invalid
* Docker error occurred when pulling the docker image

## New tasks

There are no new tasks
