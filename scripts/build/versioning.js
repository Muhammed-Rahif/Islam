// when running this file version argument should be passed as "-v v1.0.0"
const { exec } = require('child_process');
const fs = require('fs');

const preCommit = async () => {
  console.log('====================================');

  const args = process.argv.slice(2);
  console.log('Versioning precommit with args: ', args);

  const version = args[1];
  console.log('Versioning precommit with version string: ', version);

  const buildNo = version.replaceAll('v', '').match(RegExp(/^\d+/g))[0];
  console.log('Versioning precommit with build no: ', buildNo);

  await new Promise((resolve, reject) => {
    fs.readFile('./package.json', (err, data) => {
      if (err) throw err;

      var packageJsonObj = JSON.parse(data);
      packageJsonObj.version = version;
      packageJsonObj = JSON.stringify(packageJsonObj);

      fs.writeFile('./package.json', packageJsonObj, (err) => {
        if (err) throw err;
        console.log(`Updated package.json version to ${version}`);
      });
    });

    exec(
      `yarn prettier --write package.json && yarn capacitor-set-version . -v ${version} -b ${buildNo} --json`,
      (err, stdout) => {
        console.log(
          `Versioning precommit successful with version: ${version} and build no: ${buildNo}`
        );
        if (err) {
          reject(err);
          return;
        }
        resolve();
      }
    );
  });

  console.log('====================================');
};

preCommit();
