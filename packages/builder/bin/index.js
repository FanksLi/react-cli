#!usr/bin/env node
const obj = require('../lib');

const args = process.argv.slice(2);

const cwd = process.cwd();
const options = {
    cwd,
};
console.log(options);
console.log(args);
if (args[0] === 'start') {
    obj.start(options);
} else if (args[0] === 'build') {
    obj.build(options);
}