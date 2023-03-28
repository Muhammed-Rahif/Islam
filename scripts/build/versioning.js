// when running this file version argument should be passed as "-v v1.0.0"
const { exec } = require('child_process');

const preCommit = async () => {
  console.log('====================================');

  const args = process.argv.slice(2);
  console.log('Precommit with args: ', args);

  const version = args[1];
  console.log('Precommit with version string: ', version);

  const buildNo = version.replaceAll('v', '').match(RegExp(/^\d+/g))[0];
  console.log('Precommit with build no: ', buildNo);

  console.log('====================================');

  await new Promise((resolve, reject) => {
    exec(
      `yarn capacitor-set-version . -v ${version} -b ${buildNo} --json`,
      (err, stdout) => {
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
