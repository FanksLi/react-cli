import Builder from '@fan/builder';

export default function start() {
     const builder = new Builder({
           cwd: process.cwd(),
       });
       builder.start();
}