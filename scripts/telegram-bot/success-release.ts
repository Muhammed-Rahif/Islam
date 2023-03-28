import { Telegraf } from 'telegraf';
import { marked } from 'marked';

const argv = require('minimist')(process.argv.slice(2));
const bot = new Telegraf(process.env.TELEGRAM_BOT_API_KEY ?? '');

console.log(process.env.TELEGRAM_BOT_API_KEY);

(async function () {
  const versionName = argv.versionName;
  const releaseNotes = argv.releaseNotes;
  const releaseType = argv.releaseType;
  const branchName = argv.branchName;
  const appName = 'Islam App';
  const toTelegramId = process.env.TELEGRAM_TO_ID || -877507563;
  const releaseUrl = `https://github.com/Muhammed-Rahif/Islam/releases/tag/${versionName}`;
  const changelogUrl = `https://github.com/Muhammed-Rahif/Islam/blob/${versionName}/CHANGELOG.md`;
  const downloadUrl = `https://github.com/Muhammed-Rahif/Islam/releases/download/${versionName}/app-debug-${versionName}.apk`;
  const newIssueUrl = `https://github.com/Muhammed-Rahif/Islam/issues/new`;

  if (!versionName) throw new Error('versionName argument is required');
  if (!releaseNotes) throw new Error('releaseNotes argument is required');
  if (!releaseType) throw new Error('releaseType argument is required');
  if (!branchName) throw new Error('branchName argument is required');

  let content = `<a href="${releaseUrl}"><b>🎉 ${appName} ${versionName} Release</b><br></a>
Assalamu Alaikum guys! We are excited to announce the release of a new ${releaseType} version of ${appName}. This release is now available on the ${branchName} branch of our repository.<br>
📝 Here are the key highlights of this release:<br>
${releaseNotes}<br>
Please refer to the <a href="${changelogUrl}">changelog</a> for a more detailed list of changes.<br>
We encourage all developers, testers, and users to <a href="${downloadUrl}">download and install</a> the apk file attached below to test the app's functionality. If you encounter any issues, please <a href="${newIssueUrl}">report them</a> by opening a new issue on our GitHub repository through the following link:<br>
🔗 <a href="${downloadUrl}">Download ${versionName} apk</a>
🔗 <a href="${newIssueUrl}">Report new issue</a><br>
👨‍💻 Your feedback is essential in helping us improve the app's quality. We appreciate your continuous support and dedication in making our app better for all our users.<br>
🤲 May Allah bless you all with His mercy and reward you for your efforts.<br>`;

  content = marked(content)
    // remove h1 tag
    .replaceAll(/<h1(\s[^>]*)?>|<\/h1>/g, '')
    // replace h3 with <b> tag
    .replaceAll(/<h3(\s[^>]*)?>(.*?)<\/h3>/g, '<b><u>$2</u></b>:-')
    // replace li with <b>
    .replaceAll(/<li(\s[^>]*)?>(.*?)<\/li>/g, '$2')
    // replace <br> with \r\n
    .replaceAll(/<br>/g, '\n')
    // remove ul tag
    .replaceAll(/<ul(\s[^>]*)?>|<\/ul>/g, '')
    // remove p tag
    .replaceAll(/<p(\s[^>]*)?>|<\/p>/g, '');

  bot.telegram.sendMessage(toTelegramId, content, {
    parse_mode: 'HTML',
  });

  bot.telegram.sendDocument(toTelegramId, {
    source: `android/app/build/outputs/apk/debug/app-debug.apk`,
    filename: `app-debug-${versionName}.apk`,
  });

  bot.launch();
})();
