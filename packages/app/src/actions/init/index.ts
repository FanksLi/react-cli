import { InitOption } from '@/types';
import path from 'path';
import fs from 'fs/promises';
import { exec } from 'child_process';

export default async function init(option: InitOption) {
    const { name = 'react' } = option;
    const targetDir = process.cwd();
    const sourceDir = path.resolve(__dirname, '../template/react');
    // 将../template/react目录下的文件夹移动到当前执行命令目录下
    try {
        // 检查源目录是否存在
        await fs.access(sourceDir, fs.constants.F_OK);
        // 复制文件夹的所有内容
        await fs.cp(sourceDir, path.resolve(targetDir, name), { recursive: true });
        // 修改文件夹中的 package.json 文件的 name 字段
        const pkgPath = path.resolve(targetDir, name, 'package.json');
        const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf8'));
        pkg.name = name;
        // 将修改后的 package.json 文件写入目标目录
        await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));
        // 执行npm install 命令下载依赖
        exec('npm install', { cwd: path.resolve(targetDir, name) }, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
        console.log('React template moved successfully.');
    } catch (error) {
        console.error('Error moving React template:', error);
    }
}