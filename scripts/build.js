const path = require('path');
const {spawn } = require('child_process');

const projectNams = [
    'app',
    'builder',
]
function build() {
    // 遍历packages目录下的所有目录，执行npm run build命令
    projectNams.forEach(packageName => {
        const packagePath = path.resolve(__dirname, `../packages/${packageName}`);
        console.log(`开始构建 ${packageName}`);
        const sp = spawn('npm.cmd', ['run', 'build'], { cwd: packagePath, stdio: 'inherit' });
        sp.on('close', () => {
            console.log(`构建完成 ${packageName}`);
        })
    })

}


build()