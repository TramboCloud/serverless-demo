# serverless-demo
Repository created for explanation of serverless

For the three directories the process is the same.
Go to the directories that have the serverless.yml file and follow the below instructions.

&nbsp;

1. [Install](#1-install)
2. [Deploy](#2-deploy)
3. [Use your API](#3-use-your-api)

&nbsp;

### 1. Install

Install the [Serverless Framework](https://www.github.com/serverless/serverless):

```console
$ npm i -g serverless
```

Add the access keys of an AWS IAM Role with `AdministratorAccess`

```bash
export AWS_ACCESS_KEY_ID=1234
export AWS_SECRET_ACCESS_KEY=1234
```


### 2. Deploy

Deploy via the `serverless` command:

```console
$ serverless
```

Use the `--debug` flag if you'd like to learn what's happening behind the scenes:

```console
$ serverless --debug
```

## New to Components?

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.
