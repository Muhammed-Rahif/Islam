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
          'chmod +x scripts/build-android.sh && scripts/build-android.sh ${nextRelease.version}',
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
    [
      'semantic-release-telegram',
      {
        templates: {
          success: `🚀 <b><a href="{repository_url}/tree/{branch}">{name} {version} Release</a></b> 

                A new <b>{release_type}</b> version of <b>{name}</b> is now available on the <b>{branch}</b> branch of the repository:
                
                Here are the release notes for version {version}:
                
                {release_notes} 

                <a href="{repository_url}/blob/{branch}/CHANGELOG.md">CHANGELOG.md</a> 

                The apk file has been sent below. Please download and install it on your device to test its functionality. If you encounter any issues, please report them by <a href="https://github.com/Muhammed-Rahif/Islam/issues/new">opening an issue on GitHub</a>. Your feedback helps us to improve the app and ensure its quality.
                
                Thank you for using {name}, Jazakallah khair!`,
          fail: `Hi team,
                
                ⚠️ Unfortunately, there was an error when attempting to build the latest version of {name} on the {branch} branch. The error message is as follows:
                  <b><pre>{error}</pre></b> Please investigate the issue and take the necessary steps to resolve it.
                
                Jazakallah khair!`,
        },
        chats: [-877507563],
        assets: [
          {
            path: 'android/app/build/outputs/apk/release/app-release-unsigned.apk',
          },
          {
            path: 'android/app/build/outputs/apk/debug/app-debug.apk',
          },
          {
            path: 'CHANGELOG.md',
          },
        ],
      },
    ],
  ],
};
