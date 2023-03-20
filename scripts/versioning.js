const { exec } = require('child_process');

exports.preCommit = async ({ tag, version }) => {
  const buildNo = version.match(RegExp(/^\d+/g));
  await new Promise((resolve, reject) => {
    exec(
      `npx capacitor-set-version . -v ${tag} -b ${buildNo} --json`,
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
