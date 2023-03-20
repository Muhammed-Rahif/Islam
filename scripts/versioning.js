const { exec } = require('child_process');

exports.preCommit = ({ tag, version }) => {
  const buildNo = version.match(RegExp(/^\d+/g));
  exec(
    `npx capacitor-set-version . -v ${tag} -b ${buildNo} --json`,
    (err, stdout, stderr) => {
      console.log(stdout);
    }
  );
};
