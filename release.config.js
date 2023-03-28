const marked = require('marked');

module.exports = {
  branches: ['main', { name: 'beta', prerelease: true }],
  repository: 'https://github.com/Muhammed-Rahif/Islam',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'android/app/build/outputs/apk/release/app-release-unsigned.apk',
            label: 'app-release-unsigned-v${nextRelease.version}.apk',
            name: 'app-release-unsigned-v${nextRelease.version}.apk',
          },
          {
            path: 'android/app/build/outputs/apk/debug/app-debug.apk',
            label: 'app-debug-v${nextRelease.version}.apk',
            name: 'app-debug-v${nextRelease.version}.apk',
          },
          {
            path: 'CHANGELOG.md',
            label: 'CHANGELOG',
            name: 'CHANGELOG-${nextRelease.version}.md',
          },
        ],
      },
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd:
          'chmod +x scripts/build/build-android.sh && scripts/build/build-android.sh ${nextRelease.gitTag}',
        successCmd:
          'yarn tsc scripts/telegram-bot/success-release.ts --skipLibCheck && node scripts/telegram-bot/success-release.js --versionName ${nextRelease.gitTag} --releaseType ${nextRelease.type} --branchName ${branch.name} --releaseNotes ${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: [
          'CHANGELOG.md',
          'android/app/build.gradle',
          'ios/App/App.xcodeproj/project.pbxproj',
        ],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
