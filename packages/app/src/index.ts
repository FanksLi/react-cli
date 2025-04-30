import { program } from 'commander';
const { version } = require('../package.json');
const fs = require('fs');
import {init, start, build} from './actions';
import { InitOption } from './types';
const  path = require('path');


let config = {
    port: 9000,
    entry: './index.js',
    cwd: process.cwd(),
}
const userPgkPath = path.resolve(__dirname, './package.json');

// 判断文件是否存在
if (fs.existsSync(userPgkPath)) {
    const userPgk = require(userPgkPath).simple_cli || {};
    Object.assign(config, userPgk);
}

program.version(`当前版本：${version}`, '-v, --version', '查看版本信息');

// create命令
program
    .command('create')
    .description('初始化项目')
    // 可选配置，设置项目名称
    .option('-n, --name <name>', '设置项目名称')
    .action((options: InitOption) => {
        console.log('初始化项目', options);
        return init(options);
    })

// start命令
program
    .command('start')
    .description('启动项目')
    .option('-p, --port <port>', '设置端口号')
    .action((options: any) => {
        console.log('启动项目1', options);
        start();
    })

//  build 命令
program
    .command('build')
    .description('打包项目')
    .action((options: any) => {
        build();
    })

// publish 命令
program
    .command('publish')
    .description('发布项目')
    .action((options: any) => {
        console.log('发布项目');
    });

program.parse(process.argv);