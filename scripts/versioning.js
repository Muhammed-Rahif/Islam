// when running this file version argument should be passed as "-v 1.0.0"
const { exec } = require('child_process');

const preCommit = async () => {
  console.log('====================================');

  const args = process.argv.slice(2);
  console.log('Precommit with args: ', args);

  const version = `v${args[1]}`;
  console.log('Precommit with version string: ', version);

  const buildNo = args[1].match(RegExp(/^\d+/g))[0].replaceAll('v', '');
  console.log('Precommit with build no: ', buildNo);

  console.log('====================================');

  await new Promise((resolve, reject) => {
    exec(
      `yarn capacitor-set-version . -v v${version} -b ${buildNo} --json`,
      (err, stdout, stderr) => {
        console.log(stdout);
        if (err) {
          reject(err);
          return;
        }
        resolve();
      }
    );
  });
};

preCommit();
