
import Builder from '@fan/builder';

export default function build() {
    const builder = new Builder({
        cwd: process.cwd(),
    });
    builder.run();
    console.log('build')
}