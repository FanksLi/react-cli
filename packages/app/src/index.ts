import { program } from 'commander';
const { version } = require('../package.json');
import {init} from './actions';
import { InitOption } from './types';



program.version(`当前版本：${version}`, '-v, --version', '查看版本信息');

// create命令
program
    .arguments('<name>')
    .description('初始化项目')
    // 可选配置，设置项目名称
    .action((name: string, options: InitOption) => {
        console.log('初始化项目', options);
        Object.assign(options, { name });
        return init(options);
    })


// publish 命令
program
    .command('publish')
    .description('发布项目')
    .action((options: any) => {
        console.log('发布项目');
    });

program.parse(process.argv);